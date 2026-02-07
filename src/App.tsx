import Home from "./pages/Home"
import {Toaster} from 'react-hot-toast'

import "./styles/app.css"
import "./styles/home.scss"
// import Register from "./components/auth/Register"

const App = () => {
  return (
    <div>
      <Toaster
      />
     {/* <Register/> */}
     <Home/>
    </div>
  )
}

export default App
