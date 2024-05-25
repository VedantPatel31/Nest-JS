import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
    service:'gmail',
      secure: false, 
      auth: {
        user: 'vedptlv@gmail.com', 
        pass: 'ckdkrxsopqtzelqy', 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: 'vedptlv@gmail.com', 
      to,
      subject,
      text,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
