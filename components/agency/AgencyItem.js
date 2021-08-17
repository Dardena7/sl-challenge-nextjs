import Link from "next/link";

const AgencyItem = (props) => {
    return (
        <div className="card">
            <img src={props.agency.image} className="card-img-top" alt={props.agency.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.agency.name}</h5>
                    <p className="card-text">{props.agency.grade}</p>
                    <Link href={`/agencies/${props.agency.id}`} passHref><a className="btn-dark yoda-btn">Details</a></Link>
                </div>
        </div>
    )
};

export default AgencyItem;
