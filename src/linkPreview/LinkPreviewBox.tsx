import * as React from "react";
import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";

import { LinkPreviewT } from "./types";

export const LinkPreviewBox: React.FunctionComponent<LinkPreviewT> = ({
  className,
  nodeKey,
  url,
  res,
}): JSX.Element => {
  return (
    <BlockWithAlignableContents className={className} nodeKey={nodeKey}>
      <a href={url} target={"_blank"}>
        <div className={"previewBox"}>
          <img className={"previewImage"} src={res.images[0]} alt={""} />
          <div className={"previewTextWrapper"}>
            <div className={"previewTitle"}>{res.title}</div>
            <div className={"previewDescription"}>{res.description}</div>
          </div>
        </div>
      </a>
    </BlockWithAlignableContents>
  );
};
