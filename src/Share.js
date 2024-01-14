import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import { supabase } from './supabase';
import View from './View';

function Share() {

    const [porto , setPorto ] = useState({})

    const { id } = useParams();

    const getData = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("userData")
            .select()
            .eq("uid", id);
          if (error) {
            console.log(error.message);
          } else {
            console.log(data);
            setPorto(data[0]);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    useEffect(() => {
        const fetchData = async() => {
            if(Object.keys(porto).length === 0) {
                await getData();
            }
        };


        fetchData();
    }, [porto])



  return (
    <div>
        <View data={porto} />
    </div>
  )
}

export default Share