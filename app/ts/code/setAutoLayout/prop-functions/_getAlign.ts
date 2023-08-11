import { computeBoundingBox } from '@create-figma-plugin/utilities';
import { Axis, Direction, Side } from '../_Enums';

export default function getAlign(
  frame: FrameNode,
  childBoundingBox: {
    x: number;
    y: number;
    x2: number;
    y2: number;
    height: number;
    width: number;
  },
  childs: SceneNode[],
  layoutMode: keyof typeof Direction
) {
  const axis: keyof typeof Axis = layoutMode !== 'HORIZONTAL' ? 'x' : 'y',
    side: keyof typeof Side = layoutMode !== 'HORIZONTAL' ? 'width' : 'height';

  const containerThird = childBoundingBox[side] / 3,
    firstHalf = childBoundingBox[axis] + containerThird,
    secondHalf = childBoundingBox[axis] + containerThird * 2;

  const positions: number[] = [0, 0, 0];

  for (const child of childs) {
    const itemBoundingBox = computeBoundingBox(child),
      childCenter = itemBoundingBox[axis] + itemBoundingBox[side] / 2;

    if (childCenter <= firstHalf) positions[0]++;
    else if (childCenter > firstHalf && childCenter <= secondHalf) positions[1]++;
    else if (childCenter > secondHalf) positions[2]++;
  }

  const max = Math.max(...positions),
    index = positions.indexOf(max);

  if (index === 1) return 'CENTER';
  if (index === 2) return 'MAX';

  return 'MIN';
}
