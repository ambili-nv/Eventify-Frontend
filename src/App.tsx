import './App.css'
import { Toaster } from 'react-hot-toast';
import { MainRouter } from './routes/router'
import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (
    <>

    <Router>
    <Toaster/>
    <MainRouter/>
    </Router>
    </>
  )
}

export default App
