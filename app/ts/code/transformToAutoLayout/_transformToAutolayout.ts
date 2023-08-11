import { isOneOfNodeType } from '@figma-plugin/helpers';
import setFrame from '../setFrame/_setFrame';
import setAutoLayout from '../setAutoLayout/_setAutoLayout';

export default function transformToAutolayout(bundle: SceneNode[]): void {
  bundle.forEach((item) => {
    if (isOneOfNodeType(item, ['GROUP'])) {
      const frame = setFrame([(item as GroupNode)]);
      setAutoLayout(frame);
    } else setAutoLayout([(item as FrameNode)]);
  });
}
