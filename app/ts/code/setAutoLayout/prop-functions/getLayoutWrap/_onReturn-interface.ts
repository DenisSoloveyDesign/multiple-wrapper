export default interface OnReturn {
  type: 'WRAP' | 'NO_WRAP';
  width: number;
  items: SceneNode[];
  spacings: number[];
}
