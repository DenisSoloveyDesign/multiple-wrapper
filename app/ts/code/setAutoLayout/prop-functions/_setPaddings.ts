export default function setPaddings(
  frame: FrameNode,
  parentBoundingBox: Rect,
  childBoundingBox: {
    x: number;
    y: number;
    x2: number;
    y2: number;
    height: number;
    width: number;
  }
) {
  if (figma.command.includes('transform')) {
    const parentX = Math.abs(parentBoundingBox.x),
      parentX2 = parentX - parentBoundingBox.width,
      parentY = Math.abs(parentBoundingBox.y),
      parentY2 = parentY - parentBoundingBox.height;

    const childX = Math.abs(childBoundingBox.x),
      childX2 = Math.abs(childBoundingBox.x2),
      childY = Math.abs(childBoundingBox.y),
      childY2 = Math.abs(childBoundingBox.y2);

    const horizontalPadding = Math.abs(parentX - childX),
      verticalPadding = Math.abs(parentY - childY),
      horizontalPadding2 = Math.abs(parentX2 - childX2),
      verticalPadding2 = Math.abs(parentY2 - childY2);

    frame.paddingRight = frame.paddingLeft = horizontalPadding < horizontalPadding2 ? horizontalPadding : horizontalPadding2;
    frame.paddingTop = frame.paddingBottom = verticalPadding < verticalPadding2 ? verticalPadding : verticalPadding2;
  }
}
