import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const User = {
  email: v.string(),
  externalId: v.string(),
  imageUrl: v.optional(v.string()),
  name: v.optional(v.string()),
};

export default defineSchema({
  user: defineTable(User).index('byExternalId', ['externalId']),
  projects: defineTable({
    userId: v.id('user'),
    name: v.string(),
    lastUpdate: v.number(),
    videoSize: v.number(),
    videoFileId: v.id('_storage'),
    language: v.optional(v.string()),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('ready'),
      v.literal('failed')
    ),
  }),
});
