import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { LandingPage } from "./pages/landingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Settings } from "./pages/Settings";
import { InvoiceBuilder } from "./pages/invoice/InvoiceBuilder";
import { InvoicePreviewPage } from "./pages/invoice/InvoicePreviewPage";


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

      <Route path="/invoice/new" element={
        <ProtectedRoute>
            <InvoiceBuilder />
        </ProtectedRoute>
      } />

      <Route path="/invoice/preview" element={
        <ProtectedRoute>
          <InvoicePreviewPage />
        </ProtectedRoute>
      } />

    </Routes>

  )
}

export default App