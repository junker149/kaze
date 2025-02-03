import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './Routes/Signup'
import  Signin  from './Routes/Signin'
import  Blog  from './Routes/Blog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/blog' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
