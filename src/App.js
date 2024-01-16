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
import Deploy from './Deploy';


function App() {


  const [session, setSession] = useState(null);

  const [ porto, setPorto ] = useState({});
  const [ user, setUser ] = useState({})
 
  const getData = async () => {
    try {
      if (user) {
        const { data, error } = await supabase
          .from("userData")
          .select()
          .eq("uid", user.id);

        if (error) {
          console.error("Error fetching data:", error);
        } else if (data && data.length > 0) {
          console.log(data[0]);
          setPorto(data[0]);
        } else {
          console.log("No data found for the user");
          // You might want to handle this case accordingly
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }; 

  const getUser = async () => {
     try {
       const {
         data: { user },
       } = await supabase.auth.getUser();
       setUser(user);
     } catch (error) {
       console.error("Error getting user:", error);
     }
   };


   useEffect(() => {
    const fetchData = async () => {
      await getUser();

      if (Object.keys(porto).length === 0) {
        await getData();
      }
    };

    fetchData();
   },[user,porto])


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
                <Route path="/" element={ Object.keys(porto).length < 0 ? <Preview /> : <Details />} />
                <Route path='/deploy/:id' element = { <Deploy />} />
                <Route path= '/details' element = {<Details />} />
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


 