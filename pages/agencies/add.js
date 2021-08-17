import AddAgency from '../../components/agency/AddAgency';
import YodaHead from "../../components/head/YodaHead";
import Navigation from "../../components/navigation/Navigation";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";

const AddAgencyPage = () => {

    const router = useRouter();

    const [disableAdd, setDisableAdd] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(false);

    const addAgency = async (agencyData) => {

        setDisableAdd(true);
        setSuccessAdd(false);
        setErrorAdd(false);

        const response = await fetch('/api/addAgency', {
            method: 'POST',
            body: JSON.stringify(agencyData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            setSuccessAdd(true);
            await router.push('/agencies');
        }
        else {
            setErrorAdd(true);
            setDisableAdd(false);
        }

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
                    <AddAgency onAddAgency={addAgency} disableAdd={disableAdd} successAdd={successAdd} errorAdd={errorAdd}/>
                    <Link href={"/agencies"}>
                        <button  className='btn btn-light yoda-btn'>Back to agencies</button>
                    </Link>

                </div>
            </main>
        </>

    );
};

export default AddAgencyPage;
