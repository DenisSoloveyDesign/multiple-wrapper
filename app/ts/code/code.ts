//// ================================ Imports ======================================

// import {} from '@figma-plugin/helpers' // - https://github.com/figma-plugin-helper-functions/figma-plugin-helpers
// import {} from '@create-figma-plugin/utilities' // - https://yuanqing.github.io/create-figma-plugin/utilities/

import figmaFileCheck from './_figmaFileCheck-function';
import nodeBundler from './nodeBundler/_nodeBundler-function';
import group from './group/_group';
import setFrame from './setFrame/_setFrame';
import setAutoLayout from './setAutoLayout/_setAutoLayout';
import transformToAutolayout from './_transformToAutolayout';
import NodeBundle from './nodeBundler/_nodeBundler-interface';

//// ================================ Code ======================================

figmaFileCheck();
const bundle = nodeBundler();

switch (figma.command) {
  case 'group':
    if (bundle) figma.currentPage.selection = group(bundle as NodeBundle[]);
    break;
  case 'frame':
    if (bundle) {
      const groups = group(bundle as NodeBundle[])
      figma.currentPage.selection = setFrame(groups);
    }
    break;
  case 'autoLayout':
    if (bundle) figma.currentPage.selection = setAutoLayout(setFrame(group(bundle)));
    break;
  case 'transform':
    if (bundle) transformToAutolayout(bundle);
    break;
}

figma.closePlugin()