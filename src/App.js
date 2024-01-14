import './App.css';
import { useState, useEffect } from 'react';
import Details from './Details';
import Login from './Login';
import Preview from './Preview'
import { supabase } from './supabase';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Share from './Share';
import WithNav from './WithNav';
import WithoutNav from './WithoutNav';


function App() {


  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

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
          <Route
            element={
              !session ||
              window.location.pathname.includes("/view") ||
              window.location.pathname.includes("/share") ||
              window.location.pathname.includes("/login") ? (
                <WithoutNav />
              ) : (

                <WithNav />
              )
            }
          >
            {session && (
              <>
                <Route path="/" element={<Details />} />
                <Route path="/view" element={<Preview />} />
              </>
            )}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
            <Route path="/share/:id" element={<Share />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


 