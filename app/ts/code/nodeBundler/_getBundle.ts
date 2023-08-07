import { getParentNode } from '@create-figma-plugin/utilities';
import suitableByCommand from './_suitableByCommand';
import NodeBundle from './_nodeBundler-interface';

export default function getBundle(selection: readonly SceneNode[]): NodeBundle[] {
  return selection.reduce((acc: NodeBundle[], item: SceneNode) => {
    if (!suitableByCommand(item)) return acc;

    const parent = getParentNode(item);
    const index = acc.findIndex((child) => child.parent.id === parent.id);
    
    if (index !== -1) acc[index].children.push(item);
    else {
      acc.push({
        parent: parent,
        children: [item],
      });
    }

    return acc;
  }, [] as NodeBundle[]);
}
