import { NodeKey } from "lexical";

export type PageMetaData = {
  url: string;
  title: string;
  description: string;
  images: Array<string>;
};

export type PreviewBoxProps = {
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  nodeKey: NodeKey;
  url: string;
  res: PageMetaData;
  showClosePreview: boolean;
  onError?: (error: string) => void;
  loadingComponent?: JSX.Element | string;
  onClose: () => void;
};
