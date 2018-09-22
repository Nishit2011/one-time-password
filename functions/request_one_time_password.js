const admin = require("firebase-admin");
const twilio = require("./twilio");
module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must provide a phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  //admin auth is used to create auser model
  admin.auth().getUser(phone)
  .then(userRecord => {
    const code = Math.floor((Math.random() * 8999 + 1000));
      //integrating twilio with firebase
      return  twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+18053167032'
      }, (err) => {
          if (err) {
            //handling junk requests
            return res.status(422).send(err);
          }
          //saving user phn to firebase db as the firebase db is decoupled
          //from firebase as a whole

          return admin.database().ref('users/' + phone)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true });
          });
        }
      );
    })
    .catch((err) => {
        res.status(422).send({ error: err });
      });
};
