import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt';
import { getClient } from "@/db";
 
async function loadFakeData(numUsers: number = 10) {
    console.log("Exectuting Load Fake Data.");
    
    const client = await getClient();
    
    await client.connect();
    
    try {
        await client.query("begin")
        const saltRounds = 10;
        const hash = await bcrypt.hash("strings123", saltRounds);
        
        for(let i = 0; i < numUsers; i++) {
            await client.query("insert into public.users (username, password, avatar) values ($1, $2, $3)", 
                [faker.internet.userName(), hash, faker.image.avatar()])
            }
        
        const res = await client.query(
            "select id from public.users order by created_at desc limit $1",
            [numUsers]
        );
        console.log(res.rows);

        for(const row of res.rows){
            for(let i = 0; i < Math.ceil(Math.random() * 50); i++){
                await client.query(
                    "insert into public.posts(user_id, content) values ($1, $2)",
                    [row.id, faker.lorem.sentence()]
                )
            }
        }

        for(const row1 of res.rows) {
            for(const row2 of res.rows) {
                if(Math.random() > 0.5) {
                    await client.query(
                        "insert into follows(user_id, follower_id) values ($1, $2)",
                        [row1.id, row2.id]
                    );
                }
            }
        }
            
            await client.query("commit")
        } catch (error) {
            await client.query("rollback")
            throw error
        } finally {
            await client.end();
        }
        
    }
    
    const numUsers = parseInt(process.argv[2]) || 10
    console.log(`Generating ${numUsers} fake users ...`)
    
    loadFakeData(numUsers);
    
    // import { Client } from "pg";
    // import { loadEnvConfig } from '@next/env'
    
    // const projectDir = process.cwd()
    // loadEnvConfig(projectDir);
    
    // async function loadFakeData(numUsers: number = 10) {
        //     console.log("Exectuting Load Fake Data.");
//     console.log(`Generating ${numUsers} fake users ...`)

//     const client = new Client({
//         user: process.env.POSTGRES_USER,
//         host: process.env.POSTGRES_HOST,
//         database: process.env.POSTGRES_NAME, 
//         password: process.env.POSTGRES_PASSWORD,
//         port: parseInt(process.env.POSTGRES_PORT!),
//     })

//     await client.connect();

//     const res = await client.query("select 1")
//     console.log(res)
//     await client.end();
// }

// loadFakeData();