import { sql } from 'drizzle-orm';
import {
    doublePrecision,
    index,
    integer,
    numeric,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    googleId: varchar('google_id', { length: 64 }).notNull(),
    nickname: text('nickname'),
});

export const bubble = pgTable('bubble', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .notNull()
        .references(() => user.id),
    category: varchar('category', { length: 32 }).notNull(),
    latitude: doublePrecision('latitude').notNull(),
    longitude: doublePrecision('longitude').notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' })
        .notNull()
        .default(sql`now()`),
});

export const bubbleReaction = pgTable(
    'bubble_reaction',
    {
        bubbleId: integer('bubble_id')
            .notNull()
            .references(() => bubble.id),
        userId: integer('user_id')
            .notNull()
            .references(() => user.id),
        reaction: varchar('reaction', { length: 1 }).notNull(),
    },
    (table) => {
        return {
            pk: primaryKey(table.bubbleId, table.userId, table.reaction),
        };
    },
);
export default { user, bubble, bubbleReaction };
