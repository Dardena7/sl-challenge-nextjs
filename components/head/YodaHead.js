import Head from "next/head";

const YodaHead = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.meta_description}/>
            <link rel="icon" href="/yoda.ico"/>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                  integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                  crossOrigin="anonymous"/>
        </Head>
    );
};

export default YodaHead;
