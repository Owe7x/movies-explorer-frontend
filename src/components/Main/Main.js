import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject'
import Tech from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'

import './Main.css'


function Main() {
    return (
        <>
            <Promo></Promo>
            <NavTab></NavTab>
            <AboutProject></AboutProject>
            <Tech></Tech>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>

        </>
    )
}

export default Main