import * as React from "react";
import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";
import { PreviewBoxProps } from "./types";

export const LinkPreviewBox: React.FunctionComponent<PreviewBoxProps> = ({
  className,
  nodeKey,
  url,
  res,
  showClosePreview,
  onClose,
}): JSX.Element => {
  return (
    <BlockWithAlignableContents className={className} nodeKey={nodeKey}>
      <div>
        <a href={url} target="_blank" className="previewBox">
          <img className="previewImage" src={res.images[0]} alt="" />
          <div className="previewTextWrapper">
            <div className="previewTitle">{res.title}</div>
            <div className="previewDescription">{res.description}</div>
          </div>
          {showClosePreview && (
            <div
              className="closePreview"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              ×
            </div>
          )}
        </a>
      </div>
    </BlockWithAlignableContents>
  );
};
