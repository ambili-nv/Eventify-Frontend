import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast';
import { MainRouter } from './routes/router'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Navbar';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Router>
      {/* <Header/> */}
    <Toaster/>
    <MainRouter/>
    </Router>
    </>
  )
}

export default App
