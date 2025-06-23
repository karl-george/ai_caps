import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUser } from './auth';

// Generate a URL to upload a video file
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Create a new project with the uploaded file
export const createProject = mutation({
  args: {
    name: v.string(),
    videoSize: v.number(),
    videoFileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    return await ctx.db.insert('projects', {
      userId: user._id,
      name: args.name,
      lastUpdate: Date.now(),
      videoSize: args.videoSize,
      videoFileId: args.videoFileId,
      status: 'pending',
    });
  },
});
