import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authorizeProject, getUser } from './auth';

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

export const listProjects = query(async (ctx) => {
  const user = await getUser(ctx);
  return await ctx.db
    .query('projects')
    .withIndex('by_user', (q) => q.eq('userId', user._id))
    .collect();
});

export const getProject = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const { project } = await authorizeProject(ctx, args.projectId);
    return project;
  },
});

export const getFileUrl = query({
  args: { id: v.optional(v.id('_storage')) },
  handler: async (ctx, args) => {
    if (!args.id) {
      throw new ConvexError(`No file id provided`);
    }
    return await ctx.storage.getUrl(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id('projects'),
    name: v.optional(v.string()),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('ready'),
      v.literal('failed')
    ),
    captions: v.optional(
      v.array(
        v.object({
          text: v.string(),
          start: v.number(),
          end: v.number(),
          type: v.union(
            v.literal('word'),
            v.literal('spacing'),
            v.literal('audio_event')
          ),
          speaker_id: v.string(),
        })
      )
    ),
    language: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    const existign = await ctx.db.get(id);

    if (!existign) {
      throw new ConvexError(`Project not found`);
    }

    if (updates.captions) {
      updates.status = 'ready';
    }

    return await ctx.db.patch(id, { ...updates, lastUpdate: Date.now() });
  },
});
