import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Moon from '../assets/icon-moon.svg'
import Sun from '../assets/icon-sun.svg'

const Header = () => {
    const [theme, setTheme] = useState(false)
    const headerTitle = useRef()
  
    /* Get theme value from localStorage. */
    const getThemeFromLocalStorage = () => {
      return localStorage.getItem("globalTheme") === "true"
    }
  
    /* Post to localStorage user preferred theme. */
    const postThemeToLocalStorage = (newTheme) => {
      localStorage.setItem("globalTheme", newTheme)
    }
  
    /* Toggle body class based on current theme. */
    const themeControl = () => {
      theme
        ? document.body.classList.add("theme-dark")
        : document.body.classList.remove("theme-dark")
    }
  
    /* Click handler */
    const handleClick = () => {
      postThemeToLocalStorage(!theme)
      setTheme(!theme)
    }
  
    /* Trigger useEffect only on render */
    /* Set theme state to saved theme in local storage */
    useEffect(() => {
      setTheme(getThemeFromLocalStorage())
    }, [])
  
    /* Trigger useEffect only when theme state value change */
    /* Set class on body with current theme */
    useEffect(() => {
      themeControl()
    }, [theme])
  
    useEffect(() => {
      gsap.from(headerTitle.current, {
        opacity: 0,
        ease: "power3.out",
        duration: 2,
      })
    })
  
    return (
      <header className="header">
        <h1 className="app__title" ref={headerTitle}>
          devfinder
        </h1>
  
        <button
          className="theme--control"
          aria-label="theme toggle light and dark mode"
          onClick={handleClick}
        >
          <span className="light__mode" aria-live="polite">
            {/* If theme is true return "Dark" if not return "Light". */}
            <span className="mode__state">{theme ? "Dark" : "Light"}</span>
            {/* If theme is true return Moon element if not return Sun element. */}
            <img className="mode__img" src={theme ? Sun : Moon} alt="" />
          </span>
        </button>
      </header>
    )
  }
  
  export default Header