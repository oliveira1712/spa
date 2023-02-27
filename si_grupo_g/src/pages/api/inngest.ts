//https://www.inngest.com/docs/frameworks/nextjs

import { serve } from 'inngest/next';
import sendNewsletter from '@/services/tasks/sendNewsletter';

// You must export the serve handler, which hosts all of the provided functions
// under one API endpoint.
export default serve('Crontab', [sendNewsletter]);
