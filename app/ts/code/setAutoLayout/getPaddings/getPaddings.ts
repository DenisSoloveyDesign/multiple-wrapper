import { computeBoundingBox } from '@create-figma-plugin/utilities';
import { getBoundingRect } from '@figma-plugin/helpers';

export default function getPaddings(frame: FrameNode, childs: SceneNode[]) {
  const parentBoundingBox = computeBoundingBox(frame),
    childsBoundingBox = getBoundingRect(childs);

  const parentX = Math.abs(parentBoundingBox.x),
    parentX2 = parentX - parentBoundingBox.width,
    parentY = Math.abs(parentBoundingBox.y),
    parentY2 = parentY - parentBoundingBox.height;

  const childX = Math.abs(childsBoundingBox.x),
    childX2 = Math.abs(childsBoundingBox.x2),
    childY = Math.abs(childsBoundingBox.y),
    childY2 = Math.abs(childsBoundingBox.y2);

  const horizontalPadding = Math.abs(parentX - childX),
    verticalPadding = Math.abs(parentY - childY),
    horizontalPadding2 = Math.abs(parentX2 - childX2),
    verticalPadding2 = Math.abs(parentY2 - childY2);

  return {
    horizontal: horizontalPadding < horizontalPadding2 ? horizontalPadding : horizontalPadding2,
    vertical: verticalPadding < verticalPadding2 ? verticalPadding : verticalPadding2,
  };
}
