import sortByAxis from './_sortByAxis';
import setDefaultAutoLayoutProps from './setDefaultAutoLayoutProps/setDefaultAutoLayoutProps';
import getPaddings from './getPaddings/getPaddings';
import setSort from './_setSort';
import getWrapWidth from './getWrapWidth/getWrapWidth';
import getVerticalSpacing from './getSpacings/getVerticalSpacing';
import getHorizontalSpacing from './getSpacings/getHorizontalSpacing';
import getLayoutAlign from './getLayoutAlign/getLayoutAlign';
import getLayoutMode from './getLayoutMode/getLayoutMode';
import sortNodesList from './_sortNodesList';
import getNodesList from './_getNodesList';

export default function setAutoLayout(frames: FrameNode[]): FrameNode[] {
  return frames.map((frame) => {
    if (frame.children.length > 1 && frame.layoutMode === 'NONE') {
      const childs = [...frame.children];

      const verticalSortedChilds = sortByAxis('y', childs),
        nodesList = getNodesList(verticalSortedChilds, []),
        sortedList = sortNodesList(nodesList);

      const layoutMode = getLayoutMode(sortedList),
        layoutAlign = getLayoutAlign(childs, layoutMode.layoutMode),
        itemSpacing = layoutMode.layoutMode === 'HORIZONTAL' ? getHorizontalSpacing(sortedList) : getVerticalSpacing(sortedList),
        counterAxisSpacing = layoutMode.layoutWrap === 'WRAP' ? getVerticalSpacing(sortedList) : false,
        width = layoutMode.layoutWrap === 'WRAP' ? getWrapWidth(sortedList) : false,
        counterAxisSizingMode = width ? 'FIXED' : 'AUTO',
        paddings = getPaddings(frame, childs);

      frame.layoutMode = layoutMode.layoutMode;
      frame.layoutWrap = layoutMode.layoutWrap;
      frame.counterAxisAlignItems = layoutAlign;
      if (width) frame.resize(width, frame.height);
      frame.primaryAxisSizingMode = counterAxisSizingMode;
      frame.counterAxisSizingMode = 'AUTO';
      frame.itemSpacing = itemSpacing;
      if (counterAxisSpacing) frame.counterAxisSpacing = counterAxisSpacing >= 0 ? counterAxisSpacing : 0;

      if (figma.command.includes('transform')) {
        frame.paddingLeft = frame.paddingRight = paddings.horizontal;
        frame.paddingTop = frame.paddingBottom = paddings.vertical;
      }

      setSort(frame, sortedList);
    } else if (frame.layoutMode === 'NONE') setDefaultAutoLayoutProps(frame);

    return frame;
  });
}
