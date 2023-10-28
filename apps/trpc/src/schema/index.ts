import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: serial('id'),
    googleId: varchar('google_id', { length: 64 }).notNull(),
    nickname: text('nickname'),
});

export default { user };
