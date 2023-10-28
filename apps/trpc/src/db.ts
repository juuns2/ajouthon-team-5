import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from './const';
import schema from './schema';

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: true,
});

const db = drizzle(pool, { schema: schema });

export default db;
