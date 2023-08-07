import getBundle from './_getBundle';
import getSelected from './_getSelected';

export default function nodeBundler() {
  const selection = figma.currentPage.selection;

  if (selection.length > 0) {
    if (figma.command === 'transfom') return getSelected(selection);
    return getBundle(selection)
  } else figma.closePlugin();
}
