import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './Routes/Signup'
import  Signin  from './Routes/Signin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
