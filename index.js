const express = require('express')
const app = express()
const mailer = require('express-mailer')
const router = express.Router()

const port = process.env.PORT || 3000

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

mailer.extend(app, {
  from: 'test@no-reply.com',
  host: 'smtp.gmail.com', // hostname

  port: 587, // port for secure SMTP

  auth: {
    user: '@',
    pass: '@'
  }
})

router.post('/upload', (req, res, next) => {

})

router.get('/', (req, res, next) => {
  console.log('hi')
})

router.post('/email', (req, res, next) => {
  app.mailer.send('email', {
    to: '@', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
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
  })
})

app.use("/", router)
app.use('/email', router)
app.use('/upload', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
