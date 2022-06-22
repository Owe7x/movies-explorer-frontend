import './SearchForm.css'

function SearchForm() {
    return (
        <>
        <section className='search'>
            <div className='search__container'>
                <form className='search__form' name='search-form'>
                    <div className='search__box'>
                        <input className='search__input' type='text' placeholder='Фильм' name='name' minLength='1' maxLength='50' />
                        <button className='search__button' type='submit'></button>    
                    </div>
                </form> 
                <div className="checkbox">
                    <label className='checkbox__label' >
                    Короткометражки
                    </label>
                    <input  checked className='checkbox__input'  type='checkbox' />
                    <span class="checkbox-switch"></span>
                </div> 
            </div>
            <div className='search__line'></div>
        </section>
        </>
    )
}

export default SearchForm