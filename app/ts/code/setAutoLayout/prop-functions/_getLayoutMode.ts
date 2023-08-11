import getSpacing from './_getSpacing';

export default function getLayoutMode(
  childBoundingBox: {
    x: number;
    y: number;
    x2: number;
    y2: number;
    height: number;
    width: number;
  },
  sortedTemplates: {
    HORIZONTAL: SceneNode[];
    VERTICAL: SceneNode[];
  }
) {
  const horizontalIntersection = getSpacing(sortedTemplates.HORIZONTAL, 'HORIZONTAL').some((elem) => elem < 0),
    verticalIntersection = getSpacing(sortedTemplates.VERTICAL, 'VERTICAL').some((elem) => elem < 0);

  const noIntersection = !verticalIntersection && !horizontalIntersection,
    onlyHorizontalIntersection = !verticalIntersection && horizontalIntersection,
    largeWidth = childBoundingBox.width > childBoundingBox.height,
    condition = (!largeWidth && (noIntersection || onlyHorizontalIntersection)) || (largeWidth && onlyHorizontalIntersection);

  return condition ? 'VERTICAL' : 'HORIZONTAL';
}
