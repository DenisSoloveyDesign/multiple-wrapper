import { computeBoundingBox } from '@create-figma-plugin/utilities';
import getException from './_getException';

export default function getNodesList(childs: SceneNode[], nodesList: SceneNode[][], exception?: boolean) {
  exception = exception === undefined ? getException(childs) : exception;

  const primaryChildBoundingBox = computeBoundingBox(childs[0]),
    primaryY2 = primaryChildBoundingBox.y + primaryChildBoundingBox.height;

  const intersectedArray = childs.filter((child) => {
    const childBoundingBox = computeBoundingBox(child),
      secondaryY1 = childBoundingBox.y;

    if (primaryY2 > secondaryY1 || childs[0] === child || exception) return true;

    return false;
  });

  nodesList.push(intersectedArray);
  childs = childs.filter((child) => !intersectedArray.includes(child));

  if (childs.length !== 0) getNodesList(childs, nodesList, exception);
  return nodesList;
}
