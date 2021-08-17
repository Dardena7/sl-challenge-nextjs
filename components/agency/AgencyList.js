import AgencyItem from "./AgencyItem";

const AgencyList = (props) => {
    return (
        <div className="row agencies-list">
            {props.filteredAgencies.map((agency) => {
                return (
                    <div key={agency.id} className="col-12 col-md-6 col-md-6 col-lg-4 agency-item">
                        <AgencyItem agency={agency}/>
                    </div>
                );
            })}
            <p className={`${props.filteredAgencies.length > 0 ? 'd-none' : ''}`}>There is no agency fitting your requirements !</p>
        </div>
    );
};

export default AgencyList;
