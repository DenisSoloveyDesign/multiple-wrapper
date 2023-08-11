import { strings } from './../strings';
//// ================================ Imports ======================================

import figmaFileCheck from './_figmaFileCheck-function';
import nodeBundler from './nodeBundler/_nodeBundler-function';
import group from './group/_group';
import setFrame from './setFrame/_setFrame';
import setAutoLayout from './setAutoLayout/_setAutoLayout';
import transformToAutolayout from './transformToAutoLayout/_transformToAutolayout';
import NodeBundle from './nodeBundler/_nodeBundler-interface';
import sendError from './onError/sendError-Function';

//// ================================ Code ======================================
console.clear();

figmaFileCheck();
let bundle;

try {
  bundle = nodeBundler();
  if ((bundle as NodeBundle[] | SceneNode[]).length === 0) figma.closePlugin();
} catch (e) {
  sendError(e, '📄 code.ts |  Function "nodeBundler()"');
}

const command = figma.command.replace(/-one|-together/g, '');

switch (command) {
  case 'group':
    {
      try {
        if (bundle) figma.currentPage.selection = group(bundle as NodeBundle[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "group" - Function "group()"');
      }
      figma.closePlugin(strings.groupAdded);
    }
    break;
  case 'frame':
    if (bundle) {
      let groups;
      try {
        groups = group(bundle as NodeBundle[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "frame" - Function "group()"');
      }

      try {
        figma.currentPage.selection = setFrame(groups as GroupNode[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "frame" - Function "setFrame()"');
      }
      figma.closePlugin(strings.frameAdded);
    }
    break;
  case 'autoLayout':
    if (bundle) {
      let groups;
      let frames;
      try {
        groups = group(bundle as NodeBundle[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "autoLayout" - Function "group()"');
      }

      try {
        frames = setFrame(groups as GroupNode[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "autoLayout" - Function "setFrame()"');
      }

      try {
        figma.currentPage.selection = setAutoLayout(frames as FrameNode[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "autoLayout" - Function "setAutoLayout()"');
      }
      figma.closePlugin(strings.autoLayoutAdded);
    }
    break;
  case 'transform':
    if (bundle) {
      try {
        transformToAutolayout(bundle as SceneNode[]);
      } catch (e) {
        sendError(e, '📄 code.ts | Command "transform" - Function "transformToAutolayout()"');
      }
      figma.closePlugin(strings.autoLayoutAdded);
    }
    break;
}
