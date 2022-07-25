import './Footer.css'

function Footer() {
    return (
        <>
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__title">
                Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
                <div className="footer__blocks">
                    <p className="footer__copy">
                        © 2020
                    </p>
                    <div className="footer__social">
                        <a href="https://practicum.yandex.ru/" className="footer__social-link">Яндекс.Практикум</a>
                        <a href="https://github.com/Owe7x" className="footer__social-link">Github</a>
                        <a href="https://www.facebook.com/" className="footer__social-link">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer 