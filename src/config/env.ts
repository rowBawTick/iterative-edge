/**
 * Environment configuration
 */

// Simple check for required environment variables on startup
['SENDGRID_API_KEY', 'NOTIFICATION_EMAIL', 'FROM_EMAIL'].forEach(key => {
  if (!process.env[key]) {
    console.warn(`Warning: Missing environment variable ${key}`);
  }
});

export const config = {
  appName: 'Iterative Edge',
};
