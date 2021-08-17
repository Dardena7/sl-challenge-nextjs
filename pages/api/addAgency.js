import YodaClient from "../../db/YodaClient";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await YodaClient();
        const db = client.db();

        const agenciesCollection = db.collection('yoda-agency');

        await agenciesCollection.insertOne(data);

        client.close();

        res.status(201).json({message: 'Agency inserted !'});
    }
}

export default handler;