
const sgMail=require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// sgMail.send({
//     to:'devpatel8907@gmail.com',
//     from:'devpatel8907@gmail.com',
//     subject:'This is my first creation',
//     text:'i hope this one actually gets you'
// })
const sendwelcomeemail=(email,name) => {
    sgMail.send({
        to:email,
        from:'devpatel8907@gmail.com',
        subject:'Thanks for Joining in!',
        text:`Welcome to the app,${name}.Let me know how you get along with the app`
    })
}
const sendgoodbyeemail=(email,name) => {
    sgMail.send({
        to:email,
        from:'devpatel8907@gmail.com',
        subject:`Good Bye ${name}`,
        text:`Sorry to see you go.Just let us know how can we improve.I hope to see you back sometime again`
    })
}
module.exports={
    sendwelcomeemail,
    sendgoodbyeemail
};