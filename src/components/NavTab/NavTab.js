import './NavTab.css'

function NavTab() {
    return (
        <>
            <section className="navtab">
                <ul className="navtab__ul">
                    <li className="navtab__li"><a href="#about" className="navtab__element">О проекте</a></li>
                    <li className="navtab__li"><a href="#stack" className="navtab__element">Технологии</a></li>
                    <li className="navtab__li"><a href="#student" className="navtab__element">Студент</a></li>
                </ul>
            </section>
        </>
    ) 
}

export default NavTab