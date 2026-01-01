import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from 'react-hot-toast';

function App() {

    const { isSigndIn } = useUser();

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />  
                <Route path='/problems' element={isSigndIn ? <ProblemsPage /> : <Navigate to={"/"} />} /> 
            </Routes>
            <Toaster />
        </>
    )
}

export default App
