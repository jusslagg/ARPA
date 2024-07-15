const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para permitir CORS (si es necesario)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});

// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
    const { email, nombre, mensaje } = req.body;

    // Configuración del servicio de correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu_correo@gmail.com',  // Coloca aquí tu dirección de correo de Gmail
            pass: 'tu_contraseña'  // Coloca aquí la contraseña de tu cuenta de Gmail
        }
    });

    // Configuración del correo electrónico
    const mailOptions = {
        from: 'tu_correo@gmail.com',  // Dirección de correo remitente (debe ser la misma que user en transporter)
        to: 'consultora.arpa@gmail.com',  // Dirección de correo destinatario
        subject: 'Mensaje desde el formulario de contacto',
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el mensaje');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Mensaje enviado correctamente');
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
