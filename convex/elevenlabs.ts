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
  handler: async (ctx, args) => {
    const file = await ctx.storage.getUrl(args.videoId);
    if (!file) {
      throw new Error('File not found');
    }

    const response = await fetch(file);
    const videoBlob = new Blob([await response.arrayBuffer()], {
      type: 'video/mp4',
    });

    const result = await client.speechToText.convert({
      file: videoBlob,
      model_id: 'scribe_v1',
      language_code: 'eng',
    });

    const transformedWords = result.words
      .filter((word) => word.type === 'audio_event')
      .map((word) => ({
        text: word.text,
        start: word.start ?? 0,
        end: word.end ?? (word.start ?? 0) + 0.1,
        type: word.type as 'word' | 'spacing',
        speaker_id: word.speaker_id ?? 'speaker_1',
      }));

    return {
      words: transformedWords,
      language_code: result.language_code,
    };
  },
});
