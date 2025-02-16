import { Dashboard } from "./pages/Dashboard"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    // <Signup/>
    // <Login/>
    // <Dashboard/>
  )
  
}

export default App
