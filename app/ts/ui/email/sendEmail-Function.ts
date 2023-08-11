//// ================================ Imports ======================================

import EmailParams from './_EmailParams-Interface';
import emailjs from '@emailjs/browser';

//// ================================ Exports ======================================

export default function sendEmail(params: EmailParams): void {
  emailjs.init(params.public);
  try {
    emailjs.send(params.service, params.template, params.content).then(
      (response) =>
        parent.postMessage({ pluginMessage: { type: 'success', status: 'Sending SUCCESS!', message: `${response.status}, ${response.text}` } }, '*'),
      (error) => parent.postMessage({ pluginMessage: { type: 'error', status: 'Sending FAILED...', message: error } }, '*')
    );
  } catch (e) {
    console.log(e);
  }
}