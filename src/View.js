import React from 'react'
import { supabase } from './supabase'
import { useEffect, useState } from 'react';




function View() {



  const [userId, setUserID] = useState({});
  const [data ,setData] = useState({})

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserID(user);
  };

  useEffect(() => {
    getUser();
  }, []);



  const getData = async() => {
    try {
        const { data , error } = await supabase.from("userData").select().eq("uid",userId.id)

        if(error) {
            console.log(error.message)
        } else {
            console.log(data)
            setData(data[0]);

        }
        
    } catch (error) {
        console.error(error.message)
    }
  }

  useEffect(() => {
    getData();
  }, [userId])



  return (
    <div>
        { data && 
            <div className=' flex flex-col text-white'>
                <p>{data.name}</p>
                <p>{data.contact}</p>
                <p>{data.oneliner}</p>
            </div>
        }

    </div>
  )
}

export default View