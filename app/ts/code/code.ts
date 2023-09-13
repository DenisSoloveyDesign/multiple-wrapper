import { strings } from './../strings';
//// ================================ Imports ======================================

import figmaFileCheck from './_figmaFileCheck-function';
import nodeBundler from './nodeBundler/nodeBundler-function';
import group from './group/_group';
import setFrame from './setFrame/setFrame';
import setAutoLayout from './setAutoLayout/setAutoLayout';
import transformToAutolayout from './transformToAutoLayout/transformToAutolayout';
import NodeBundle from './nodeBundler/_nodeBundler-interface';
import sendError from './onError/sendError-Function';
import getSelection from './_getSelection';

//// ================================ Code ======================================
console.clear();
figmaFileCheck();

figma.ui.onmessage = (message) => {
  const notify = `${message.status}: ${message.message}`;
  if (message.type === 'error') figma.notify(`${notify}. Please write about the promlem on email - denis.solovey.design@gmail.com`, { error: true });
  figma.ui.hide();
  setTimeout(() => figma.closePlugin(), 1000);
};
const command = figma.command.replace(/-one|-together/g, '');
let bundle;

try {
  bundle = nodeBundler();
} catch (e) {
  sendError(e, '📄 code.ts |  Function "nodeBundler()"');
}

switch (command) {
  case 'group':
    {
      if (bundle)
        try {
          const groups = group(bundle as NodeBundle[]);
          getSelection(groups);
          figma.closePlugin(strings.groupAdded);
        } catch (e) {
          sendError(e, '📄 code.ts | Command "group" - Function "group()"');
        }
      else figma.closePlugin(strings.nothingToGroup);
    }
    break;
  case 'frame':
    if (bundle)
      try {
        const groups = group(bundle as NodeBundle[]),
          frames = setFrame(groups as GroupNode[]);
        getSelection(frames);
        figma.closePlugin(strings.frameAdded);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "frame"');
      }
    else figma.closePlugin(strings.nothingToGroup);

    break;
  case 'autoLayout':
    if (bundle)
      try {
        const groups = group(bundle as NodeBundle[]),
          frames = setFrame(groups as GroupNode[]),
          autoLayout = setAutoLayout(frames as FrameNode[]);
        getSelection(autoLayout);
        figma.closePlugin(strings.autoLayoutAdded);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "autoLayout"');
      }
    else figma.closePlugin(strings.nothingToGroup);

    break;
  case 'transform':
    if (bundle)
      try {
        transformToAutolayout(bundle as SceneNode[]);
        figma.closePlugin(strings.autoLayoutAdded);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "transform" - Function "transformToAutolayout()"');
      }
    else figma.closePlugin(strings.nothingToChange);

    break;
  case 'coffee':
    {
      const url = 'https://www.buymeacoffee.com/Denis.Solovey',
        openLinkUIString = `<script>window.open('${url}','_blank');</script>`;
      figma.showUI(openLinkUIString, { visible: false });
      setTimeout(() => figma.closePlugin(), 1000);
    }
    break;
}
