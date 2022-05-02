module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "gestion.flotas.app@gmail.com",
        defaultReplyTo: "gestion.flotas.app@gmail.com",
        testAddress: "gestion.flotas.app@gmail.com",
      },
    },
  },
});