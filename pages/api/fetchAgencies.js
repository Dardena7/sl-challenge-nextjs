import YodaClient from "../../db/YodaClient";

async function handler(req, res) {

    if (req.method === 'GET') {
        const client = await YodaClient();
        const db = client.db();
        const agenciesCollection = db.collection('yoda-agency');
        const agencies = await agenciesCollection.find().toArray();
        client.close();

        res.status(200).json(
            {
                agenciesData : agencies.map(agency => ({
                    name: agency.name,
                    description: agency.description,
                    grade: agency.grade,
                    tags: agency.tags.split(',').map(
                        tag => {
                            tag = tag.trim().toLowerCase();
                            return tag[0].toUpperCase() + tag.slice(1);
                        }
                    ),
                    image: agency.image,
                    id: agency._id.toString(),
                })),
            }
        );
    }
    return {};
}

export default handler;