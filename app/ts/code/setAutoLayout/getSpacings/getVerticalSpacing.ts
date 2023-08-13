import getCords from './_getCords';

export default function getVerticalSpacing(nodesList: SceneNode[][]) {
  const spacings: number[] = [];

  nodesList.reduce((prev, cur) => {
    const cords = getCords(prev, cur, 'y', 'height'),
      spacing = (cords.prev - cords.cur) * -1;

    spacings.push(spacing);
    return cur;
  });
  const spacing = spacings.reduce((a, b) => a + b) / spacings.length;

  return Math.round(spacing);
}
