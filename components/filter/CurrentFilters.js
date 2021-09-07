const CurrentFilters = (props) => {
    return (
        <div>
            <h2>Current filters: </h2>
            <ul>
                {props.filters.map((elem, index) => <li className='d-inline-block p-2' key={index}>{elem}</li>)}
            </ul>
            <p className={`${props.filters.length > 0 ? 'd-none' : ''}`}>No filter selected</p>
            <div>
                <button onClick={() => props.onReset()} className='btn btn-danger'>Reset</button>
            </div>
        </div>
    );
};

export default CurrentFilters;
