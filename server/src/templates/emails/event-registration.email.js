export const getEventRegistrationEmailTemplate = (studentName, event, registrationId) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Registration Confirmed</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f6f5f0;
          color: #1a1a1a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          margin-top: 40px;
          margin-bottom: 40px;
          border: 1px solid #e0dfd5;
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
        }
        .logo {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: #1a1a1a;
          text-decoration: none;
        }
        .content {
          font-size: 16px;
          line-height: 1.6;
        }
        h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1a1a1a;
        }
        p {
          margin-bottom: 24px;
          color: #4a4a4a;
        }
        .event-card {
          background-color: #f9f9f9;
          border: 1px solid #e0dfd5;
          padding: 24px;
          border-radius: 6px;
          margin-bottom: 32px;
        }
        .meta-item {
          margin-bottom: 12px;
        }
        .meta-label {
          font-size: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 4px;
        }
        .meta-value {
          font-weight: 600;
          color: #1a1a1a;
        }
        .cta-button {
          display: inline-block;
          background-color: #1a1a1a;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .footer {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid #e0dfd5;
          font-size: 12px;
          color: #888888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">STC.</div>
        </div>
        <div class="content">
          <h1>You're in, ${studentName}! 🎉</h1>
          <p>Your registration for <strong>${event.name}</strong> has been successfully confirmed. We can't wait to see what you build and learn.</p>
          
          <div class="event-card">
            <div class="meta-item">
              <span class="meta-label">Event</span>
              <span class="meta-value">${event.name}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date & Time</span>
              <span class="meta-value">${event.date} • ${event.time}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Location / Venue</span>
              <span class="meta-value">${event.venue}</span>
            </div>
            <div class="meta-item" style="margin-bottom: 0;">
              <span class="meta-label">Registration ID</span>
              <span class="meta-value" style="font-family: monospace;">${registrationId}</span>
            </div>
          </div>
          
          <p>Please keep this email for your records. If this is an in-person event, you may be asked to show your Registration ID at the venue.</p>
          
          ${event.url ? `
          <div style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
            <a href="${event.url}" class="cta-button">View Event Details</a>
          </div>
          ` : ''}
          
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Student Tech Community.<br>
          Building the future, together.
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getEventRegistrationEmailText = (studentName, event, registrationId) => {
  return `You're in, ${studentName}!

Your registration for "${event.name}" has been successfully confirmed.

Event Details:
- Event: ${event.name}
- Date & Time: ${event.date} • ${event.time}
- Location / Venue: ${event.venue}
- Registration ID: ${registrationId}

Please keep this email for your records.
${event.url ? `View Event: ${event.url}\n` : ''}
See you there!
The STC Team

(c) ${new Date().getFullYear()} Student Tech Community.`;
};
