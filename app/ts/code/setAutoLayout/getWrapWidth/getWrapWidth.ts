import { getBoundingRect } from "@figma-plugin/helpers";

export default function getWrapWidth(nodesList: SceneNode[][]) {
  const widths = nodesList.reduce((acc, cur) => {
    if (cur.length > 1) acc.push(getBoundingRect(cur).width);
    return acc;
  }, [] as number[]);

  const sum = widths.reduce((a, b) => a + b, 0);

  return Math.round(sum / widths.length);
}
