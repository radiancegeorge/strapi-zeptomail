# Strapi ZeptoMail Provider

A custom email provider for Strapi v4, enabling seamless email sending through the ZeptoMail service.

## Installation

```bash
npm install strapi-zeptomail
# or
yarn add strapi-zeptomail
```

## Configuration

1. **Integrate the Provider:**

   - Open your Strapi project's `config/plugins.js` file.
   - Add the following configuration:

     ```javascript
     module.exports = ({ env }) => ({
       email: {
         provider: "zeptomail",
         providerOptions: {
           apiKey: env("ZEPTOMAIL_API_KEY"),
         },
         settings: {
           defaultFrom: "your-default-from-email@example.com",
           defaultReplyTo: "your-default-reply-to-email@example.com",
         },
       },
     });
     ```

2. **Secure Your API Key:**

   - Replace `env('ZEPTOMAIL_API_KEY')` with your actual ZeptoMail API key.
   - Store this key securely in your `.env` file or within the `config/plugins.js` itself.

## Usage

Leverage the ZeptoMail provider just like any other Strapi email provider:

```javascript
await strapi.plugins["email"].services.email.send({
  to: "recipient@example.com",
  from: "sender@example.com",
  subject: "Hello from Strapi",
  text: "This is a test email sent from Strapi using the ZeptoMail provider.",
  html: "<h1>Hello from Strapi</h1><p>This is a test email sent from Strapi using the ZeptoMail provider.</p>",
});
```

## Features

- Core Email Functionality: Send emails with `to`, `from`, `subject`, `text`, and `html` content.
- CC & BCC Support: Include `cc` and `bcc` recipients in your emails.
- Customizable Reply-To: Define a specific `replyTo` address for each email.
- Flexible "From" Field: Accommodates both `"Name <email>"` and plain email address formats in the `from` field.
- Extendable with Custom Parameters: Pass additional parameters directly to the ZeptoMail API using the `...rest` spread operator within the `options` object.

## Repository

Find comprehensive details and stay up-to-date on the GitHub repository: https://github.com/radiancegeorge/strapi-zeptomail

Important: Ensure you have Strapi v4 or later installed for compatibility.
