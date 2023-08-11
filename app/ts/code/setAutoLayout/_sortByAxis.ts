import { Axis } from "./_Enums";

export default function sortByAxis(axis: keyof typeof Axis, childs: SceneNode[]): SceneNode[] {
  return [...childs].sort((a, b) => a[axis] - b[axis]);
}
