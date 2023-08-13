import { getBoundingRect } from '@figma-plugin/helpers';
import sortByAxis from './_sortByAxis';
import { computeBoundingBox } from '@create-figma-plugin/utilities';

export default function getException(childsY: SceneNode[]) {
  const childsBoundingBox = getBoundingRect(childsY),
    childsWidth = childsBoundingBox.width,
    childsHeight = childsBoundingBox.height;

  const sortedX = sortByAxis('x', childsY);

  let someIntersectedX = false,
    someIntersectedY = false;

  sortedX.reduce((prev, cur) => {
    const prevBoundingBox = computeBoundingBox(prev),
      prevX2 = prevBoundingBox.x + prevBoundingBox.width;

    const curBoundingBox = computeBoundingBox(cur),
      curX1 = curBoundingBox.x;

    if (prevX2 > curX1) someIntersectedX = true;

    return cur;
  });

  childsY.reduce((prev, cur) => {
    const prevBoundingBox = computeBoundingBox(prev),
      prevY2 = prevBoundingBox.y + prevBoundingBox.height;

    const curBoundingBox = computeBoundingBox(cur),
      curY1 = curBoundingBox.y;

    if (prevY2 > curY1) someIntersectedY = true;

    return cur;
  });

  return childsWidth > childsHeight && !someIntersectedX && !someIntersectedY;
}
