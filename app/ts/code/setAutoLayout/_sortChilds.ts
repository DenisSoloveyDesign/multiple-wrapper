export default function sortChilds(frame: FrameNode, sorted: SceneNode[]): void {
  frame.children.forEach((child) => {
    frame.insertChild(sorted.indexOf(child), child);
  });
}
