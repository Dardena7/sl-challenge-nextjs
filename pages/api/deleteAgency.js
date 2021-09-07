import YodaClient from "../../db/YodaClient";
import { ObjectId } from "mongodb";

async function handler(req, res) {
    if (req.method === 'DELETE') {
        const data = req.body;

        const client = await YodaClient();
        const db = client.db();

        const agenciesCollection = db.collection('yoda-agency');

        const result = await agenciesCollection.deleteOne({_id: ObjectId(data.agencyId)});
        console.log(result);
        client.close();

        res.status(204).json({message: 'Agency deleted !'});
    }
}

export default handler;