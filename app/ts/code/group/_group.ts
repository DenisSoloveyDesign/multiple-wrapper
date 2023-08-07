import { getNodeIndex } from '@figma-plugin/helpers';
import NodeBundle from '../nodeBundler/_nodeBundler-interface';
import getFirstNodeIndex from './_getFirstNodeIndex';

export default function group(bundle: NodeBundle[]): GroupNode[] {
  const condition = bundle.length > 1;
  const family = condition ? bundle : bundle[0].children;

  return (family as NodeBundle[]).reduce((acc: GroupNode[], item: NodeBundle | SceneNode) => {
    const parent = condition ? (item as NodeBundle).parent : bundle[0].parent,
      childrens = condition ? (item as NodeBundle).children : [item];
    
    const order = condition ? getFirstNodeIndex((item as NodeBundle)) : getNodeIndex((item as SceneNode));

    const group = figma.group(childrens as SceneNode[], parent);
    group.expanded = false;
    parent.insertChild(order, group);

    acc.push(group);

    return acc;
  }, [] as GroupNode[]);
}
