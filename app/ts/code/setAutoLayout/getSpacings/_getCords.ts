import { getBoundingRect } from '@figma-plugin/helpers';
import { Axis, Side } from '../_Enums';

export default function getCords(prev: SceneNode[], cur: SceneNode[], axis: keyof typeof Axis, side: keyof typeof Side) {
  const prevBoundingBox = getBoundingRect(prev),
    curBoundingBox = getBoundingRect(cur);

  return {
    cur: curBoundingBox[axis],
    prev: prevBoundingBox[axis] + prevBoundingBox[side],
  };
}
