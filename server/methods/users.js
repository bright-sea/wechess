import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {getUserIdentity} from '/lib/utility';

export default function () {
  Meteor.methods({

    'users.add'(data) {

      check(data, {
        email: String,
        profile: {
          firstName: String,
          lastName: String
        }
      });

      data.password = '88888888';

      // console.log('users.add data', data);

      // XXX: Do some user authorization

      const _idNew = Accounts.createUser({email: data.email, password: '88888888'});
      // console.log('new user created with _id_new', _id_new);

      return {_idNew};

    },

    'users.update'(data, _id) {
      check(data, {
        firstName: String,
        lastName: String,
        email: String
      });
      check(_id, String);

      //  console.log('users.update _id', _id);
      //  console.log('users.update data', data);

      // XXX: Do some user authorization

      let record = Meteor.users.findOne(_id);
      // const allowedFields = ['profile.firstName'];
      // data.forEach(key => record.set(key,data[key]) );
      record.profile = record.profile || {};

      record.profile.firstName = data.firstName;
      record.profile.lastName = data.lastName;
      record.emails[0].address = data.email;
      record.save();

    },

    'users.delete'(_id) {
      check(_id, String);
        console.log('users.delete _id', _id);
      if (Meteor.userId() !== _id) {
        let record = Meteor.users.findOne(_id);

        console.log('record', record);

        record.remove();
      }
    }
  });

  Accounts.onCreateUser( ( options, user ) => {
    let profile = options.profile;


    let emailData = {
      email: getUserIdentity( user ),
      name: profile && profile.name ? profile.name : "",
      url: Meteor.settings.public.domain
    };

    SSR.compileTemplate( 'welcomeEmail', Assets.getText( 'email/templates/welcome-email.html' ) );

    if ( emailData.email.includes( '@' ) ) {
      Meteor.defer( () => {
        Email.send({
          to: emailData.email,
          from: Meteor.settings.private.FROM_EMAIL,
          subject: `欢迎您来到${Meteor.settings.public.appName}!`,
          html: SSR.render( 'welcomeEmail', emailData )
        });
      });
    }

    if ( profile ) {
      user.profile = profile;
    }

    return user;
  });

}


