const { Resend } = require("resend");
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

exports.mail = async (email, title, body) => {
    try {
        const info = await resend.emails.send({
            from: process.env.MAIL_FROM || "StudyNotion <onboarding@resend.dev>",
            to: email,
            subject: title,
            html: body,
        });

        if (info.error) {
            console.log("Resend error:", info.error);
            throw new Error(info.error.message);
        }

        console.log("integrated", info);

        return info;

    } catch (err) {
        console.log(err);
        return err.message;
    }
}