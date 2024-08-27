import bcrypt from 'bcrypt';
import { getClient } from '../db'
// username: admin
// password: strings123
async function loadAdminUser(username: string, password: string) {
    console.log(`Executing loading admin user ${username} and pw ${password}....`);
    const client = await getClient();

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    await client.connect();

    await client.query(
        `insert into public.users(username, password, is_admin) values ($1, $2, $3)`,
        [username, hash, true]
    )

    await client.end()
}

const username = process.argv[2]
const password = process.argv[3]
loadAdminUser(username, password);