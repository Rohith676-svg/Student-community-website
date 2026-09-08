export const getWelcomeEmailTemplate = (studentName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to STC</title>
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
          <h1>Welcome, ${studentName}! 🚀</h1>
          <p>We are thrilled to have you join the Student Tech Community. This is where learning turns into participation, and where you'll find the people who want to build what's next.</p>
          <p>As a member of STC, you now have access to our upcoming workshops, build sessions, hackathons, and exclusive community roadmaps.</p>
          <p>To get the most out of your experience, make sure your profile is fully complete. We'll use this to match you with the right opportunities.</p>
          
          <div style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
            <a href="https://rohith676-svg.github.io/Student-community-website/" class="cta-button">Explore the Community</a>
          </div>
          
          <p>If you haven't already, join our official communication channels to stay updated on the latest events.</p>
          <p>See you at the next event,<br><strong>The STC Team</strong></p>
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

export const getWelcomeEmailText = (studentName) => {
  return `Welcome, ${studentName}!

We are thrilled to have you join the Student Tech Community (STC). This is where learning turns into participation, and where you'll find the people who want to build what's next.

As a member of STC, you now have access to our upcoming workshops, build sessions, hackathons, and exclusive community roadmaps.

To get the most out of your experience, make sure your profile is fully complete.
Explore the Community: https://rohith676-svg.github.io/Student-community-website/

See you at the next event,
The STC Team

(c) ${new Date().getFullYear()} Student Tech Community.`;
};
