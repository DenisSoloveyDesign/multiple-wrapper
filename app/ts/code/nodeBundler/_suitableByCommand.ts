import { getParentNode } from '@create-figma-plugin/utilities';
import { isOneOfNodeType, isPartOfInstance } from '@figma-plugin/helpers';
import isAutoLayout from '../helpers/_isAutoLayout';

export default function suitableByCommand(item: SceneNode) {
  const command = figma.command;
  const parent = getParentNode(item);
  
  const group = {
      command: command.includes('group'),
      type: !isOneOfNodeType(parent, ['COMPONENT_SET']) && !isPartOfInstance(item),
    },
    frame = {
      command: command.includes('frame') || command.includes('autoLayout'),
      type: group.type && !isOneOfNodeType(item, ['SECTION']) && !isPartOfInstance(item),
    },
    transform = {
      command: command.includes('transform'),
      type: isOneOfNodeType(item, ['GROUP', 'FRAME', 'COMPONENT_SET', 'COMPONENT']) && !isPartOfInstance(item) && !isAutoLayout(item),
    };

  if ((group.command && group.type) || (frame.command && frame.type) || (transform.command && transform.type)) return true;

  return false;
}
