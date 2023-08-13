import LayoutMode from "./_LayoutMode-interface";

export default function getLayoutMode(nodesList: SceneNode[][]): LayoutMode {
  const isVertical = nodesList.every((group) => group.length === 1) && nodesList.length > 1,
    isWrap = nodesList.some((group) => group.length > 1) && nodesList.length > 1;

  return {
    layoutMode: isVertical ? 'VERTICAL' : 'HORIZONTAL',
    layoutWrap: isWrap ? 'WRAP' : 'NO_WRAP',
  };
}
