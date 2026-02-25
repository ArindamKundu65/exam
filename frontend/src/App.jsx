import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotePage from "./pages/NotePage"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/notepage" element={<NotePage />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
