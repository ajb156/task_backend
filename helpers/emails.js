import nodemailer from 'nodemailer';

export const emailRegistro = async ({ nombre, email, token }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Informacion del email
  const info = await transporter.sendMail({
    from: '"TaskManager - Administrador de Proyectos <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Confirma Tu cuenta ✉️ ', // Subject line
    text: 'Confirma tu cuenta en UpTask', // plain text body
    html: `
      <h1>Hola, ${nombre}</h1>
      <p>
        Tu cuenta esta casi lista, solo falta que la confirmes en el siguiente enlace: <a href="${process.env.FRONT_HOST}/confirmar/${token}">Comfirmar cuenta</a>
      </p>
    `, // html body
  });
};

export const emailOlvidePassword = async ({ nombre, email, token }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Informacion del email
  const info = await transporter.sendMail({
    from: '"TaskManager - Administrador de Proyectos <cuenta@uptask.com>', // sender address
    to: email, // list of receivers
    subject: 'Restablece Tu Contraseña ✉️ ', // Subject line
    text: 'Confirma tu cuenta en UpTask', // plain text body
    html: `
      <h1>Hola, ${nombre}</h1>
      <p>
        Has solicitado restablecer tu contraseña, sigue el siguiente enlace: <a href="${process.env.FRONT_HOST}/olvide-password/${token}">Cambiar Contraseña</a>
      </p>
    `, // html body
  });
};
