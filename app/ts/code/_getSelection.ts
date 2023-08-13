export default function getSelection(elems: GroupNode[] | FrameNode[]) {
  let selection = [...figma.currentPage.selection];

  elems.forEach((elem) => {
    selection = selection.filter((child) => !elem.children.includes(child));
  });

  figma.currentPage.selection = selection.concat(elems);
}
