import React, { useEffect, useState } from 'react'
import {useParams , Link} from 'react-router-dom'
import { supabase } from './supabase';
import {motion} from 'framer-motion'
function Deploy() {

  const {id} = useParams();

  const [deploy, setDeploy] = useState("");
  const [ porto , setData] = useState({})
  const [ msg , setMsg ] = useState("")
  const [ loading, setLoading ] = useState(false);
  const [ deployed , setDeployed ] = useState(false)
 
    const getData = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("userData")
            .select()
            .eq("uid", id);

          if (error) {
            console.error("Error fetching data:", error);
          } else if (data && data.length > 0) {
            console.log(data[0]);
            setData(data[0]);
          } else {
            console.log("No data found for the user");
            // You might want to handle this case accordingly
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
       const fetchData = async () => {

         if (Object.keys(porto).length === 0) {
           await getData();
         }
       };

       fetchData();
    },[porto])

  const handleDeploy = (e) => {
    setDeploy(e.target.value)
  }

  const addDeploy = async() => {
    const { data, error } = await supabase.from("deploy_table").insert([
      {
        name: porto.name,
        image: porto.image,
        contact: porto.contact,
        oneliner: porto.oneliner,
        aboutSm: porto.aboutSm,
        aboutLg: porto.aboutLg,
        socialmedia: porto.socialmedia,
        deployName: deploy,
        projects: porto.projects,
        work: porto.work,
      },
    ]);

    if(error) {
      console.log(error)
    } else {
      console.log("Success", data)
    }

  } 

    function clearErrorAfterDelay() {
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }

    function clearLoadingAfterDelay () {
      setTimeout(() => {
        setLoading(false);
      },1000)
    }

    useEffect(() => {
      if (msg.length > 0) {
        clearErrorAfterDelay();
      }
    }, [msg]);

    useEffect(() => {
      if(loading === true) {
        clearLoadingAfterDelay();
      }
    },[loading])

  return (
    <div className=" px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-20 max-w-[700px] mx-auto text-primary ">
      {loading === true && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center m-auto">
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 1, // Animation duration (in seconds)
              repeat: Infinity, // Repeats the animation indefinitely
              repeatDelay: 0, // Delay before repeating (if needed)
              ease: "linear", // Easing function for the animation
            }}
            style={{
              width: 50, // Example width
              height: 50,
              // Example height
              backgroundColor: "white", // Example background color
              margin: "auto",
            }}
          ></motion.div>
        </div>
      )}
      {deployed === true && (
        <div className=" flex flex-col gap-4 hover:underline">
          <p>Your porto. is successfully deployed</p>
          <Link to={`/share/${deploy}`}>
            <div className=" flex gap-2 items-center">
              <p>View</p>
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
          </Link>
        </div>
      )}
      {loading === false && deployed === false && (
        <div className=" flex flex-col gap-4 items-start">
          <p className=" text-3xl text-grey ">Deploy your porto.</p>
          <p>
            Enter a deploy name for your porto{" "}
            <span className=" text-grey">( eg. doublea, br-io, ak-47... )</span>
          </p>
          <div className=" flex flex-col gap-8 items-start">
            <input
              type="text"
              name=""
              id=""
              value={deploy}
              className=" outline-none rounded-md p-2 text-dark w-fit"
              onChange={(e) => handleDeploy(e)}
            />
            {msg && (
              <p className="transition ease-out duration-300 text-red-500">
                {msg}
              </p>
            )}
            {
              <button
                className=" bg-darker text-primary px-4 py-2 rounded-md"
                onClick={() => {
                  if (deploy.length === 0) {
                    setMsg("Deploy Name is required");
                  } else {
                    setLoading(true);
                    setTimeout(3000);
                    addDeploy().then(() => setDeployed(true));
                  }
                }}
              >
                Deploy
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Deploy