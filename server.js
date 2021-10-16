const express = require("express");
const app = express();

const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;

// middlelware, in oreder to use the static files from public
app.use(express.static("public"));
app.use(express.json()); // this piece of middleware gives the abbility to read json in request.body



app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/contactform.html") // __dirname = the directory where actually been
});

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jitupedret@gmail.com',
            pass: 'celdoni95'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'jitupedret@gmail.com',
        subject: `Message from ${req.body.email}:   ${req.body.subject}`,
        text: `${req.body.message},   Name: ${req.body.names}`
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log("Email sent: " + info.response);
            res.send("success")
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});