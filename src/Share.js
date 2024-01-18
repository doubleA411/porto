import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import { supabase } from './supabase';
import View from './View';

function Share() {
  const [copied, setCopied] = useState(false);

  function clearCopiedAfterDelay() {
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        clearCopiedAfterDelay();
      });
  };

    const [porto , setPorto ] = useState({})

    const { id } = useParams();

    const getData = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("deploy_table")
            .select()
            .eq("deployName", id);
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
      <div
        className={`${
          copied ? "opacity-100" : "opacity-0"
        } flex ease-out duration-300 justify-between items-center text-white-100 absolute top-0 right-0 m-10  p-4 border-darker text-grey gap-4  border rounded-lg  `}
      >
        Link copied to clipboard
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
      <div
        className="fixed bottom-0 m-10 right-0 text-grey cursor-pointer hover:underline"
        onClick={() => {
          copyToClipboard();
        }}
      >
        <div className=" flex gap-1 items-center">
          Share your porto.
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
      <View data={porto} />
    </div>
  );
}

export default Share