export default interface NodeBundle {
  parent: BaseNode & ChildrenMixin;
  children: SceneNode[];
}
