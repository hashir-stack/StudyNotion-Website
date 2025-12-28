const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email,title,body)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.USER,
                pass:process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from:"Study Notion",
            to: `${email}`,
            subject: `${title}`,
            html:`<p>${body}</p>`
        });
        console.log(info);
        return info;
    } catch (error) {
        console.log(error);
    }
};

module.exports = mailSender;