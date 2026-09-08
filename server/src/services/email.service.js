import nodemailer from 'nodemailer';
import { db } from '../config/firebase.js';
import env from '../config/env.js';

// Import templates
import { getWelcomeEmailTemplate, getWelcomeEmailText } from '../templates/emails/welcome.email.js';
import { getEventRegistrationEmailTemplate, getEventRegistrationEmailText } from '../templates/emails/event-registration.email.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initTransporter();
  }

  initTransporter() {
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD) {
      console.warn('⚠️ SMTP credentials missing. EmailService will log emails but not send them.');
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT || 587,
      secure: env.SMTP_SECURE || false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
    this.isConfigured = true;
    console.log('📧 Nodemailer transporter initialized.');
  }

  /**
   * Logs an email attempt to Firestore
   */
  async logEmail(type, recipient, userId, status, errorMsg = null, extraData = {}) {
    try {
      const logData = {
        type,
        recipient,
        userId,
        status,
        error: errorMsg,
        createdAt: new Date(),
        ...extraData
      };

      if (status === 'sent') {
        logData.sentAt = new Date();
      }

      await db.collection('emailLogs').add(logData);
    } catch (dbError) {
      console.error('❌ Failed to log email to Firestore:', dbError.message);
    }
  }

  /**
   * Core send logic with error handling and logging
   */
  async _sendEmail(mailOptions, logType, userId, extraLogData = {}) {
    if (!this.isConfigured) {
      console.warn(`[Mock Email] Would have sent ${logType} to ${mailOptions.to}`);
      await this.logEmail(logType, mailOptions.to, userId, 'failed', 'SMTP not configured', extraLogData);
      return false;
    }

    try {
      const options = {
        from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL || env.SMTP_USER}>`,
        ...mailOptions,
      };

      await this.transporter.sendMail(options);
      await this.logEmail(logType, options.to, userId, 'sent', null, extraLogData);
      return true;
    } catch (error) {
      console.error(`❌ Failed to send ${logType} email to ${mailOptions.to}:`, error.message);
      await this.logEmail(logType, mailOptions.to, userId, 'failed', error.message, extraLogData);
      return false;
    }
  }

  /**
   * Send a welcome email to a newly registered user
   */
  async sendWelcomeEmail(user) {
    if (!user || !user.email) return false;

    const studentName = user.displayName || user.email.split('@')[0];
    const html = getWelcomeEmailTemplate(studentName);
    const text = getWelcomeEmailText(studentName);
    
    return this._sendEmail(
      {
        to: user.email,
        subject: 'Welcome to Student Tech Community 🚀',
        text,
        html,
        headers: {
          'X-Mailer': 'STC Mailer',
          'List-Unsubscribe': `<mailto:${env.SMTP_FROM_EMAIL || env.SMTP_USER}?subject=unsubscribe>`,
        },
      },
      'welcome',
      user.uid
    );
  }

  /**
   * Send an event registration confirmation email
   */
  async sendEventRegistrationEmail(user, event, registrationId) {
    if (!user || !user.email || !event) return false;

    const html = getEventRegistrationEmailTemplate(user.displayName, event, registrationId);
    const text = getEventRegistrationEmailText(user.displayName, event, registrationId);
    
    return this._sendEmail(
      {
        to: user.email,
        subject: `You're registered for ${event.name} 🎉`,
        text,
        html,
        headers: {
          'X-Mailer': 'STC Mailer',
          'List-Unsubscribe': `<mailto:${env.SMTP_FROM_EMAIL || env.SMTP_USER}?subject=unsubscribe>`,
        },
      },
      'event_registration',
      user.uid,
      {
        eventId: event.id,
        registrationId,
      }
    );
  }
}

// Export as a singleton
const emailService = new EmailService();
export default emailService;
