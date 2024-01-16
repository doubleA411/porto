import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useNavigate, Link } from "react-router-dom";
import {motion} from 'framer-motion';

function Details() {
  const [ userId, setUserID ] = useState({});
  const [  viewData, setView ] = useState({});
  const [isLoading, setIsLoading] = useState();

  const [ showModal, setModal ] = useState(false);
  const [ modal , setModalType ] = useState("");

  const handleModalOpen = () => {
    setModal(true);
  }

  const handleModalClose = () => {
    setModal(false);
  }

  const navigate = useNavigate();


  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingWorkIndex, setEditingWorkIndex] = useState(null);

  const handleEditProject = (index) => {  
    setEditingProjectIndex(index);
  };

  const handleEditWork = (index) => {
    setEditingWorkIndex(index);
  };

  const handleSaveProject = () => {
    setEditingProjectIndex(null);
    console.log(projects)
    // Implement logic to save the edited project details
  };

  const handleSaveWork = () => {
    setEditingWorkIndex(null);
    // Implement logic to save the edited work details
  };



  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error occured: ", error);
    }
  }

  const handleSignOut = async () => {
    await signOut();
  };


  // const getUser = async() => {
  //   const { data :{ user }} = await supabase.auth.getUser();
  //   setUserID(user);
  //  }

   const getUser = async () => {
     try {
       const {
         data: { user },
       } = await supabase.auth.getUser();
       setUserID(user);
     } catch (error) {
       console.error("Error getting user:", error);
     }
   };


   
  //  const getData = async () => {
  //    if(userData) {
  //      const { data, error } = await supabase
  //      .from("userData")
  //      .select()
  //      .eq("uid", userId.id);
  //      if (error) {
  //        console.log(error);
  //       } else {
  //         console.log(data[0]);
  //         setView(data[0]);
  //       }
  //     } 
  //   }
    const getData = async () => {
      try {
        if (userId) {
          const { data, error } = await supabase
            .from("userData")
            .select()
            .eq("uid", userId.id);

          if (error) {
            console.error("Error fetching data:", error);
          } else if (data && data.length > 0) {
            console.log(data[0]);
            setView(data[0]);
          } else {
            console.log("No data found for the user");
            
            // You might want to handle this case accordingly
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    const fetchData = async () => {
      try {
        // Assuming getUser updates viewData directly
        await getUser();

        if (userId) {
          let retries = 0;
          const maxRetries = 2;

          const attemptFetchData = async () => {
            const { data, error } = await supabase
              .from("userData")
              .select()
              .eq("uid", userId);

            if (error) {
              console.error("Error fetching data:", error);
            } else if (data && data.length > 0) {
              console.log(data[0]);
              setView(data[0]);
            } else {
              console.log(
                `No data found for the user (attempt ${retries + 1})`
              );
              retries++;

              // Retry only up to maxRetries
              if (retries < maxRetries) {
                await attemptFetchData();
              } else {
                console.log(`Reached maximum retries (${maxRetries}).`);
                // You might want to handle this case accordingly
              }
            }
          };

          await attemptFetchData();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        await getUser();

      if(Object.keys(viewData).length === 0){
         await getData();
      } 

      };

      fetchData();
    }, [userId,viewData]); 


   

    
    
    // useEffect(() => {
    //   getUser();
    // },[])

    // useEffect(() => {
    //   getData();
    // },[userId])


    const [ userData, setUser ] = useState({
        name: "",
        email : "",
        logo : null,
        image : "",
    });

    const [ about, setAbout] = useState({
        oneliner : "",
        aboutSmall : "",
        aboutLg : "",
    })

    const [ social, setSocial ] = useState({
        insta : "",
        linkedin : "",
        github : "",
        twitter : ""
    }); 


    useEffect(() => {
      setUser({
        ...userData,
        name: Object.keys(viewData).length > 0 ? viewData.name : userData.name,
        email: Object.keys(viewData).length > 0 ? viewData.contact : userData.email,
        image: Object.keys(viewData).length > 0 ? viewData.image : userData.image,
      });

      setProjects(Object.keys(viewData).length > 0 ? viewData.projects : projects);
      setWorks(Object.keys(viewData).length > 0 ? viewData.work : works);
      setAbout({
        oneliner: Object.keys(viewData).length > 0 ? viewData.oneliner : about.oneliner,
        aboutLg: Object.keys(viewData).length > 0 ? viewData.aboutLg : about.aboutLg,
        aboutSmall: Object.keys(viewData).length > 0 ? viewData.aboutSm : about.aboutSmall,
      });

      setSocial({
        insta:
          Object.keys(viewData).length > 0 ? viewData.socialmedia.insta : social.insta,
        linkedin:
          Object.keys(viewData).length > 0 ? viewData.socialmedia.linkedin : social.linkedin,
        github:
          Object.keys(viewData).length > 0 ? viewData.socialmedia.github : social.github,
        twitter:
          Object.keys(viewData).length > 0 ? viewData.socialmedia.twitter : social.twitter,
      });
    },[viewData])

    const [ projects ,  setProjects ] = useState([]);
    const [ proj ,  setProj ] = useState({
      title : "",
      desc : "",
      link : "",
      year : ""
    });

    const [ works , setWorks ] = useState([]);
    const [ work , setWork ] = useState({
      role : "",
      company : "",
      from : "",
      to : "",
      link : ""
    });
    const handleUser = (e) => {
        
        setUser({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    const handleAbout = (e) => {
       
        setAbout({
          ...about,
          [e.target.name]: e.target.value,
        });

    }

    const handleSocial = (e) => {

        setSocial({
          ...social,
          [e.target.name]: e.target.value,
        });

    }

    const handleProj = (e) => {
      setProj({
        ...proj,
        [e.target.name] : e.target.value,
      });
    } 

    const handleWork = (e) => {
      setWork({
        ...work,
        [e.target.name] : e.target.value,
      });
    }


    const addData = async () => {
      const { data, error } = await supabase.from("userData").insert([
        {
          name: userData.name,
          image: userData.image,
          // logo: userData.logo,
          contact: userData.email,
          oneliner: about.oneliner,
          aboutSm: about.aboutSmall,
          aboutLg: about.aboutLg,
          socialmedia: social,
          uid: userId.id,
          projects: projects,
          work : works,
        },
      ]);
      if(error) {
        console.log(error.message);
      } else {
        console.log("Success ",data);
      }
    };

    const updateData = async () => {

      const updatedData = {};

      if(userData.name !== viewData.name) {
        updatedData.name = userData.name;
      }
      if (userData.email !== viewData.contact) {
        updatedData.contact = userData.email;
      }
      if (about.oneliner !== viewData.oneliner) {
        updatedData.oneliner = about.oneliner;
      }
      if (about.aboutSmall !== viewData.aboutSm) {
        updatedData.aboutSm = about.aboutSmall;
      }
      if (about.aboutLg !== viewData.aboutLg) {
        updatedData.aboutLg = about.aboutLg;
      }
        if (!updatedData.socialmedia) {
          updatedData.socialmedia = {
            ...viewData.socialmedia
          };
        }

      if (social.insta !== viewData.socialmedia.insta) {
        updatedData.socialmedia = {
          ...updatedData.socialmedia,
          insta : social.insta
        }
      }
      if (social.linkedin !== viewData.socialmedia.linkedin) {
        updatedData.socialmedia = {
          ...updatedData.socialmedia,
          linkedin: social.linkedin,
        };
      }
     if (social.github !== viewData.socialmedia.github) {
       updatedData.socialmedia = {
         ...updatedData.socialmedia,
         github: social.github,
       };
     }
    if (social.twitter !== viewData.socialmedia.twitter) {
      updatedData.socialmedia = {
        ...updatedData.socialmedia,
        twitter: social.twitter,
      };
    }
      if (projects !== viewData.projects) {
        updatedData.projects = projects
      }
      if (works !== viewData.work) {
        updatedData.work = works;
      }
      if( userData.image !== viewData.image) {
        updatedData.image = userData.image
      }
      

      console.log(updatedData, userId.id);

      

      if(userId) {
        const { data, error } = await supabase
          .from("userData")
          .update(updatedData)
          .eq("uid", userId.id)
          .select();

        if (error) {
          console.log(error);
        } else {
          console.log("Success", data);
        }
      }
    }

    const submitData = async () => {
      if(Object.keys(viewData).length > 0) {
       await updateData();
      } else {
       await addData();
      }
    }
   


    const uploadImage = async (name, file) => {
            console.log(file);
            const { data, error } = await supabase.storage
              .from("porto")
              .upload(`${userId.id}/avatar.png`, file);

            if (error) {
              console.log(error);
            } else {
              console.log(data);
            }
            const { data: imageData } = supabase.storage
              .from("porto")
              .getPublicUrl(`${userId.id}/avatar.png`);

            if (data) {
              setUser({
                ...userData,
                image: imageData.publicUrl,
              });
              console.log("userData updated");
            } else {
              console.log(error);
            }
          }
        





  return (
    <div
      className={` px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-20 max-w-[700px] mx-auto text-primary `}
    >
      {showModal && (
        <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto ">
          <div
            className=" fixed top-0 right-0 m-2 cursor-pointer"
            onClick={() => handleModalClose()}
          >
            x
          </div>
          {modal === "project" && (
            <div className="flex flex-col w-full gap-8 bg-darker rounded-lg p-10 shadow-md">
              <input
                type="text"
                name="title"
                value={proj.title}
                onChange={(e) => handleProj(e)}
                placeholder="title"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                type="text"
                name="desc"
                value={proj.desc}
                onChange={(e) => handleProj(e)}
                placeholder="description"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                type="text"
                name="link"
                value={proj.link}
                onChange={(e) => handleProj(e)}
                placeholder="project link"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                type="text"
                name="year"
                value={proj.year}
                onChange={(e) => handleProj(e)}
                placeholder="year"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />

              <button
                className=" text-white bg-dark px-3 py-2"
                onClick={() => {
                  if (projects.length < 5) {
                    setProjects((prev) => [...prev, proj]);
                  }

                  setProj({
                    title: "",
                    link: "",
                    year: "",
                    desc: "",
                  });

                  handleModalClose();
                }}
              >
                add
              </button>
            </div>
          )}

          {modal === "work" && (
            <div className="flex flex-col w-full gap-8 bg-darker rounded-lg p-10 shadow-md">
              <input
                type="text"
                name="role"
                value={work.role}
                onChange={(e) => handleWork(e)}
                placeholder="role"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                type="text"
                name="company"
                value={work.company}
                onChange={(e) => handleWork(e)}
                placeholder="company"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                type="text"
                name="from"
                value={work.from}
                onChange={(e) => handleWork(e)}
                placeholder="from"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                type="text"
                name="to"
                value={work.to}
                onChange={(e) => handleWork(e)}
                placeholder="to"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />

              <input
                type="text"
                name="link"
                value={work.link}
                onChange={(e) => handleWork(e)}
                placeholder="company url"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />

              <button
                className=" text-white bg-darker px-3 py-2"
                onClick={() => {
                  setWorks((prev) => [...prev, work]);
                  setWork({
                    role: "",
                    company: "",
                    from: "",
                    to: "",
                    link: "",
                  });
                  handleModalClose();
                }}
              >
                add
              </button>
            </div>
          )}
        </div>
      )}
      <div className=" flex items-center justify-between w-full mb-10">
        {viewData && viewData.name && (
          <div className=" fixed bottom-0 right-0 m-10">
            <Link to={"/view"}>
              <div className=" flex gap-1 items-center">
                <p
                  className=" flex gap-1 items-center text-grey cursor-pointer p-1 hover:underline"
                  // onClick={() => navigate("/view")}
                >
                  Preview
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 text-grey"
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
      </div>
      {/* {(!viewData || Object.keys(viewData).length === 0) && (
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
        />
      )} */}
      {
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <section className="flex flex-col md:flex-row gap-2 md:gap-9 col-reverse ">
            <h2 className="flex gap-1 md:w-32 text-grey shrink-0">
              User info.
              <div
                className={` ${
                  userData.email && userData.name
                    ? "bg-green-500"
                    : "bg-red-500"
                } w-3 h-3 rounded-full`}
              ></div>
            </h2>
            <div className="flex flex-col w-full gap-8">
              <input
                name="name"
                type="text"
                value={userData.name}
                onChange={(e) => handleUser(e)}
                placeholder="name"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                name="email"
                type="text"
                value={userData.email}
                onChange={(e) => handleUser(e)}
                placeholder="contact info. (email)"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              {Object.keys(viewData).length === 0 && (
                <input
                  name="image"
                  type="file"
                  onChange={(e) =>
                    // setUser({
                    //   ...userData,
                    //   image: e.target.files[0],
                    // })
                    uploadImage("avatar", e.target.files[0])
                  }
                  placeholder="image"
                  className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
              )}

              {viewData.image && (
                <div className=" flex items-center gap-4 cursor-pointer">
                  <img
                    className="bg-darker rounded-full w-32 h-32 group-hover:opacity-50"
                    src={viewData.image}
                    alt=""
                  />

                  {/* <input type="file" title='Update image' onChange={(e) => uploadImage("avatar",e.target.files[0])} /> */}
                </div>
              )}

              {/* <input
                name="logo"
                type="file"
                onChange={(e) =>
                  setUser({
                    ...userData,
                    logo: e.target.files[0],
                  })
                }
                placeholder="logo"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              /> */}
            </div>
          </section>
          <hr className=" my-10 bg-grey text-grey" />
          <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse ">
            <h2 className="flex gap-1 md:w-32 text-grey shrink-0">
              About
              <div
                className={` ${
                  about.aboutLg && about.aboutSmall && about.oneliner
                    ? "bg-green-500"
                    : "bg-red-500"
                } w-3 h-3 rounded-full`}
              ></div>
            </h2>

            <div className=" flex flex-col w-full gap-8">
              <input
                name="oneliner"
                type="text"
                value={about.oneliner}
                onChange={(e) => handleAbout(e)}
                placeholder="one liner"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <textarea
                name="aboutSmall"
                type="text"
                value={about.aboutSmall}
                onChange={(e) => handleAbout(e)}
                placeholder="about (short)"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <textarea
                name="aboutLg"
                type="text"
                value={about.aboutLg}
                onChange={(e) => handleAbout(e)}
                placeholder="about (large)"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
            </div>
          </section>

          <hr className=" my-10 bg-grey text-grey" />
          <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse ">
            <h2 className="flex gap-1 md:w-32 text-grey shrink-0">
              Social
              <div
                className={` ${
                  social.github &&
                  social.insta &&
                  social.linkedin &&
                  social.twitter
                    ? "bg-green-500"
                    : "bg-red-500"
                } w-3 h-3 rounded-full`}
              ></div>
            </h2>
            <div className="flex flex-col w-full gap-8">
              <input
                name="insta"
                type="text"
                value={social.insta}
                onChange={(e) => handleSocial(e)}
                placeholder="instagram"
                className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                name="linkedin"
                type="text"
                value={social.linkedin}
                onChange={(e) => handleSocial(e)}
                placeholder="linkedin"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                name="github"
                type="text"
                value={social.github}
                onChange={(e) => handleSocial(e)}
                placeholder="github"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
              <input
                name="twitter"
                type="text"
                value={social.twitter}
                onChange={(e) => handleSocial(e)}
                placeholder="twitter"
                className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
              />
            </div>
          </section>

          <hr className=" my-10 bg-grey text-grey" />

          <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse ">
            {Object.keys(viewData).length === 0 && (
              <h2 className=" flex gap-1 md:w-32 text-grey shrink-0">
                Projects {projects.length + 1}
              </h2>
            )}
            {viewData && viewData.projects && (
              <div className="flex flex-col justify-between gap-1 md:w-32 text-grey shrink-0">
                <h2>Projects</h2>
                {viewData && viewData.projects.length < 5 && (
                  <h2
                    className=" bg-darker w-fit px-4 py-1 cursor-pointer"
                    onClick={() => {
                      setModalType("project");
                      handleModalOpen();
                    }}
                  >
                    Add
                  </h2>
                )}
              </div>
            )}
            <div className=" flex flex-col gap-4">
              {viewData.projects &&
                viewData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="mb-4 text-primary flex flex-col gap-4 w-full"
                  >
                    {editingProjectIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={project.title}
                          className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                          onChange={(e) => {
                            // Update the project title in the state
                            // You might want to use a more sophisticated state management solution
                            const updatedProjects = [...viewData.projects];
                            updatedProjects[index].title = e.target.value;
                            setProjects(updatedProjects);
                            // Update the viewData with the modified projects
                            // setView({ ...viewData, projects: updatedProjects });
                          }}
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={project.desc}
                          className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                          onChange={(e) => {
                            // Update the project description in the state
                            const updatedProjects = [...viewData.projects];
                            updatedProjects[index].desc = e.target.value;
                            setProjects(updatedProjects);

                            // Update the viewData with the modified projects
                            // setView({ ...viewData, projects: updatedProjects });
                          }}
                          placeholder="Description"
                        />
                        <input
                          type="text"
                          value={project.link}
                          className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                          onChange={(e) => {
                            // Update the project description in the state
                            const updatedProjects = [...viewData.projects];
                            updatedProjects[index].link = e.target.value;
                            setProjects(updatedProjects);

                            // Update the viewData with the modified projects
                            // setView({ ...viewData, projects: updatedProjects });
                          }}
                          placeholder="Link"
                        />
                        <input
                          type="text"
                          value={project.year}
                          className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                          onChange={(e) => {
                            // Update the project description in the state
                            const updatedProjects = [...viewData.projects];
                            updatedProjects[index].year = e.target.value;
                            setProjects(updatedProjects);
                            // Update the viewData with the modified projects
                            // setView({ ...viewData, projects: updatedProjects });
                          }}
                          placeholder="Link"
                        />
                        {/* Add other editable fields as needed */}
                        <button
                          className="text-white bg-darker px-3 py-2"
                          onClick={handleSaveProject}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <p>Title: {project.title}</p>
                        <p>Description: {project.desc}</p>
                        {/* Display other non-editable fields */}
                        <button
                          className="text-white bg-darker px-3 py-2"
                          onClick={() => handleEditProject(index)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                ))}
            </div>
            {Object.keys(viewData).length === 0 && (
              <div className="flex flex-col w-full gap-8">
                <input
                  type="text"
                  name="title"
                  value={proj.title}
                  onChange={(e) => handleProj(e)}
                  placeholder="title"
                  className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
                <input
                  type="text"
                  name="desc"
                  value={proj.desc}
                  onChange={(e) => handleProj(e)}
                  placeholder="description"
                  className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
                <input
                  type="text"
                  name="link"
                  value={proj.link}
                  onChange={(e) => handleProj(e)}
                  placeholder="project link"
                  className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
                <input
                  type="text"
                  name="year"
                  value={proj.year}
                  onChange={(e) => handleProj(e)}
                  placeholder="year"
                  className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />

                <button
                  className=" text-white bg-darker px-3 py-2"
                  onClick={() => {
                    setProjects((prev) => [...prev, proj]);
                    setProj({
                      title: "",
                      link: "",
                      year: "",
                      desc: "",
                    });
                  }}
                >
                  add
                </button>
              </div>
            )}
          </section>
          <hr className=" my-10 bg-grey text-grey" />

          <section className=" flex flex-col md:flex-row gap-2 md:gap-9 col-reverse">
            <div className="flex flex-col justify-between gap-1 md:w-32 text-grey shrink-0">
              <h2>Work / Intern</h2>
              {viewData && (
                <h2
                  className=" bg-darker w-fit px-4 py-1"
                  onClick={() => {
                    setModalType("work");
                    handleModalOpen();
                  }}
                >
                  Add
                </h2>
              )}
            </div>

            {viewData.work &&
              viewData.work.map((experience, index) => (
                <div key={index} className="mb-4 flex flex-col gap-4">
                  {editingWorkIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={experience.role}
                        className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                        onChange={(e) => {
                          // Update the work role in the state
                          const updatedWork = [...viewData.work];
                          updatedWork[index].role = e.target.value;
                          setWorks(updatedWork);
                          // Update the viewData with the modified work experiences
                          // setView({ ...viewData, work: updatedWork });
                        }}
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={experience.company}
                        className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                        onChange={(e) => {
                          // Update the work company in the state
                          const updatedWork = [...viewData.work];
                          updatedWork[index].company = e.target.value;
                          setWorks(updatedWork);

                          // Update the viewData with the modified work experiences
                          // setView({ ...viewData, work: updatedWork });
                        }}
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={experience.from}
                        className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                        onChange={(e) => {
                          // Update the work company in the state
                          const updatedWork = [...viewData.work];
                          updatedWork[index].from = e.target.value;
                          setWorks(updatedWork);

                          // Update the viewData with the modified work experiences
                          // setView({ ...viewData, work: updatedWork });
                        }}
                        placeholder="From"
                      />
                      <input
                        type="text"
                        value={experience.to}
                        className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                        onChange={(e) => {
                          // Update the work company in the state
                          const updatedWork = [...viewData.work];
                          updatedWork[index].to = e.target.value;
                          setWorks(updatedWork);

                          // Update the viewData with the modified work experiences
                          // setView({ ...viewData, work: updatedWork });
                        }}
                        placeholder="To"
                      />
                      <input
                        type="text"
                        value={experience.link}
                        className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                        onChange={(e) => {
                          // Update the work company in the state
                          const updatedWork = [...viewData.work];
                          updatedWork[index].link = e.target.value;
                          setWorks(updatedWork);
                          // Update the viewData with the modified work experiences
                          // setView({ ...viewData, work: updatedWork });
                        }}
                        placeholder="Link"
                      />
                      {/* Add other editable fields as needed */}
                      <button
                        className="text-white bg-darker px-3 py-2"
                        onClick={handleSaveWork}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Role: {experience.role}</p>
                      <p>Company: {experience.company}</p>
                      {/* Display other non-editable fields */}
                      <button
                        className="text-white bg-darker px-3 py-2"
                        onClick={() => handleEditWork(index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            {Object.keys(viewData).length === 0 && (
              <div className=" flex flex-col gap-8 w-full">
                <input
                  type="text"
                  name="role"
                  value={work.role}
                  onChange={(e) => handleWork(e)}
                  placeholder="role"
                  className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
                <input
                  type="text"
                  name="company"
                  value={work.company}
                  onChange={(e) => handleWork(e)}
                  placeholder="company"
                  className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
                <input
                  type="text"
                  name="from"
                  value={work.from}
                  onChange={(e) => handleWork(e)}
                  placeholder="from"
                  className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />
                <input
                  type="text"
                  name="to"
                  value={work.to}
                  onChange={(e) => handleWork(e)}
                  placeholder="to"
                  className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />

                <input
                  type="text"
                  name="link"
                  value={work.link}
                  onChange={(e) => handleWork(e)}
                  placeholder="company url"
                  className=" outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
                />

                <button
                  className=" text-white bg-darker px-3 py-2"
                  onClick={() => {
                    setWorks((prev) => [...prev, work]);
                    setWork({
                      role: "",
                      company: "",
                      from: "",
                      to: "",
                      link: "",
                    });
                  }}
                >
                  add
                </button>
              </div>
            )}
          </section>

          <div className=" flex-auto flex flex-col bg-red-500 p-10 mt-10 cursor-pointer">
            <div
              className=" flex justify-between"
              onClick={() => {
                submitData().then(() => navigate("/view"));
              }}
            >
              {viewData && viewData.name && (
                <p className=" text-2xl mb-5">update</p>
              )}
              {Object.keys(viewData).length  === 0 && (
                <p className=" text-2xl mb-5">submit</p>
              )}
            </div>
          </div>
        </motion.div>
      }
    </div>
  );
}

export default Details