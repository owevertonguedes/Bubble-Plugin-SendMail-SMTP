async function(properties, context) {
    const nodemailer = require("nodemailer");

    // Criar um transportador
    const transporter = nodemailer.createTransport({
        host: properties.host, // Ex: 'smtp.example.com'
        port: parseInt(properties.port, 10), // Converte a porta para um número inteiro
        secure: parseInt(properties.port, 10) === 465, // true para 465, false para outras portas
        auth: {
            user: properties.user,
            pass: properties.pass
        }
    });

    // Definir as opções do e-mail
    const mailOptions = {
        from: properties.user, // Remetente
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
