import { gsap } from 'gsap'
import '../src/sass/app.scss'
import Header from './header/header';
import Main from './main/main'
function App() {  

  window.onload = () => {
    console.log("page has been loaded")
    gsap.from(".gsap__load",
     {
      opacity: 0,
       duration: 2,
       delay: 1, 
       stagger: 0.8,
       ease: "power4", 
    })
  }
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
