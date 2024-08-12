const Axios = require("axios");

const zepto = Axios.create({
  baseURL: "https://api.zeptomail.com/v1.1/email",
});

function generateZeptoMailParams(options) {
  let fromAddress = options.from || "";
  let fromName = "";

  if (fromAddress.includes("<")) {
    // Check if it's in the "Name <email>" format
    const match = fromAddress.match(/^(.*?)\s*<([^>]+)>$/);
    if (match) {
      fromName = match[1].trim();
      fromAddress = match[2].trim();
    }
  } else {
    fromName = fromAddress.split("@")[0];
  }
  const zeptoMailParams = {
    from: {
      address: fromAddress,
      name: fromName,
    },
    to: [
      {
        email_address: {
          address: options.to,
          name: options.to.split("@")[0],
        },
      },
    ],
    cc: options.cc
      ? [
          {
            email_address: {
              address: options.cc,
              name: options.cc.split("@")[0],
            },
          },
        ]
      : [],
    bcc: options.bcc
      ? [
          {
            email_address: {
              address: options.bcc,
              name: options.bcc.split("@")[0],
            },
          },
        ]
      : [],
    reply_to: options.replyTo
      ? [
          {
            address: options.replyTo,
            name: options.replyTo.split("@")[0],
          },
        ]
      : [], // Ensure it's always an array, even if empty or with one address
    subject: options.subject,
    htmlbody: options.html,
  };

  // Handle any additional custom parameters from SendOptions
  for (const key in options) {
    if (
      ![
        "from",
        "to",
        "cc",
        "bcc",
        "replyTo",
        "subject",
        "text",
        "html",
      ].includes(key)
    ) {
      zeptoMailParams[key] = options[key];
    }
  }

  return zeptoMailParams;
}

const sendMail = (opt, key, cb) => {
  const data = generateZeptoMailParams(opt);
  zepto({
    method: "post",
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    },
  })
    .then(() => cb())
    .catch((error) => {
      console.error(error.response);
      cb(error);
    });
};

module.exports = {
  init(providerOptions, settings) {
    return {
      send(options) {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } =
            options;

          const msg = {
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

          sendMail(msg, providerOptions.apiKey, (err) => {
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
