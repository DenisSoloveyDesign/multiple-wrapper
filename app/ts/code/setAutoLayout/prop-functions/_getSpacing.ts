import { Direction } from '../_Enums';
import boundingCalculation from './_boundingCalculation';

export default function getSpacing(childs: SceneNode[], layoutMode: keyof typeof Direction) {
  const spacings: number[] = [];

  childs.reduce((acc, cur) => {
    const axis = boundingCalculation(acc, cur, layoutMode);
    spacings.push((axis.accAxis - axis.curAxis) * -1);
    return cur;
  });
  return spacings;
}
