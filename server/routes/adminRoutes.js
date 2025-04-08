const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/email", (req, res) => {
  console.log("api hit");
  const { email } = req.body;
  console.log("send email to ", email);

  // Setup nodemailer transporter
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zulqarnainc67@gmail.com",
      pass: "pniq fonb hius uazc", // Consider using environment variables for security
    },
  });

  // Email details
  var mailOptions = {
    from: "zulqarnainc67@gmail.com",
    to: "iamzulqarnainchohan@gmail.com", // Send email to the user's provided email
    subject: "Your Order Information",
    text: `we have recived your order`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email we can't send:", error);
      return res.json({ message: "Error sending email we can't snd" });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ message: "Email sent successfully" });
    }
  });
});

module.exports = router;
