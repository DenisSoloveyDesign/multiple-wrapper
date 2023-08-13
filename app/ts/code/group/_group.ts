import { sort } from 'forto-sorter';
import { getNodeIndex } from '@figma-plugin/helpers';
import NodeBundle from '../nodeBundler/_nodeBundler-interface';

export default function group(bundle: NodeBundle[]): GroupNode[] {
  const condition = !figma.command.includes('-one');

  return (bundle as NodeBundle[]).reduce((acc: GroupNode[], item: NodeBundle | SceneNode) => {
    const parent = (item as NodeBundle).parent,
      childrens = (item as NodeBundle).children;

    if (condition) {
      const orders = (item as NodeBundle).children.reduce((acc, cur) => {
          acc.push(getNodeIndex(cur));
          return acc;
        }, [] as number[]),
        order = Math.min(...orders);

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
