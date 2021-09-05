//import { gsap } from 'gsap'
import '../src/sass/app.scss'
import Header from './header/Header';
import Main from './main/Main'
function App() {  

  /*const tl = gsap.timeline({paused: true})
  tl.to("Header", {opacity: 1, x: 100, duration: 2})

  window.addEventListener("load", function() {
    tl.play()
  })
 */
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
