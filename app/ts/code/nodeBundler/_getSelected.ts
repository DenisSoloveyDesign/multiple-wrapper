import suitableByCommand from "./_suitableByCommand";

export default function getSelected(selection: readonly SceneNode[]): SceneNode[] {
  return selection.reduce((acc: SceneNode[], item: SceneNode) => {
    if (!suitableByCommand(item)) return acc;
    acc.push(item);
    return acc;
  }, [] as SceneNode[]);
}