import getBundle from './_getBundle';
import getSelected from './_getSelected';

export default function nodeBundler() {
  const selection = figma.currentPage.selection;

  if (selection.length > 0) {
    const bundle = figma.command.includes('transform') ? getSelected(selection) : getBundle(selection)
    
    if (bundle.length === 0) return false

    return bundle;
  } else return false
}
