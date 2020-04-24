function sendMail (target, text) {

    var nodemailer = require('nodemailer')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'ryonedafkaff@gmail.com',
               pass: 'Gublernation_09'
           }
       });
    const mailOptions = {
        from: 'ryonedafkaff@gmail.com', // sender address
        to: target.email, // list of receivers
        subject: 'Thank you', // Subject line
        html: text // plain text body
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
          else{
            console.log(info)
          }
     });
}
module.exports = sendMail