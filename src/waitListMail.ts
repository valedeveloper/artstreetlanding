import dotenv from "dotenv";
import path from "path";
import nodemailer from 'nodemailer';

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const waitlistTransporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.WAITLIST_API_KEY
  }
});

export const sendWaitlistEmail = async (recipientEmail:string) => {
  try {
    await waitlistTransporter.sendMail({
      from: 'onboarding@resend.dev',
      to: "artstreetcol@gmail.com",
      subject: "¡Gracias por unirte a la lista de espera de Art Street!",
      html: `<p>Hola,</p>
            <p>Gracias por unirte a nuestra lista de espera. Te mantendremos informado sobre las últimas actualizaciones y novedades.</p>
            <p>Atentamente,<br/>ArtStreet</p>`
    });
    console.log(`Correo enviado a ${recipientEmail} para la lista de espera.`);
  } catch (error) {
    console.error("Error al enviar correo para la lista de espera:", error);
    throw new Error("Error al enviar correo para la lista de espera");
  }
};
