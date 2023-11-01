const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const date = req.body.date;

  const options = { height: '11.25in', width: '8.5in', header: { height: '20mm' }, footer: { height: '20mm' } };
  const html = `
  <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Frontend</title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          .btn-pdf{
            background-color: blue;
            color: white;
            border: none;
            width: 100px;
            height: 50px;
          }
          .bordered{
            background-color: lightblue;
            color: white;
            width: 80%;
            height: 30%;
            border: 1px solid black;
          }
          .container{
            line-height: 30px;
            background-color: gray;
            color: blue;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>THIS IS MY PDF FILE</h1>
          <p>This is the dummy content of this file.</p>
          <button type="button" class="btn-pdf">CLICK ME</button>
        </div>
        <div class="bordered">
          <p>From: ${name}</p>
          <p>${message}</p>
        </div>
        <div class="container">
          <h2Product Info></h2>
          <p>Price: $${price}</p>
          <p>Availability: ${quantity}</p>
          <p>Date published: ${date}</p>
        </div>
      </body>
    </html>  
  `;
  pdf.create(html, options).toFile('accounting.pdf', (err, data) => {
    if (err) {
      console.log('Node error in pdf.create(): ', err);
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jotanovicaleksa@gmail.com', // Replace with your email address
          pass: 'izlkybacycdqiveg' // Replace with your email password(Koristi se App password: moze se podesiti u podesavanjima google account-a.)
        }
      });

      const mailOptions = {
        from: 'jotanovicaleksa@gmail.com',
        to: email && email, // Replace with recipient email address
        subject: 'New Contact Form Submission',
        html: html,
        attachments: [{
          path: data.filename
        }]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
        } else {
          console.log('sent: ', info.response);
          res.status(200).send('successfully');
        }
      });
    }
  });

});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});