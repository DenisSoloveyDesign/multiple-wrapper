import { getBoundingRect } from '@figma-plugin/helpers';
import sortByAxis from './_sortByAxis';
import sortChilds from './_sortChilds';
import setDefaultAutoLayoutProps from './prop-functions/_setDefaultAutoLayoutProps';
import { computeBoundingBox } from '@create-figma-plugin/utilities';
import setPaddings from './prop-functions/_setPaddings';
import setSpacing from './prop-functions/_setSpacing';
import setWrapSpacing from './prop-functions/_setWrapSpacing';
import getLayoutMode from './prop-functions/_getLayoutMode';
import getLayoutWrap from './prop-functions/getLayoutWrap/_getLayoutWrap';
import getAlign from './prop-functions/_getAlign';

export default function setAutoLayout(frames: FrameNode[]): FrameNode[] {
  return frames.map((frame) => {
    if (frame.children.length > 1 && frame.layoutMode === 'NONE') {
      const childs = [...frame.children];

      const parentBoundingBox = computeBoundingBox(frame),
        childBoundingBox = getBoundingRect(childs);

      const sortedTemplates = { HORIZONTAL: sortByAxis('x', childs), VERTICAL: sortByAxis('y', childs) };

      const mode = getLayoutMode(childBoundingBox, sortedTemplates);
      // const wrap = getLayoutWrap(sortedTemplates, mode);

      // if (wrap.type === 'WRAP') {
      //   setWrapSpacing(frame, sortedTemplates, wrap.spacings);
      //   sortChilds(frame, wrap.items);
      // } else {
      setSpacing(frame, sortedTemplates[mode], mode);
      sortChilds(frame, sortedTemplates[mode]);
      frame.counterAxisAlignItems = getAlign(frame, childBoundingBox, sortedTemplates[mode], mode);
      // }

      if (figma.command.includes('transform')) setPaddings(frame, parentBoundingBox, childBoundingBox);

      frame.layoutMode = mode;
      // frame.layoutWrap = wrap.type;
      // if (wrap.type === 'WRAP') frame.resize(wrap.width, frame.height);
    } else if (frame.layoutMode === 'NONE') setDefaultAutoLayoutProps(frame);

    frame.counterAxisSizingMode = 'AUTO';

    return frame;
  });
}
