import { isOneOfNodeType } from '@figma-plugin/helpers';
import setFrame from '../setFrame/setFrame';
import setAutoLayout from '../setAutoLayout/setAutoLayout';

export default function transformToAutolayout(bundle: SceneNode[]): void {
  bundle.forEach((item) => {
    if (isOneOfNodeType(item, ['GROUP'])) {
      const frame = setFrame([(item as GroupNode)]);
      setAutoLayout(frame);
    } else setAutoLayout([(item as FrameNode)]);
  });
}
