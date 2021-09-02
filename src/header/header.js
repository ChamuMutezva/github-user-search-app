import { useState , useRef , useEffect} from 'react'
import { gsap } from 'gsap'
import Moon from '../assets/icon-moon.svg'
import Sun from '../assets/icon-sun.svg'
const Header = () => {

    const [theme, setTheme] = useState(true)

    const headerTitle = useRef()

    const handleClick = () => {
        const modeState = document.querySelector(".mode__state")
        const modeImg = document.querySelector(".mode__img")
        const body = document.querySelector("body")
        setTheme(!theme)
        console.log(theme)
        if (theme) {
            body.classList.add("theme-dark")
            modeState.innerHTML = "Light"
            modeImg.src = `${Sun}`
        } else {
            body.classList.remove("theme-dark")
            modeState.innerHTML = "Dark"
            modeImg.src = `${Moon}`

        }
    }

    useEffect(() => {
        gsap.from(headerTitle.current, { opacity: 0, ease: "power3.out", duration: 2})
    })

    return (
        <header className="header">
            <h1 className="app__title" ref={headerTitle}>devfinder</h1>

            <button className="theme--control"
                aria-label="theme toggle light and dark mode"
                onClick={handleClick}>

                <div className="light__mode"
                    aria-live="polite">

                    <span className="mode__state">Dark</span>
                    <img className="mode__img"
                        src={Moon}
                        alt="" />

                </div>
            </button>

        </header>
    )
}
export default Header