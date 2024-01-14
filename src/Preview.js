import React , {useState , useEffect} from 'react'
import View from './View'
import { supabase } from './supabase';
import {useNavigate} from 'react-router-dom'

function Preview() {

  const navigate = useNavigate()

  const [userId, setUserID] = useState({});
  const [data, setData] = useState({});

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserID(user);
  };

  const getData = async () => {
    try {
      if (userId && userId.id) {
        const { data, error } = await supabase
          .from("userData")
          .select()
          .eq("uid", userId.id);
        if (error) {
          console.log(error.message);
        } else {
          console.log(data);
          setData(data[0]);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      if (Object.keys(data).length === 0) {
        await getData();
      }
    };

    fetchData();
  }, [userId, data]); 
  return (
    <div className="relative ">
      <div className="fixed bottom-0 m-10 right-0 text-grey cursor-pointer hover:underline" onClick={() => navigate(`/share/${userId.id}`)}>
        <div className=" flex gap-1 items-center">
          Deploy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 "
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <View data={data} />
    </div>
  );
}

export default Preview