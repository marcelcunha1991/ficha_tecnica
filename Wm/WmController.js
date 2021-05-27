
const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');

router.get("/trigger",  (req,res) => {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false, // use SSL
        port: 587,
        auth: {
          user: 'wmmailcentral@gmail.com',
          pass: 'marcelft131291'
        },        
      tls: {
          rejectUnauthorized: false
      }
      });
      
      var mailOptions = {
        from: 'wmmailcentral@gmail.com',
        to: 'implantacaomap@gmail.com',
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
