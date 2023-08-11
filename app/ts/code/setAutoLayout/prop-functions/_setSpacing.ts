import { Direction } from '../_Enums';
import boundingCalculation from './_boundingCalculation';

export default function setSpacing(frame: FrameNode, childs: SceneNode[], layoutMode: keyof typeof Direction) {
  let factor = 0;
  const spacingCount = childs.length - 1;

  childs.reduce((acc, cur) => {
    const axis = boundingCalculation(acc, cur, layoutMode);

    factor += (axis.accAxis - axis.curAxis) * -1;
    return cur;
  });

  const result = Math.round(factor / spacingCount);
  frame.itemSpacing = result < 0 ? 0 : result;
}
