import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function send2FAEmail(email: string, code: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Forstek <noreply@forstek.tn>',
    to: email,
    subject: '🔐 Votre code de vérification Forstek',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .code-box { background: white; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; border: 2px dashed #2563EB; }
            .code { font-size: 32px; font-weight: bold; color: #2563EB; letter-spacing: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Forstek</h1>
            </div>
            <div class="content">
              <h2>Bonjour ${name} 👋</h2>
              <p>Vous avez demandé à vous connecter à votre compte Forstek.</p>
              <p>Voici votre code de vérification à 6 chiffres :</p>
              
              <div class="code-box">
                <div class="code">${code}</div>
              </div>
              
              <p><strong>Ce code expire dans 10 minutes.</strong></p>
              <p>Si vous n'avez pas demandé ce code, veuillez ignorer cet email.</p>
              
              <div class="footer">
                <p>© 2024 Forstek - Plateforme de stages en Tunisie</p>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Forstek <noreply@forstek.tn>',
    to: email,
    subject: '🎉 Bienvenue sur Forstek !',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #2563EB, #7C3AED); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .feature { margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Bienvenue sur Forstek !</h1>
            </div>
            <div class="content">
              <h2>Bonjour ${name} 👋</h2>
              <p>Félicitations ! Votre compte Forstek a été créé avec succès.</p>
              
              <div class="features">
                <h3>🚀 Commencez dès maintenant :</h3>
                <div class="feature">✅ Explorez plus de 500 offres de stage</div>
                <div class="feature">✅ Créez votre profil professionnel</div>
                <div class="feature">✅ Suivez des parcours de formation</div>
                <div class="feature">✅ Connectez avec des mentors experts</div>
                <div class="feature">✅ Participez au forum communautaire</div>
              </div>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">
                  Accéder à mon dashboard
                </a>
              </center>
              
              <p>Besoin d'aide ? Notre équipe est là pour vous accompagner.</p>
              
              <div class="footer">
                <p>© 2024 Forstek - Plateforme de stages en Tunisie</p>
                <p>Suivez-nous : LinkedIn | Twitter | Facebook</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}
