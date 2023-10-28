import type { Config } from 'drizzle-kit';

import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from './src/const';

export default {
    schema: './src/schema/*',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        host: PGHOST,
        database: PGDATABASE,
        user: PGUSER,
        password: PGPASSWORD,
        port: 5432,
        ssl: true,
    },
} satisfies Config;
