const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

const sendEmail = async (email,code) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '210701278@rajalakshmi.edu.in',
          pass: process.env.MAIL_PASS
        }
      });
      
      var mailOptions = {
        from: '210701278@rajalakshmi.edu.in',
        to: email ,
        subject: "Your request has been accepted by a volunteer",
        text: `Here is your code for the volunteer ${code}, Please don't share until you have been contacted by the volunteer on delivery.`,
      };
      
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = sendEmail
