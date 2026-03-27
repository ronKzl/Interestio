export type ToolOption = {
  id: string;
  label: string;
};

/** All visual tokens for `PromptInputBox`; override via partial merge. */
export type PromptBoxStyles = {
  root: string;
  textarea: string;
  toolbar: string;
  toolbarLeft: string;
  toolbarRight: string;
  toolsTrigger: string;
  toolsChevron: string;
  toolsMenu: string;
  toolsMenuItem: string;
  toolsMenuItemActive: string;
  micButton: string;
  micButtonListening: string;
};
