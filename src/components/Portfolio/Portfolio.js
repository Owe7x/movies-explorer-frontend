import './Portfolio.css'

function Portfolio () {
    return (
        <>
            <div className="portfolio">
                <div className="portfolio__container">
                <p className="portfolio__title">
                    Портфолио
                </p>
                <ul className="portfolio__blocks">
                    <li className="portfolio__block">
                        <p className="portfolio__name">
                        Статичный сайт
                        </p>
                        <a href="https://github.com/Owe7x" className="portfolio__link">↗</a>
                    </li>
                    <li className="portfolio__block">
                        <p className="portfolio__name">
                        Адаптивный сайт
                        </p>
                        <a href="https://github.com/Owe7x" className="portfolio__link">↗</a>
                    </li>
                    <li className="portfolio__block">
                        <p className="portfolio__name">
                        Одностраничное приложение
                        </p>
                        <a href="https://github.com/Owe7x" className="portfolio__link">↗</a>
                    </li>
                </ul>
                </div>

            </div>
        </>
    )
}

export default Portfolio