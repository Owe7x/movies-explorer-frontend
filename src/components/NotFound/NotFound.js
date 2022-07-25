import React from 'react'
import { Link} from 'react-router-dom'
import { useHistory  } from "react-router";
import './NotFound.css'

function NotFound () {
    const navigate = useHistory();
    
    function goBack() {
        navigate.goBack();
    }

    return (
        <>
        <section className="not">
            <div className="not__container">
            <h1 className="not__title">
                404
            </h1>
            <p className="not__text">
                Страница не найдена
            </p>
            <Link className='not__link' to='' onClick={goBack}>Назад</Link>
            </div>
        </section>
        </>
    )
}

export default NotFound