import './AboutMe.css'
import Avatar from '../../images/avatar.jpg'

function AboutMe() {
    return (
        <>
        <section className="me" id='student'>
            <div className="me__container">
            <h2 className="me__title">
                Студент
            </h2>
            <div className="me__blocks">
                <div className="me__info">
                    <p className="me__info-name">
                    Виталий
                    </p>
                    <p className="me__info-position">
                    Фронтенд-разработчик, 30 лет
                    </p>
                    <p className="me__info-about">
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <ul className="me__info-social">
                        <li className="me__info-li"><a href="https://www.facebook.com/" className="me__info-link">Facebook</a></li>
                        <li className="me__info-li"><a href="https://github.com/Owe7x" className="me__info-link">GitHub</a></li>
                    </ul>
                </div>
                <div className="me__avatar">
                    <img src={Avatar} alt="Я" className="me__picture" />
                </div>
            </div>

            </div>
        </section>
        </>
    )
}

export default AboutMe