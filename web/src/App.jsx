import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './components/auth/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import PageNotFound from './components/pageNotFound/PageNotFound'
import Protected from './components/auth/protected/Protected'
import './App.scss'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login onSignIn={() => setLoggedIn(true)} />} />

          <Route element={<Protected isSignedIn={loggedIn} />}>
            <Route path="/library/*" element={<Dashboard onSignOut={() => setLoggedIn(false)} />} />
          </Route>

          <Route path="/" element={<Navigate to="/library" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
