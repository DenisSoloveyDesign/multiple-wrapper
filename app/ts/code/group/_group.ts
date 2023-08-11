import { getNodeIndex } from '@figma-plugin/helpers';
import NodeBundle from '../nodeBundler/_nodeBundler-interface';

export default function group(bundle: NodeBundle[]): GroupNode[] {
  const condition = !figma.command.includes('-one');
  // const family = condition ? bundle : bundle[0].children;

  return (bundle as NodeBundle[]).reduce((acc: GroupNode[], item: NodeBundle | SceneNode) => {
    const parent = (item as NodeBundle).parent,
      childrens = (item as NodeBundle).children;

    if (condition) {
      const order = getNodeIndex((item as NodeBundle).children[0]);
      const group = figma.group(childrens as SceneNode[], parent);
      group.expanded = false;
      parent.insertChild(order, group);
      acc.push(group);
      
      return acc;
    }

    for (const child of childrens) {
      const order = getNodeIndex(child);
      const group = figma.group([child], parent);
      group.expanded = false;
      parent.insertChild(order, group);
      acc.push(group);
    }

    return acc;
  }, [] as GroupNode[]);
}
