const SortBy = (props) => {
    return (
        <div className='sort-select'>
            <strong>Sort By :</strong>
            <select onChange={(e) => props.onSort(e)} value={props.value} className="form-select">
                {props.options.map((option,index) =>
                    <option key={index} value={option.value}>{option.label}</option>
                )}
            </select>
        </div>
    );
};

export default SortBy;
