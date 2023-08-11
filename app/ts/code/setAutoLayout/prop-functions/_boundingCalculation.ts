import { computeBoundingBox } from '@create-figma-plugin/utilities';
import { Axis, Direction, Side } from '../_Enums';

export default function boundingCalculation(acc: SceneNode, cur: SceneNode, layoutMode: keyof typeof Direction) {
  const axis: keyof typeof Axis = layoutMode === 'HORIZONTAL' ? 'x' : 'y',
    side: keyof typeof Side = layoutMode === 'HORIZONTAL' ? 'width' : 'height';

  const accBoundingBox = computeBoundingBox(acc),
    curBoundingBox = computeBoundingBox(cur);

  return { accAxis: accBoundingBox[axis] + accBoundingBox[side], curAxis: curBoundingBox[axis] };
}
