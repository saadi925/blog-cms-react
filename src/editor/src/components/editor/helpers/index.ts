import * as marks from "./marks";
import * as blocks from "./blocks";
import * as styles from "./editorstyles/editorstyles";
import * as insertions from "./insertions";
export const CustomEditor = {
  ...marks,
  ...blocks,
  ...insertions,
  ...styles,
};
