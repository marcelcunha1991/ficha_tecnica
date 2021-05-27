
const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');

router.get("/trigger",  (req,res) => {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'wmmailcentral@gmail.com',
          pass: 'marcelft131291'
        }
      });
      
      var mailOptions = {
        from: 'wmmailcentral@gmail.com',
        to: 'marcel.silva1991@gmail.com',
        subject: 'WM ALERTA',
        text: 'Parâmetros tendendo a sair dos limites esperados'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.redirect("/fichas")
 
     
 })

 
module.exports = router;
