import './App.css';
import { useState, useEffect } from 'react';
import Details from './Details';
import Login from './Login';
import View from './View'
import { supabase } from './supabase';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {


  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);



  return (
    <Router>
        <div className=" min-h-screen bg-dark">
          <Routes>
            {
              session && (
                <>
                    <Route path='/' element={<Details />} />
                    <Route path='/view' element ={<View />} />
                </>
              )
            }
            <Route path='/login' element ={<Login />} />
            <Route path='*' element={<Login />} />
          </Routes>
        </div>
      </Router>
      
     
  );
}

export default App;
