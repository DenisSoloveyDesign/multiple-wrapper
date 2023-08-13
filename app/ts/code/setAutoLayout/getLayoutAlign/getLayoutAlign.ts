import { getBoundingRect } from "@figma-plugin/helpers";
import { Axis, Side } from "../_Enums";
import { computeBoundingBox } from "@create-figma-plugin/utilities";

export default function getLayoutAlign(childs: SceneNode[], layoutMode: 'HORIZONTAL' | 'VERTICAL' | 'NONE') {
  const axis: keyof typeof Axis = layoutMode === 'HORIZONTAL' ? 'y' : 'x',
    side: keyof typeof Side = layoutMode === 'HORIZONTAL' ? 'height' : 'width';

  const childsBoundingBox = getBoundingRect(childs),
    half = childsBoundingBox[side] / 3,
    cords = [half, half * 2];

  const countOfAxis = childs.reduce(
    (acc, cur) => {
      const boundingBox = computeBoundingBox(cur),
        childCord = boundingBox[axis] - childsBoundingBox[axis];

      if (childCord < cords[0]) acc[0]++;
      if (childCord >= cords[0] && childCord < cords[1]) acc[1]++;
      if (childCord >= cords[1]) acc[2]++;

      return acc;
    },
    [0, 0, 0]
  );

  const max = Math.max(...countOfAxis),
    index = countOfAxis.indexOf(max);

  if (index === 0) return 'MIN';
  if (index === 1) return 'CENTER';
  if (index === 2) return 'MAX';
  return 'MIN';
}
