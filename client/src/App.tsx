import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { LandingPage } from "./pages/landingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Settings } from "./pages/Settings";


function App() {
  return (
      <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
        } />
        <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
    </Routes>

  )
}

export default App