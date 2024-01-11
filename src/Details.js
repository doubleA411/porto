import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Details() {
  const [ userId, setUserID ] = useState({});



  const navigate = useNavigate();


  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error occured: ", error);
    }
  }

  const handleSignOut = async () => {
    await signOut();
  };


  const getUser = async() => {
    const { data :{ user }} = await supabase.auth.getUser();
    setUserID(user);
   }

  useEffect(() => {
    getUser();
  },[])

    const [ userData, setUser ] = useState({
        name: "",
        email : "",
        logo : null,
        image : null,
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

   


    const uploadImage = async (name, file) => {

      if( name === "avatar") {
          console.log(file);
          const { data, error } = await supabase.storage
            .from("porto")
            .upload(`${userId.id}/avatar.png`,file);
    
            if(error) {
              console.log(error)
            } else {
              console.log(data);
              
            }
            const { data : imageData } = supabase.storage
              .from("porto")
              .getPublicUrl(`${userId.id}/avatar.png`);

              if(data) {
                setUser({
                  ...userData,
                  image: imageData.publicUrl,
                })
                console.log("userData updated")
              } else {
                console.log(error)
              }
        } else {
          const { data, error } = await supabase.storage
            .from("porto")
            .upload(`${userId.id}/logo.png`, file);
  
          if (error) {
            console.log(error.message);
          } else {
            console.log(data);
          }
          const { data: imageData } = supabase.storage
            .from("porto")
            .getPublicUrl(`${userId.id}/logo.png`);

          if (data) {
            setUser({
              ...userData,
              logo: imageData.publicUrl,
            });
            console.log("userData updated");
          } else {
            console.log(error);
          }
        }
    }





  return (
    <div className=" px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-20 max-w-[700px] mx-auto text-primary ">
      <p
        className=" bg-primary text-dark flex items-end cursor-pointer w-fit"
        onClick={() => handleSignOut()}
      >
        signout
      </p>
      <div className=" flex-auto flex flex-col p-10">
        <div className=" flex justify-between">
          <p className=" text-2xl mb-5">user info.</p>
          <div
            className={` ${
              userData.email && userData.name ? "bg-green-500" : "bg-red-500"
            } w-3 h-3 rounded-full`}
          ></div>
        </div>
        <div className=" flex flex-col items-start gap-4 text-primary w-full">
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
            <input
              name="image"
              type="file"
              onChange={(e) =>
                // setUser({
                //   ...userData,
                //   image: e.target.files[0],
                // })
                uploadImage('avatar', e.target.files[0])
              }
              placeholder="image"
              className="outline-none bg-transparent border border-grey p-4 rounded-xl w-full"
            />
            
            <input
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
            />
        </div>
      </div>

      <div className=" flex-auto flex flex-col p-10">
        <div className=" flex justify-between">
          <p className=" text-2xl mb-5">about you.</p>
          <div
            className={` ${
              about.aboutLg && about.aboutSmall && about.oneliner
                ? "bg-green-500"
                : "bg-red-500"
            } w-3 h-3 rounded-full`}
          ></div>
        </div>
        <div className=" flex flex-col items-start gap-4 text-white w-full">
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
      </div>

      <div className=" flex-auto flex flex-col  p-10">
        <div className=" flex justify-between">
          <p className=" text-2xl mb-5">other stuff.</p>
          <div
            className={` ${
              social.github && social.insta && social.linkedin && social.twitter
                ? "bg-green-500"
                : "bg-red-500"
            } w-3 h-3 rounded-full`}
          ></div>
        </div>
        <div className=" flex flex-col items-start gap-4 text-white w-full">
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
      </div>

      <div className=" flex-auto flex flex-col p-10">
        <div className=" flex justify-between">
          <p className=" text-2xl mb-5">project {projects.length + 1} .</p>
          <div className=" bg-red-500 w-3 h-3 rounded-full"></div>
        </div>
        <div className=" flex flex-col items-start gap-4 text-white w-full">
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
      </div>

      <div className=" flex-auto flex flex-col  p-10">
        <div className=" flex justify-between">
          <p className=" text-2xl mb-5">work/intern {works.length + 1} .</p>
          <div className=" bg-red-500 w-3 h-3 rounded-full"></div>
        </div>
        <div className=" flex flex-col items-start gap-4 text-white w-full">
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
      </div>

      <div className=" flex-auto flex flex-col bg-red-500 p-10 cursor-pointer">
        <div
          className=" flex justify-between"
          onClick={() => {
            addData();
            navigate("/view");
          }}
        >
          <p className=" text-2xl mb-5">submit</p>
        </div>
      </div>
    </div>
  );
}

export default Details