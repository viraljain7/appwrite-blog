
import { useState, useEffect } from 'react';
import './App.css'
import { Footer, Header } from './components'
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => setLoading(false));
  }, []);


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-300 ">
      <div className="w-full block">
        <Header />

        <main>

          TODO:
          {/*   <Outlet /> */}

        </main>

        <Footer />
      </div>
    </div>
  ) : (<>Loading</>);
}

export default App
