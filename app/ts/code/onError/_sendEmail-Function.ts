import { strings } from "../../strings";

export default function sendEmail(message: string, stack: string, name: string): void {
  figma.showUI(__html__, { themeColors: true, width: 300, height: 0, title: strings.onError });
  figma.ui.postMessage({ name: name, error: { message: message, stack: stack } });
}