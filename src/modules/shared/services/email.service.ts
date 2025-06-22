import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    // TODO: Implementar servicio de email real (Nodemailer, SendGrid, etc.)
    this.logger.log(`Email enviado a ${to}: ${subject}`);
    this.logger.log(`Contenido: ${content}`);
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const subject = 'Bienvenido a Ticut';
    const content = `Hola ${name}, bienvenido a nuestra plataforma!`;
    
    await this.sendEmail(email, subject, content);
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const subject = 'Restablecer contraseña';
    const content = `Tu token para restablecer contraseña es: ${resetToken}`;
    
    await this.sendEmail(email, subject, content);
  }
} 