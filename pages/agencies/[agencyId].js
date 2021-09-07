import { ObjectId } from "mongodb";
import YodaHead from "../../components/head/YodaHead";
import Navigation from "../../components/navigation/Navigation";
import Link from "next/link";
import YodaClient from "../../db/YodaClient";
import {useRouter} from "next/router";

const AgencyPage = (props) => {

    const router = useRouter();

    const deleteAgency = async (agencyId) => {
        const response = await fetch('/api/deleteAgency', {
            method: 'DELETE',
            body: JSON.stringify({agencyId: agencyId}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 204) {
            await router.push('/agencies');
        }
    }

    return (
        <>
            <YodaHead title={props.agency.name} meta_description={props.agency.description} />

            <Navigation />

            <main>
                <h1>
                    Agency Details
                </h1>

                <section className='agency-details'>
                    <img src={props.agency.image} className="details-img" alt={props.agency.name} />
                    <h2>{props.agency.name}</h2>
                    <div className='page-description'>
                        <h3>Description :</h3>
                        <p>{props.agency.description}</p>
                    </div>
                    <div>
                        <h3>Grade :</h3>
                        <p>{props.agency.grade}</p>
                    </div>
                    <div className='page-description'>
                        <h3>Tags :</h3>
                        <ul>
                            {props.agency.tags.map((tag,index) => <li key={index}>{tag}</li>)}
                        </ul>
                    </div>
                    <button onClick={() => deleteAgency(props.agency.id)}  className='btn btn-danger yoda-btn'>Delete</button>
                </section>

                <Link href={"/agencies"}>
                    <button  className='btn btn-light yoda-btn'>Back to agencies</button>
                </Link>

            </main>
        </>
    );
};


export async function getStaticPaths(context) {

    const client = await YodaClient();
    const db = client.db();
    const agenciesCollection = db.collection('yoda-agency');
    const agencies = await agenciesCollection.find().toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: agencies.map((agency) => (
            {
                params: {
                    agencyId: agency._id.toString()
                }
            }
        )),
    };
}


export async function getStaticProps(context) {

    const client = await YodaClient();
    const db = client.db();
    const agenciesCollection = db.collection('yoda-agency');

    const agencyId = context.params.agencyId;

    const agency = await agenciesCollection.findOne({_id: ObjectId(agencyId)});

    client.close();

    return {
        props: {
            agency: {
                id: agency._id.toString(),
                name: agency.name,
                description: agency.description,
                image: agency.image,
                grade: agency.grade,
                tags: agency.tags.trim().split(','),
            }
        },
        revalidate: 1
    };
}

export default AgencyPage;
