import express from 'express';
import queryDatabase from "./queryPromise";

export async function createApp() {

    const characters = ['Dave', 'John', 'Steve', 'Janet', 'Morgan', 'Jack', 'Will', 'Carmen', 'Terry']

    const sqlInsert = 'INSERT INTO people(name) VALUES (?)';

    for (const character of characters) {
        await queryDatabase(sqlInsert, [character]);
    }

    const app = express();

    app.get('/', async (req, res) => {
        const selectCharacters = 'SELECT * FROM people';

        const allCharacters = await queryDatabase(selectCharacters);

        const html = `<h1>People</h1>\n
  <ul>
    ${allCharacters.map((character: {name: string}) => {
            return `<li>${character.name}</li>`;
        }).join('')}
  </ul>`
        res.send(html)
    })
    return app
}