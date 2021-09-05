import '../src/sass/app.scss'
import Header from './header/header';
import Main from './main/main'
function App() {  

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
