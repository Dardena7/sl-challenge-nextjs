import Head from "next/head";

const YodaHead = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.meta_description}/>
            <link rel="icon" href="/yoda.ico"/>
        </Head>
    );
};

export default YodaHead;
