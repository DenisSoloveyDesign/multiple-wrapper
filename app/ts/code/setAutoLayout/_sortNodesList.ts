import sortByAxis from './_sortByAxis';

export default function sortNodesList(nodesList: SceneNode[][]) {
  return nodesList.reduce((acc, cur) => {
    acc.push(sortByAxis('x', cur));
    return acc;
  }, [] as SceneNode[][]);
}
