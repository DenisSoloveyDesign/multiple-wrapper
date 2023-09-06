export default function setSort(frame: FrameNode, nodesList: SceneNode[][]) {
  const flattenNodes = nodesList.flat();

  frame.children.forEach((child) => {
    frame.insertChild(flattenNodes.indexOf(child), child);
  });
}