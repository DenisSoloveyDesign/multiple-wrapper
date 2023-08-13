import { computeBoundingBox } from '@create-figma-plugin/utilities';
import { Axis } from './_Enums';

export default function sortByAxis(axis: keyof typeof Axis, childs: SceneNode[]) {
  return [...childs].sort((a, b) => {
    const childA = computeBoundingBox(a),
      childB = computeBoundingBox(b);

    return childA[axis] - childB[axis];
  });
}
