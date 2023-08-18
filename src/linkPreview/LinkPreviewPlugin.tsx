import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $createParagraphNode,
  $getRoot,
  $insertNodes,
  COMMAND_PRIORITY_CRITICAL,
  PASTE_COMMAND,
} from "lexical";

import { $createLinkPreviewNode, LinkPreviewNode } from "./LinkPreviewNode";
import { PageMetaData } from "./types";

export const LinkPreviewPlugin = ({
  showLink,
  showClosePreview,
  fetchDataForPreview,
}: {
  showLink: boolean;
  showClosePreview: boolean;
  fetchDataForPreview: (link: string) => Promise<PageMetaData>;
}): null => {
  const [editor] = useLexicalComposerContext();
  const result = [{ url: "", title: "", description: "", images: ["", ""] }];
  let alreadyFetched: PageMetaData | undefined;

  if (!editor.hasNodes([LinkPreviewNode])) {
    throw new Error("LinkPreviewNode is not registered in the editor");
  }

  const urlRegexp =
    /((http(s)?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

  useEffect(() => {
    const removeListener = editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const { clipboardData } = event;
        const pastedItem = clipboardData?.getData("text");

        if (pastedItem) {
          if (urlRegexp.test(pastedItem)) {
            const createPreview = async () => {
              try {
                await fetchDataForPreview(pastedItem).then((res) => {
                  alreadyFetched = result.find(
                    (website) => res.url === website.url
                  );
                  if (!alreadyFetched) {
                    result.unshift(res);
                  }
                });

                if (!alreadyFetched) {
                  editor.update(() => {
                    if (showLink) {
                      $getRoot()
                        .getLastChild()
                        ?.append(
                          $createLinkPreviewNode(
                            pastedItem,
                            result[0],
                            showClosePreview
                          )
                        );
                    } else {
                      $insertNodes([
                        $createLinkPreviewNode(
                          pastedItem,
                          result[0],
                          showClosePreview
                        ),
                        $createParagraphNode(),
                      ]);
                    }
                    return true;
                  });
                }
              } catch (err) {
                /* eslint-disable */
                alert(
                  `Cannot show the preview of this link (${pastedItem}) as it is either not correct or is redirecting to another URL. \n\nTips: Try to leave the 'www.' part and use 'https://' instead of 'http://'`
                );
              }
            };
            createPreview();
            return !showLink;
          }
          return false;
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    return () => {
      removeListener();
    };
  }, [editor, fetchDataForPreview]);

  return null;
};
