import "./App.scss"
import BackgroundTransition from "./BackgroundTransition";

function App() {

  return (
    <>
      <div className="instructions">
        <div className="line"></div>
        <span>Click anywhere for transition</span>
        <div className="line"></div>
      </div>
      <BackgroundTransition/>
    </>

  )
}

export default App
