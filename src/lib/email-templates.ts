// Email templates for different product types
export function getEmailTemplate(productData: any, planData: any, customerEmail: string) {
  const isDownloadable = productData.title.toLowerCase().includes('plantilla') ||
                        productData.title.toLowerCase().includes('excel') ||
                        productData.title.toLowerCase().includes('digital');

  if (isDownloadable) {
    return {
      subject: `¡Tu descarga de ${productData.title} está lista!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0891b2, #0e7490); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">¡Gracias por tu compra!</h1>
            <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Tu pago ha sido procesado exitosamente</p>
          </div>

          <div style="padding: 30px 20px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0891b2;">
              <h3 style="color: #0891b2; margin: 0 0 15px 0;">📎 Tu producto está listo</h3>
              <p style="margin: 0; color: #374151; line-height: 1.6;">
                <strong>${productData.title}</strong><br>
                Revisa los archivos adjuntos en este correo para descargar tu producto inmediatamente.
              </p>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin: 0 0 15px 0;">📋 Instrucciones de uso:</h4>
              <ol style="color: #92400e; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Descarga el archivo adjunto a tu computadora</li>
                <li style="margin-bottom: 8px;">Guarda el archivo en una ubicación segura</li>
                <li style="margin-bottom: 8px;">Abre el archivo con Excel o el programa correspondiente</li>
                <li style="margin-bottom: 8px;">Sigue las instrucciones en la primera hoja del documento</li>
              </ol>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280; margin: 0 0 20px 0;">
                ¿Necesitas ayuda con la instalación o uso del producto?
              </p>
              <a href="mailto:soporte@todoconta.com" style="background: #0891b2; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                Contactar Soporte
              </a>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>Todoconta</strong> - Soluciones fiscales y contables<br>
              <a href="https://todoconta.com" style="color: #0891b2;">www.todoconta.com</a>
            </p>
          </div>
        </div>
      `,
      text: `
¡Gracias por tu compra!

Tu pago ha sido procesado exitosamente.

PRODUCTO: ${productData.title}

INSTRUCCIONES:
1. Descarga el archivo adjunto
2. Guarda el archivo en tu computadora
3. Abre el archivo con Excel
4. Sigue las instrucciones incluidas

¿Necesitas ayuda? Contactanos: soporte@todoconta.com

Todoconta - www.todoconta.com
      `.trim()
    };
  } else {
    // Software license template
    return {
      subject: `Instrucciones de activación - ${productData.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0891b2, #0e7490); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">¡Bienvenido a ${productData.title}!</h1>
            <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Tu licencia ha sido activada exitosamente</p>
          </div>

          <div style="padding: 30px 20px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0891b2;">
              <h3 style="color: #0891b2; margin: 0 0 15px 0;">🔑 Información de tu licencia</h3>
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>Producto:</strong> ${productData.title}</p>
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>Plan:</strong> ${planData.title}</p>
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>Vigencia:</strong> ${planData.pricePeriod || '1 año'}</p>
              <p style="margin: 0; color: #374151;"><strong>Email de registro:</strong> ${customerEmail}</p>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin: 0 0 15px 0;">🚀 Pasos para activar tu licencia:</h4>
              <ol style="color: #92400e; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Descarga el software desde: <a href="https://softwarepaq2.com/downloads/" style="color: #0891b2;">softwarepaq2.com</a></li>
                <li style="margin-bottom: 8px;">Instala el programa en tu computadora</li>
                <li style="margin-bottom: 8px;">Ejecuta el software por primera vez</li>
                <li style="margin-bottom: 8px;">Copia el "IMEI" que aparece en la pantalla</li>
                <li style="margin-bottom: 8px;">Envíanos el IMEI por email: <a href="mailto:licencias@todoconta.com" style="color: #0891b2;">licencias@todoconta.com</a></li>
                <li style="margin-bottom: 8px;">Recibirás tu código de activación en menos de 24 horas</li>
              </ol>
            </div>

            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h4 style="color: #047857; margin: 0 0 15px 0;">📞 Soporte técnico incluido</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <p style="margin: 0; color: #047857;">
                  <strong>Email:</strong> <a href="mailto:soporte@todoconta.com" style="color: #0891b2;">soporte@todoconta.com</a>
                </p>
                <p style="margin: 0; color: #047857;">
                  <strong>WhatsApp:</strong> <a href="https://wa.me/5215544753602" style="color: #0891b2;">+52 55 4475 3602</a>
                </p>
                <p style="margin: 0; color: #047857;">
                  <strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00 CST
                </p>
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://softwarepaq2.com/downloads/" style="background: #0891b2; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                Descargar Software
              </a>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>Todoconta</strong> - Soluciones fiscales y contables<br>
              <a href="https://todoconta.com" style="color: #0891b2;">www.todoconta.com</a>
            </p>
          </div>
        </div>
      `,
      text: `
¡Bienvenido a ${productData.title}!

Tu licencia ha sido activada exitosamente.

INFORMACIÓN DE LICENCIA:
- Producto: ${productData.title}
- Plan: ${planData.title}
- Vigencia: ${planData.pricePeriod || '1 año'}
- Email: ${customerEmail}

PASOS PARA ACTIVAR:
1. Descarga el software desde: https://softwarepaq2.com/downloads/
2. Instala el programa
3. Ejecuta el software
4. Copia el IMEI
5. Envia el IMEI a: licencias@todoconta.com
6. Recibirás el código de activación

SOPORTE:
Email: soporte@todoconta.com
WhatsApp: +52 55 4475 3602

Todoconta - www.todoconta.com
      `.trim()
    };
  }
}