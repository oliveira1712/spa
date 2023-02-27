import { createScheduledFunction } from 'inngest';

const sendNewsletter = createScheduledFunction(
  'Refresh token TOConline',
  '0 */3 * * *', // At minute 0 past every 3rd hour. https://crontab.guru/#1_*_*_*_*
  async () => {
    console.log('Send newsletter');
  }
);

export default sendNewsletter;
