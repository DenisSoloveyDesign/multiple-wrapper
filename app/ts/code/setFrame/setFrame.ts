import { getParentNode, insertAfterNode } from '@create-figma-plugin/utilities';
export default function setFrame(groups: GroupNode[]): FrameNode[] {
  return groups.reduce((acc: FrameNode[], group: GroupNode) => {
    const frame: FrameNode = figma.createFrame();
    const parent = getParentNode(group);
    const width = group.width >= 0.01 ? group.width : 0.01,
      height = group.height >= 0.01 ? group.height : 0.01;

    parent.appendChild(frame);
    insertAfterNode(frame, group);

    frame.fills = [];

    frame.resize(width, height);
    frame.x = group.x;
    frame.y = group.y;
    frame.appendChild(group);

    group.x = 0;
    group.y = 0;
    figma.ungroup(group);

    frame.clipsContent = false;

    acc.push(frame);
    return acc;
  }, []) as FrameNode[];
}
