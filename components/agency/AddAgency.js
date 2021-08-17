import React, {useRef, useState} from 'react';
import validator from 'validator';

const AddAgency = (props) => {

    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const gradeInputRef = useRef();
    const tagsInputRef = useRef();
    const imageInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        const name = validator.trim(nameInputRef.current.value);
        const description = validator.trim(descriptionInputRef.current.value);
        const grade = validator.trim(gradeInputRef.current.value);
        const tags = validator.trim(tagsInputRef.current.value);
        const image = validator.trim(imageInputRef.current.value);



        const agencyData = {
            name: name,
            description: description,
            grade: grade,
            tags: tags,
            image: image,
        }

        if (!checkInputs(agencyData)) {
            alert('Please check if all inputs are filled and if your image url is correct !');
            return;
        }

        props.onAddAgency(agencyData);
    }

    const checkInputs = (agencyData) => {
        return !validator.isEmpty(agencyData.name)
            && !validator.isEmpty(agencyData.description)
            && !validator.isEmpty(agencyData.grade)
            && !validator.isEmpty(agencyData.tags)
            && !validator.isEmpty(agencyData.image)
            && checkURL(agencyData.image)
    }

    const checkURL = (url) => {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    const updateSelectGrade = (e) => {
        setGrade(e.target.value);
    }

    const [grade, setGrade] = useState('Padawan');

    return (
        <form className='agency-details' onSubmit={submitHandler}>
            <div className='mb-3'>
                <label className='star-wars-font'>name :</label>
                <input type="text" className="form-control" ref={nameInputRef}/>
            </div>
            <div className='mb-3'>
                <label className='star-wars-font'>description :</label>
                <textarea className="form-control" rows="3" ref={descriptionInputRef}></textarea>
            </div>
            <div className='mb-3'>
                <label className='star-wars-font'>grade :</label>
                <select onChange={(e) => updateSelectGrade(e)} value={grade} className="form-select" ref={gradeInputRef}>
                    <option value="Padawan">Padawan</option>
                    <option value="Jedi">Jedi</option>
                    <option value="Master">Master</option>
                </select>
            </div>
            <div className='mb-3'>
                <label className='star-wars-font'>tags : </label>
                <input type="text" className="form-control" ref={tagsInputRef}/>
            </div>
            <div className='mb-3'>
                <label className='star-wars-font'>image : </label>
                <input type="text" className="form-control" ref={imageInputRef}/>
            </div>
            <button type="submit" className="btn btn-light star-wars-font">Submit</button>
        </form>
    );
};

export default AddAgency;
