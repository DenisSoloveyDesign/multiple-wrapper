import getSpacing from './_getSpacing';

export default function setWrapSpacing(
  frame: FrameNode,
  childs: {
    HORIZONTAL: SceneNode[];
    VERTICAL: SceneNode[];
  },
  spacings: number[]
) {
  const verticalSpacings = getSpacing(childs.VERTICAL, 'VERTICAL');

  const horizontalFactor = spacings.reduce((a, b) => a + b, 0);

  const filteredVerticalSpacings = verticalSpacings.filter((num) => num >= 0),
    verticalFactor = filteredVerticalSpacings.reduce((a, b) => a + b, 0);

  frame.itemSpacing = Math.round(horizontalFactor / spacings.length);
  frame.counterAxisSpacing = filteredVerticalSpacings.length > 0 ? Math.round(verticalFactor / filteredVerticalSpacings.length) : 0;
}
