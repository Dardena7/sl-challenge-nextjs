import YodaHead from "../components/head/YodaHead";
import Navigation from "../components/navigation/Navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = (props) => {

    const title = "404 Error";
    const meta_description = "";

    return (
        <>
            <YodaHead title={title} meta_description={meta_description} />

            <Navigation />

            <main>
                <h1 className={'star-wars-font'}>
                    404 - Page Not Found
                </h1>

                <section className='agency-details'>

                    <Image src='/yoda.jpeg' width={200} height={200} />

                    <p className='page-description'>
                        May the force be with you !
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