import { useState, useEffect } from 'react'
import './SearchForm.css'



function SearchForm({findMovies, changeCheckBox, isChangeBox, findSaveMovies, isSave}) {

    const [valueInput , setValueInput ] = useState('')
    const [valueInputSave , setValueInputSave ] = useState('')
    const [validForm , setValidForm ] = useState(true)

    function handleSubmit(e) {
        e.preventDefault()
        if(valueInput) {
            findMovies(valueInput)
            setValidForm(true);
        } else {
            setValidForm(false);
        }
        localStorage.setItem('textForm', valueInput)
    }
    function changeInput(e) {
        setValueInput(e.target.value)
        setValueInputSave(e.target.value)
        if(e.target.value) {
            setValidForm(true);
        } else {
            setValidForm(false);
        }
    }
    function handleSaveSubmit(e) {
        e.preventDefault()
        if(valueInput) {
            findSaveMovies(valueInputSave)
            setValidForm(true);
        } else {
            setValidForm(false);
        }
        localStorage.setItem('textFormSave', valueInputSave)
    }
    function handleChangeFilter() {
        changeCheckBox();
    }
    useEffect(() => {
        localStorage.textForm && setValueInput(localStorage.getItem('textForm'))
        localStorage.textForm && setValueInputSave(localStorage.getItem('textFormSave'))
    
    }, [])
    useEffect(() => {
        
        localStorage.setItem('isChangeBox', JSON.stringify(isChangeBox) )
        
    }, [isChangeBox])

    return (
        <>
        <section className='search'>
            <div className='search__container'>
                <form className='search__form' name='search-form' onSubmit={isSave ? handleSaveSubmit : handleSubmit}>
                    <div className='search__box'>
                        <input onChange={changeInput} value={isSave ? valueInputSave : valueInput} className='search__input' type='text' placeholder='Фильм' name='name' minLength='1' maxLength='50' />

                        <button className='search__button' disabled={!validForm} type='submit'></button>    
                    </div>
                    <p className="search__form-error">{validForm ? "" : "Нужно ввести ключевое слово"}</p>
                </form> 
                <div className="checkbox-form">
                <label className='checkbox__label' >
                    Короткометражки
                    </label>
                    <button onClick={handleChangeFilter} type="button" className={isChangeBox ? "filter-checkbox__button filter-checkbox__button_active" : "filter-checkbox__button filter-checkbox__button_inactive"}></button>

                </div> 
            </div>
            
            <div className='search__line'></div>
        </section>
        </>
    )
}

export default SearchForm