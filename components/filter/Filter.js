import FilterItem from "./FilterItem";

const Filter = (props) => {
    return (
        <>
            <h2>Filter</h2>
            <hr/>
            <div>
                <ul>
                    {props.availableFilters.map((filter,index) =>
                        <FilterItem
                            onSelect={props.onSelect}
                            key={index}
                            filter={filter}
                        />
                    )}
                </ul>
            </div>
            <hr/>
        </>
    );
};

export default Filter;
