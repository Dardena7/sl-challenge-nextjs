import AddAgency from '../../components/agency/AddAgency';
import YodaHead from "../../components/head/YodaHead";
import Navigation from "../../components/navigation/Navigation";
import Link from "next/link";
import {useRouter} from "next/router";

const AddAgencyPage = () => {

    const router = useRouter();

    const addAgency = async (agencyData) => {
        const response = await fetch('/api/addAgency', {
            method: 'POST',
            body: JSON.stringify(agencyData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await router.push('/agencies');
    };

    const title = "Add agency";
    const meta_description = "Add a new agency";

    return (
        <>
            <YodaHead title={title} meta_description={meta_description}/>

            <Navigation/>

            <main>
                <h1 className={'star-wars-font'}>
                    Add Agency
                </h1>
                <div className='container'>
                    <AddAgency onAddAgency={addAgency}/>
                    <Link href={"/agencies"}>
                        <button  className='btn btn-light yoda-btn'>Back to agencies</button>
                    </Link>

                </div>
            </main>
        </>

    );
};

export default AddAgencyPage;
