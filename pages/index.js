import YodaHead from '../components/head/YodaHead';
import Navigation from '../components/navigation/Navigation';
import Link from "next/link";
import Image from 'next/image';
import React from "react";

const HomePage = (props) => {

    const title = "Yoda Agency";
    const meta_description = "Yoda Agency App with NextJs";

    return (
        <>
            <YodaHead title={title} meta_description={meta_description} />

            <Navigation />

            <main>
                <h1 className={'star-wars-font'}>
                    Welcome to Yoda Agency !
                </h1>

                <section className='agency-details'>

                    <Image src='/jedi-logo.jpg' width={200} height={200} alt='jedi order logo'/>

                    <p className='page-description'>
                        <strong>Search</strong> and <strong>Add</strong> Jedi Agencies !
                    </p>

                    <div className="btn-wrapper">
                        <Link href={"/agencies"}>
                            <button  className='btn btn-light yoda-btn'>See all our agencies</button>
                        </Link>

                        <Link href={"/agencies/add"} className='btn  btn-primary'>
                            <button  className='btn btn-light yoda-btn'>Add your own agency</button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomePage;
