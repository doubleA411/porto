import {useState, useEffect} from 'react'
import image from './assets/image.jpg';
import mm from './assets/mm.png'
import { supabase } from './supabase';

function Login() {

const [ cred , setCred ] = useState({
  email : "",
  pass : ""
});

const [exst , setExst ] = useState(false);
const [msg, setMsg] = useState("")
const [err, setError] = useState("")

const handleCred = (e) => {
  setCred({
    ...cred,
    [e.target.name] : e.target.value
  });
}


function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

const resetPassword = async (mail) => {
  const valid = isValidEmail(mail);

  if (valid) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(mail, {
      redirectTo: "http://localhost:3000/reset-password",
    });
    if (error) {
      console.error(error);
    }
    setMsg("Password reset mail has been sent to your mail");
  } else {
    setError("Provide a valid Email");
  }
};
// Sign up function
async function signUpNewUser(mail, password) {
  const res = isValidEmail(mail);
  if (res) {
    // const { data : auth , error : authErr} = await supabase.from('auth.user').select("email").eq('email',mail);
    // console.log(auth)

    const { data, error } = await supabase.auth.signUp({
      email: mail,
      password: password,
    });

    if (data) {
      if (data.user.identities.length === 0) {
        setError("User already exists");
      } else {
        console.log(data.user);
        setMsg("Verification mail has been sent");
      }
    } else {
      setError(error.message);
      console.log("Error occured while authenticating user : ", error);
    }
  } else {
    setError("Invalid email address");
  }
}

// Sign in function
async function signInWithEmail(mail, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: mail,
    password: password,
  });
  if (error) {
    setError(error.message);
  }
  console.log(data, error);
  return data;
}

function clearErrorAfterDelay() {
  setTimeout(() => {
    setError("");
  }, 5000);
}

useEffect(() => {
  console.log(err);
  if (err.length > 0) {
    clearErrorAfterDelay();
  }
}, [err]);




  return (
    <div className="flex min-h-screen text-white">
      <div className=" flex-1">
        {/* <div className=''></div> */}
        <div className=" absolute bottom-0 left-0 flex items-center justify-center gap-2 p-5 border-2 border-black rounded-xl backdrop-blur-md m-10">
          <p className=" text-black">Created by Minimal Mind</p>
          <img src={mm} alt="" className=" h-[20px] " />
        </div>
        <img src={image} alt="" className=" h-full w-full" />
      </div>
      <div className="flex-1/2 flex flex-col items-start justify-center gap-4 px-36 w-[600px] text-white">
        <div className=' flex flex-col w-full gap-4'>
          <p className="  text-4xl">porto</p>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={cred.email}
            onChange={(e) => handleCred(e)}
            className=" text-black p-2 rounded-lg outline-none w-full"
          />
          <input
            type="password"
            name="pass"
            placeholder="password"
            value={cred.pass}
            onChange={(e) => handleCred(e)}
            className=" text-black p-2 rounded-lg outline-none w-full"
          />
          <p className=" cursor-pointer hover:underline  ">forgot password ?</p>
          <button
            onClick={() =>
              exst
                ? signInWithEmail(cred.email, cred.pass)
                : signUpNewUser(cred.email, cred.pass)
            }
            className="  bg-purple-600 py-2 px-4 rounded-lg"
          >
            {exst ? "login" : "signup"}
          </button>
          <div className=" flex gap-2">
            <p>Already have an account ?</p>
            <input
              type="checkbox"
              className=" outline-none"
              value={exst}
              onChange={() => setExst(!exst)}
            />
          </div>
        </div>
        {msg && <p className=" text-green-500">{msg}</p>}
        {err && <p className=" text-red-500">{err}</p>}
      </div>
    </div>
  );
}

export default Login