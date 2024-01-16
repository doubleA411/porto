import React from 'react'
import {motion} from 'framer-motion';




function View( { data }) {

  // const [userId, setUserID] = useState({});
  // const [data ,setData] = useState({})

  // const getUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   setUserID(user);
  // };

   



  // const getData = async() => {
  //   try {
  //      if(userId && userId.id) {
  //        const { data, error } = await supabase
  //          .from("userData")
  //          .select()
  //          .eq("uid", userId.id);
  //           if (error) {
  //             console.log(error.message);
  //           } else {
  //             console.log(data);
  //             setData(data[0]);
  //           } 
  //      }
       
        
  //   } catch (error) {
  //       console.error(error.message)
  //   }
  // }

  //  useEffect(() => {
  //    const fetchData = async () => {
  //      await getUser();
  //      if(Object.keys(data).length === 0) {
  //        await getData();
  //      }
  //    };

  //    fetchData();
  //  }, [userId, data]); 
 



  return (
    <div className="px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-20 max-w-[700px] mx-auto">
      {Object.keys(data).length === 0 && (
        <div className=" flex flex-col">
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
        </div>
      )}
      {Object.keys(data).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" flex flex-col gap-16 md:gap-24 "
        >
          <div className=" flex animate-in flex-col gap-8">
            <div>
              <h1 className=" text-3xl font-bold tracking-tight text-primary">
                {data.name}
              </h1>
              <p className=" text-grey">{data.oneliner}</p>
            </div>

            <div className="flex animate-in flex-col gap-6 text-secondary md:flex-row md:items-center">
              <img
                src={data.image}
                alt=""
                className=" bg-darker rounded-full w-[85px] h-[85px] p-1"
              />
              {/* <ul className="space-y-2 animated-list text-grey">
                <li>
                  <a
                    href={
                      data.socialmedia &&
                      `https://github.com/${data.socialmedia.github}`
                    }
                    className="flex gap-3 items-center no-underline"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 496 512"
                      className="text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                    </svg>
                    <span className="inline-flex opacity-100 translate-y-0 duration-75 ease-in-out">
                      00
                    </span>
                    <span> Repositories</span>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      data.socialmedia &&
                      `https://github.com/${data.socialmedia.github}`
                    }
                    className="flex gap-3 items-center no-underline"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 496 512"
                      className="text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                    </svg>
                    <span className="inline-flex opacity-100 translate-y-0 duration-75 ease-in-out">
                      00
                    </span>
                    <span> Repositories</span>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      data.socialmedia &&
                      `https://github.com/${data.socialmedia.github}`
                    }
                    className="flex gap-3 items-center no-underline"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 496 512"
                      className="text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                    </svg>
                    <span className="inline-flex opacity-100 translate-y-0 duration-75 ease-in-out">
                      00
                    </span>
                    <span>Repositories</span>
                  </a>
                </li>
              </ul> */}
            </div>

            <p className="max-w-lg animate-in text-primary">{data.aboutSm}</p>
            <ul className="animated-list flex animate-in flex-col gap-2  md:flex-row md:gap-6 text-grey ">
              <li>
                <a
                  href={`mailto:${data.contact}`}
                  className="underline-offset-4 flex items-center gap-2 no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Email me</span>
                </a>
              </li>
              {/* <li>
                {" "}
                <a
                  href=""
                  className="underline-offset-4 flex items-center gap-2 no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>More ways to connect </span>
                </a>
              </li> */}
            </ul>
          </div>

          <div className="flex flex-col gap-16 animate-in md:gap-24">
            <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse">
              <h2 className="md:w-32 text-grey shrink-0">About</h2>
              <p className=" text-primary">{data.aboutLg}</p>
            </section>

            <section className="flex flex-col md:flex-row gap-2 md:gap-9 col-reverse">
              <h2 className="md:w-32 text-grey shrink-0">Connect</h2>
              <div className="flex flex-col w-full gap-8">
                <ul className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2 animated-list">
                  <li className="transition-opacity col-span-1">
                    <a
                      href="mailto:aakahsuresh62@gmail.com"
                      className="underline-offset-4 transition-opacity no-underline w-full border rounded-lg p-4 border-darker inline-grid"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <span className=" text-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-primary"
                          >
                            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"></path>
                            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"></path>
                          </svg>
                        </span>
                        <p className=" text-md">Email</p>
                        <svg
                          className="w-5 h-5 ml-auto text-grey"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </li>
                  <li className="transition-opacity col-span-1">
                    <a
                      href={
                        data.socialmedia &&
                        `https://github.com/${data.socialmedia.github}`
                      }
                      className="underline-offset-4 transition-opacity no-underline w-full border rounded-lg p-4 border-darker inline-grid"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <span className=" text-xl">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 496 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                          </svg>
                        </span>
                        <p className=" text-md">Github</p>
                        <svg
                          className="w-5 h-5 ml-auto text-grey"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </li>
                  <li className="transition-opacity col-span-1">
                    <a
                      href={
                        data.socialmedia &&
                        `https://instagram.com/${data.socialmedia.insta}`
                      }
                      className="underline-offset-4 transition-opacity no-underline w-full border rounded-lg p-4 border-darker inline-grid"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <span className=" text-xl">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                          </svg>
                        </span>
                        <p className=" text-md">Instagram</p>
                        <svg
                          className="w-5 h-5 ml-auto text-grey"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </li>
                  <li className="transition-opacity col-span-1">
                    <a
                      href={
                        data.socialmedia &&
                        `https://www.linkedin.com/in/${data.socialmedia.linkedin}`
                      }
                      className="underline-offset-4 transition-opacity no-underline w-full border-[1px] rounded-lg p-4 border-darker inline-grid"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <span className=" text-xl">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                          </svg>
                        </span>
                        <p className=" text-md">LinkedIn</p>
                        <svg
                          className="w-5 h-5 ml-auto text-grey"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse">
              <h2 className="md:w-32 text-grey shrink-0">Projects</h2>
              <ul className="flex flex-col w-full gap-8 animated-list">
                {data.projects &&
                  data.projects.map((project) => (
                    <li className="" key={project.title}>
                      <a
                        className="underline-offset-4 flex justify-between w-full px-3 py-2 -mx-3 -my-2 no-underline"
                        href={project.link}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-px">
                            <p className=" text-primary">{project.title}</p>
                            <p className=" text-grey">{project.desc}</p>
                          </div>
                        </div>
                        <p className=" text-grey">{project.year}</p>
                      </a>
                    </li>
                  ))}
              </ul>
            </section>

            <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse">
              <h2 className="md:w-32 text-grey shrink-0">Work / Intern</h2>
              <ul className="flex flex-col w-full gap-8 animated-list">
                {data.work &&
                  data.work.map((e) => (
                    <li className="" key={e.company}>
                      <a
                        className="underline-offset-4 flex justify-between w-full px-3 py-2 -mx-3 -my-2 no-underline"
                        href={e.link}
                      >
                        <div className="flex items-center gap-4">
                          <div className=" flex items-center justify-center w-[48px] h-[48px] bg-darker rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="16"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#ffffff"
                                d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-px">
                            <p className=" text-primary">{e.role}</p>
                            <p className=" text-grey">{e.company}</p>
                          </div>
                        </div>
                        <p className=" text-grey">
                          {e.from} - {e.to}
                        </p>
                      </a>
                    </li>
                  ))}
              </ul>
            </section>
          </div>

          <hr className=" text-grey bg-grey" />
          <p className=" text-grey">
            Created by Minimal Mind | Inspired from Brain Ruiz
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default View



