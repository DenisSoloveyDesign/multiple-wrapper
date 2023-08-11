//// ================================ Imports ======================================

import { emailParams } from './email/_EmailParams-Params';
import sendEmail from './email/sendEmail-Function';

//// ================================ Code ======================================

onmessage = (msg) => {
  const message = msg.data.pluginMessage;

  if (message.error) {
    emailParams.content.function_name = message.name;
    emailParams.content.error_message = message.error.message;
    emailParams.content.error_stack = message.error.stack;

    sendEmail(emailParams);
  }
};