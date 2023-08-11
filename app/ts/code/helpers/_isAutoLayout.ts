import { isOneOfNodeType } from "@figma-plugin/helpers";

export default function isAutoLayout(item: SceneNode) {
  if (isOneOfNodeType(item, ['FRAME', 'COMPONENT_SET', 'COMPONENT'])) {
    return (item as FrameNode).layoutMode !== 'NONE';
  }
}
