const FilterItem = (props) => {
    return (
        <li onClick={() => props.onSelect(props.filter.label)} className="form-check">
            <input className="form-check-input" type="checkbox" checked={props.filter.active} readOnly />
            <label className="form-check-label">{props.filter.label} ({props.filter.nbArticles})</label>
        </li>
    );
};

export default FilterItem;
