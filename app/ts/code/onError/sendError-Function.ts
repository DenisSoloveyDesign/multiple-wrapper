//// ================================ Imports ======================================

import sendEmail from './_sendEmail-Function';

//// ================================ Exports ======================================

export default function sendError(error: unknown, message: string) {
  const err: Error = error as Error;
  sendEmail(err.message, err.stack || 'No details', message);
  figma.notify(err.message, { error: true });
}