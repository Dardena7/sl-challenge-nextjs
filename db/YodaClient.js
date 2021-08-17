import { MongoClient } from 'mongodb';

const YodaClient = async () => {
    return await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e0xda.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
}

export default YodaClient;