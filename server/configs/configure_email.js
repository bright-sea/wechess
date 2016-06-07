// https://themeteorchef.com/snippets/using-the-email-package/

const MAIL_URL = Meteor.settings.private.MAIL_URL;

export default () => {
  process.env.MAIL_URL = MAIL_URL;
};



