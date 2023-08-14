export default function setDefaultAutoLayoutProps(frame: FrameNode): void {
  if (frame.width > frame.height) frame.layoutMode = "HORIZONTAL";
  else frame.layoutMode = "VERTICAL";

  frame.itemSpacing = 8;

  frame.paddingTop = 8;
  frame.paddingRight = 8;
  frame.paddingBottom = 8;
  frame.paddingLeft = 8;

  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
}