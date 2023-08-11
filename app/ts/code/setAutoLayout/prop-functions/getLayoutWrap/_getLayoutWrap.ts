import getGroups from './_getGroups';
import OnReturn from './_onReturn-interface';

export default function getLayoutWrap(sortedTemplates: { HORIZONTAL: SceneNode[]; VERTICAL: SceneNode[] }, mode: 'HORIZONTAL' | 'VERTICAL') {
  const onReturn: OnReturn = {
    type: 'NO_WRAP',
    width: 0,
    items: [],
    spacings: [],
  };

  if (sortedTemplates.HORIZONTAL.length <= 2 || mode === 'VERTICAL') return onReturn;
  
  const groups = getGroups(sortedTemplates.HORIZONTAL);

  if (groups.length === 1) return onReturn;

  const filtered = groups.filter((group) => group.items.length > 1),
    width = filtered.reduce((acc, cur) => acc + cur.width, 0) / filtered.length;

  const final = groups.reduce((acc, cur) => acc.concat(cur.items), [] as SceneNode[]);

  onReturn.type = 'WRAP';
  onReturn.width = width;
  onReturn.items = final;
  onReturn.spacings = groups.reduce((acc, cur) => {
    acc.push(...cur.spacings);
    return acc;
  }, [] as number[]);

  return onReturn;
}
