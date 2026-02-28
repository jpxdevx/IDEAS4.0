const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "waterfixes.jaks@gmail.com",
    pass: "pass_encrypted"
  }
});

const sendEmail = async (to, subject, text) => {

  try{

    await transporter.sendMail({
      from: "WaterFixes <waterfixes.jaks@gmail.com>",
      to,
      subject,
      text
    });

    console.log("Email Sent to:", to);

  }catch(err){

    console.log("Email Error:",err);

  }

};

module.exports = sendEmail;