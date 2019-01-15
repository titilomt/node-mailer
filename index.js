const express = require('express')
const app = express()
const mailer = require('express-mailer')
const router = express.Router()

const port = process.env.PORT || 8000

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

mailer.extend(app, {
  from: 'tiago.fonseca@fourtime.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'tiago.fonseca@fourtime.com',
    pass: '@ronaldo99'
  }
});

router.get('/', (req, res, next) => {
  app.mailer.send('email', {
    to: 'thp.fonseca@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Test Email', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, (err) => {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
