import './AboutProject.css'

function AboutProject() {
    return (
        <>
            <section className="project">
                <div className="project__container">
                    <h2 className="project__title">
                        О проекте
                    </h2>
                    <div className="project__blocks">
                        <div className="project__block">
                            <p className="project__subtitle">
                                Дипломный проект включал 5 этапов
                            </p>
                            <p className="project__text">
                                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                            </p>
                        </div>
                        <div className="project__block">
                            <p className="project__subtitle">
                                На выполнение диплома ушло 5 недель
                            </p>
                            <p className="project__text">
                                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                            </p>
                        </div>
                    </div>
                    <div className="project__weeks">
                        <div className="project__backend">
                            <div className="project__backend-week">
                                1 неделя
                            </div>
                            <p className="project__week-title">
                                Back-end
                            </p>
                        </div>
                        <div className="project__frontend">
                            <div className="project__frontend-week">
                                4 недели
                            </div>
                            <p className="project__week-title">
                                Front-end
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutProject