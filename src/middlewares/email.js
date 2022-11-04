const nodemailer = require("nodemailer");
module.exports = async (email, subject, url,name) => {
	try {
		const transporter = nodemailer.createTransport({
			// host: process.env.SMTP_HOST,
			// service: process.env.SMTP_SERVICE,
			// port: Number(process.env.SMTP_EMAIL_PORT),
			// secure: Boolean(process.env.SMTP_SECURE),
            // service: 'gmail',
			// host: "smtp.zoho.com",
			// secure: true,
			// port: 465,
			// auth: {
			// 	user: process.env.SMTP_EMAIL_USER,
			// 	pass: process.env.SMTP_EMAIL_PASS,
			// },
			service: 'gmail',
      	auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
		clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
		});

		await transporter.sendMail({
			from: process.env.SMTP_EMAIL_USER,
			to: email,
			subject: `${subject} is your otp`,
			html: `<div>
					<h1>Email Confirmation</h1>
                    <h2>Hello ${name}</h2>
                    <p>Thank you for join us. Please confirm your email by clicking on the following link</p>
                    <a href='${url}'> Click here</a>
					atau masuk ke link ${url}
                    </div>`
		});
		console.log("email sent successfully");
		return "email sent successfully"
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return "email not sent!";
	}
};