import { getNodeIndex } from "@figma-plugin/helpers";
import NodeBundle from "../nodeBundler/_nodeBundler-interface";

export default function getFirstNodeIndex(node:NodeBundle) {
  const children = node.children;
  const length = children.length - 1;

  return getNodeIndex(children[length]) - length;
}