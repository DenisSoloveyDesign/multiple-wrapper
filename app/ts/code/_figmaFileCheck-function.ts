import { strings } from '../strings';

export default function figmaFileCheck() {
  if (figma.editorType == 'figjam') figma.closePlugin(strings.ifFigjam);
  if (figma.editorType == 'dev') figma.closePlugin(strings.ifDev);
}
