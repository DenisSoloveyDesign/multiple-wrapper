import { computeBoundingBox } from "@create-figma-plugin/utilities";
import WrapGroups from "./_getLayoutWrap-interface";

export default function getGroups(sortedTemplate: SceneNode[]) {
  const firstChildBoundingBox = computeBoundingBox(sortedTemplate[0]);

  const groups: WrapGroups[] = [
    {
      width: firstChildBoundingBox.width,
      height: firstChildBoundingBox.height,
      x: firstChildBoundingBox.x,
      y: firstChildBoundingBox.y,
      items: [sortedTemplate[0]],
      spacings: []
    },
  ];

  for (let i = 1; i < sortedTemplate.length; i++) {
    const child = sortedTemplate[i],
      childBoundingBox = computeBoundingBox(child);

    const groupExists = groups.some((group, i, array) => {
      const y2 = group.y + group.height;
      const diff = (y2 - childBoundingBox.y) * -1;
      
      if (diff < 0) {
        const spacing = (group.x + group.width - childBoundingBox.x) * -1;

        group.width = group.width + childBoundingBox.width + spacing;
        group.height = group.height + childBoundingBox.height + diff;
        group.x = childBoundingBox.x < group.x ? childBoundingBox.x : group.x;
        group.y = childBoundingBox.y < group.y ? childBoundingBox.y : group.y;
        group.spacings.push(spacing);
        group.items.push(child);
        return true;
      }

      if (i === array.length - 1) return false;
    });

    if (!groupExists)
      groups.push({
        width: childBoundingBox.width,
        height: childBoundingBox.height,
        x: childBoundingBox.x,
        y: childBoundingBox.y,
        items: [child],
        spacings: []
      });
  }

  return groups;
}