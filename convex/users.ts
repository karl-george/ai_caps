import { UserJSON } from '@clerk/backend';
import { v, Validator } from 'convex/values';
import { internalMutation, QueryCtx } from './_generated/server';

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  handler: async (ctx, { data }) => {
    const userAttributes = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      externalId: data.id,
      imageUrl: data.image_url,
    };

    // Check if user exists
    const user = await userByExternalId(ctx, userAttributes.externalId);
    if (user === null) {
      await ctx.db.insert('user', userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    const user = await userByExternalId(ctx, clerkUserId);
    if (user === null) {
      return;
    }
    await ctx.db.delete(user._id);
  },
});

const userByExternalId = async (ctx: QueryCtx, eternalId: string) => {
  return await ctx.db
    .query('user')
    .withIndex('byExternalId', (q) => q.eq('externalId', eternalId))
    .unique();
};
