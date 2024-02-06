import {useEffect, useState} from 'react'
import porto from './assets/porto.mov'
import { useNavigate } from 'react-router-dom'
import Bar from './Bar';
import { supabase } from './supabase';
import {motion} from 'framer-motion'

function Home() {

  const [ session , setSession ] = useState(null)

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  }

  useEffect(() => {
    fetchSession();
  },[session])

    const navigate = useNavigate();
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" flex flex-col items-center gap-8 p-10 text-primary"
    >
      {session && <Bar />}


      <div className=" flex flex-wrap justify-center gap-4 ">
        <div className=" bg-darker w-fit h-fit p-5 lg:p-10 rounded-xl ">
          <p className=" font-light w-[200px] lg:text-[48px] lg:w-[330px] leading-tight">
            build your portfolio within few minutes
          </p>
        </div>
        <div className=" bg-darker w-fit h-fit p-5 lg:p-10 rounded-xl">
          <p className=" font-light w-[200px] lg:text-[48px] lg:w-[700px] leading-tight  ">
            fill the details and preview the site, if you wanna update go back
            and make changes; deploy it finally
          </p>
        </div>

        <div>
          <video
            src={porto}
            autoPlay
            loop
            controls
            width={1210}
            className=" rounded-2xl border-4 border-darker"
          ></video>
        </div>
      </div>
    </motion.div>
  );
}

export default Home