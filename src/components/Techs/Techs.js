import './Techs.css'

function Tech() {
    return (
        <>
        <section className="tech" id='stack'>
            <div className="tech__container">
                <h2 className="tech__title">
                    Технологии
                </h2>
                <p className="tech__subtitle">
                    7 технологий
                </p>
                <p className="tech__text">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className="tech__blocks">
                    <li className="tech__block">HTML</li>
                    <li className="tech__block">CSS</li>
                    <li className="tech__block">JS</li>
                    <li className="tech__block">React</li>
                    <li className="tech__block">Git</li>
                    <li className="tech__block">Express.js</li>
                    <li className="tech__block">mongoDB</li>
                </ul>
            </div>
        </section>
        </>
    )
}

export default Tech 