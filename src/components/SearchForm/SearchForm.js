import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './SearchForm.css'



function SearchForm({findMovies, changeCheckBox, isChangeBox, isChangeBoxSave,  findSaveMovies, isSave}) {

    const [valueInput , setValueInput ] = useState('')
    const [valueInputSave , setValueInputSave ] = useState('')
    const [validForm , setValidForm ] = useState(true)
    const pathname = useLocation();

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
        if(valueInputSave) {
            findSaveMovies(valueInputSave)
            setValidForm(true);
        } else {
            setValidForm(false);

        }
    }
    function handleChangeFilter() {
        changeCheckBox();
    }
    useEffect((e) => {

        localStorage.textForm && setValueInput(localStorage.getItem('textForm'))
        findSaveMovies(valueInputSave)
    }, [])

    useEffect(() => {
        
        localStorage.setItem('isChangeBox', JSON.stringify(isChangeBox) )
        localStorage.setItem('isChangeBoxSave', JSON.stringify(isChangeBoxSave) )

    }, [isChangeBox, isChangeBoxSave])

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
                    {
                        pathname.pathname === "/movies" ? 
                        <button onClick={handleChangeFilter} type="button" className={isChangeBox ? "filter-checkbox__button filter-checkbox__button_active" : "filter-checkbox__button filter-checkbox__button_inactive"}></button>
                        :
                        <button onClick={handleChangeFilter} type="button" className={isChangeBoxSave ? "filter-checkbox__button filter-checkbox__button_active" : "filter-checkbox__button filter-checkbox__button_inactive"}></button>
                    }
                    

                </div> 
            </div>
            
            <div className='search__line'></div>
        </section>
        </>
    )
}

export default SearchForm