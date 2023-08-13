export default function setSort(frame: FrameNode, nodesList: SceneNode[][]) {
  const flattenNodes = nodesList.flat(2);

  frame.children.forEach((child) => {
    frame.insertChild(flattenNodes.indexOf(child), child);
  });
}