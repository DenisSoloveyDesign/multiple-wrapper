import { getParentNode, insertAfterNode } from '@create-figma-plugin/utilities';
export default function setFrame(groups: GroupNode[]): FrameNode[] {
  return groups.reduce((acc: FrameNode[], group: GroupNode) => {
    const frame: FrameNode = figma.createFrame();
    const parent = getParentNode(group);
    
    parent.appendChild(frame);
    insertAfterNode(frame, group);

    frame.fills = [];
    frame.resize(group.width, group.height);
    frame.x = group.x;
    frame.y = group.y;
    frame.appendChild(group);

    group.x = 0;
    group.y = 0;
    figma.ungroup(group);

    acc.push(frame);
    return acc;
  }, []) as FrameNode[];
}
