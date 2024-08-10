import Axios from "axios";

const zepto = Axios.create({
  baseURL: "https://api.zeptomail.com/v1.1/email",
});

interface Settings {
  defaultFrom: string;
  defaultReplyTo: string;
}

export interface SendOptions {
  from?: string;
  to: string;
  cc: string;
  bcc: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  [key: string]: unknown;
}

interface ProviderOptions {
  apiKey: string;
}

const sendMail = (opt: SendOptions, key: string, cb: Function) => {
  // "bounce_address":"bounces@info.zylker.com",
  // "from": { "address": "accounts@info.zylker.com",  "name": "Paula"},
  // "to": [{"email_address": {"address": "rudra.d@zylker.com","name": "Rudra"}}],
  // "subject":"Account Confirmation",
  // "htmlbody":"<div><b> Kindly click on Verify Account to confirm your account </b></div>"

  zepto({
    method: "post",
    data: {
      // ...opt,
      from: { address: opt.from, name: opt.from?.split("@")[0] },
      to: [
        {
          email_address: {
            address: opt.to,
            name: opt.to.split("@")[0],
          },
        },
      ],
      subject: opt.subject,
      htmlBody: opt.html,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    },
  })
    .then(() => cb())
    .catch((error) => cb(error));
};

export default {
  init(providerOptions: ProviderOptions, settings: Settings) {
    return {
      send(options: SendOptions): Promise<void> {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } =
            options;

          const msg: SendOptions = {
            from: from || settings.defaultFrom,
            to,
            cc,
            bcc,
            replyTo: replyTo || settings.defaultReplyTo,
            subject,
            text,
            html,
            ...rest,
          };

          sendMail(msg, providerOptions.apiKey, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },
    };
  },
};
