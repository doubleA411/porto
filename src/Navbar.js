import React from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase';



function Navbar() {

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error occured: ", error);
    }
  }

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className=" text-grey flex justify-between item-center px-10 pt-10">
      <p className=" text-3xl">porto</p>
      <div className=" flex gap-4 items-center">
        <Link to={'/details'}>
          <p className=' hover:underline'> Details </p>
        </Link>
        <div className=" flex gap-4 items-center" onClick={() => signOut()}>
          <p className=" flex gap-1 items-center hover:underline cursor-pointer">
            Sign out{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 transform -rotate-90 "
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              ></path>
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar