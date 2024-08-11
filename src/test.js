require("dotenv").config();
const emailProvider = require("./");

const realProviderOptions = {
  apiKey: process.env.ZEPTO_TOKEN,
};
const mockSettings = {
  defaultFrom: "declutter" + "<" + process.env.DEFAULT_FROM + ">",
  defaultReplyTo: process.env.DEFAULT_REPLY_TO,
};

const realOptions = {
  to: process.env.TEST_MAIL,
  subject: "Test Email from Strapi Zeptomail Provider",
  text: "This is a real test email sent from Strapi using the Zeptomail provider.",
  html: "<p>This is a <b>real</b> test email sent from Strapi using the Zeptomail provider.</p>",
};

const provider = emailProvider.init(realProviderOptions, mockSettings);

// Call the send function
provider
  .send(realOptions)
  .then(() => {
    console.log("Email sent successfully! Check your inbox.");
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });
