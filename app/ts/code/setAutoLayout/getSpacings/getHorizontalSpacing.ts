import getCords from './_getCords';

export default function getHorizontalSpacing(nodesList: SceneNode[][]) {
  const fltered = nodesList.filter((group) => group.length > 1);

  const spacings: number[] = [];

  fltered.forEach((group) => {
    group.reduce((prev, cur) => {
      const cords = getCords([prev], [cur], 'x', 'width'),
        spacing = (cords.prev - cords.cur) * -1;

      spacings.push(spacing);
      return cur;
    });
  });

  const spacing = spacings.reduce((a, b) => a + b) / spacings.length;

  return Math.round(spacing);
}
