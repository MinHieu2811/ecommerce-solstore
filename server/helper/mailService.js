// import nodemailer from 'nodemailer';
// import { nanoid } from 'nanoid';
// const { MAIL_USER, MAIL_PASSWORD } = process.env;

// const sendMail = (userMail, token) => {
//     const mailer = nodemailer.createTransport({
//         service: "gmail",
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: "cuunhatnhat51@gmail.com",
//             pass: "cuunhatnhat"
//         }
//     });

//     const mailOptions = {
//         from: "cuunhatnhat51@gmail.com",
//         to: userMail,
//         subject: "Verify your email",
//         html: '<p>Không chia sẻ đường dẫn này với bất kỳ ai khác, đường dẫn chỉ có hiệu lực trong 10 phút! vào đây: <a href="http://localhost:8080/reset-password?token=' +
//         token +
//         '">link</a> để đặt lại mật khẩu</p>',
//     };

//     mailer.sendMail(mailOptions, function (err, info) {
//         if(err){
//             console.log("Mail Service: ",err);
//             return false;
//         }else{
//             console.log("Mail Service: ",info.response);
//             return true;
//         }
//     })
// } 

// export default sendMail;