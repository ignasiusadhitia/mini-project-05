import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, NotFound, StudentDetail, StudentForm } from "./pages";
import { StudentAppProvider } from "./context/StudentAppContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <StudentAppProvider>
      {/* To minimize risk of breaking changes, and future updates on react-router-dom v7 */}
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentForm />} />
            <Route path="/student/:id" element={<StudentDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </StudentAppProvider>
  );
}

export default App;
