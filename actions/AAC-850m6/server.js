async function(properties, context) {
    const nodemailer = require("nodemailer");

    // Criar um transportador
    const transporter = nodemailer.createTransport({
        host: context.keys["Host"], // Ex: 'smtp.example.com'
        port: parseInt(context.keys["Port"], 10), // Converte a porta para um número inteiro
        secure: parseInt(context.keys["Port"], 10) === 465, // true para 465, false para outras portas
        auth: {
            user: context.keys["User"],
            pass: context.keys["Pass"]
        }
    });

    // Definir as opções do e-mail
    const mailOptions = {
        from: context.keys["User"], // Remetente
        to: properties.to, // Destinatário
        subject: properties.subject, // Assunto
        text: properties.body, // Corpo do e-mail (texto)
        html: properties.body // Corpo do e-mail (HTML, se necessário)
    };
    
    // Enviar o e-mail
    try {
        const info = await transporter.sendMail(mailOptions);
        return { status: 'true', data: `Success: ${info}`};
    } catch (error) {
        return { status: 'false', data: `Error: ${error.message}`};
    }
}
