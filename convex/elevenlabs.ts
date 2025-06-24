import { v } from 'convex/values';
import { ElevenLabsClient } from 'elevenlabs';
import { action } from './_generated/server';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export const processVideo = action({
  args: {
    videoId: v.id('_storage'),
  },
  handler: async (ctx, args) => {},
});
