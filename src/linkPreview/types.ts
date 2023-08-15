import { NodeKey } from "lexical";

export type ResOfWebsite = {
  url: string;
  title: string;
  description: string;
  images: Array<string>;
};

export type LinkPreviewT = {
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  nodeKey: NodeKey;
  url: string;
  res: ResOfWebsite;
  onError?: (error: string) => void;
  loadingComponent?: JSX.Element | string;
  onLoad?: () => void;
};
