import { useState } from 'react'
import './App.css'
import axios from "axios"


function App() {
const[username,setUsername]=useState("")
const[password,setPassword]=useState("")
const[susername,setSusername]=useState("")
const[spassword,setSpassword]=useState("")
const [info, setInfo] = useState({})

  const signup=async ()=>{
    try{
      await axios.post("http://localhost:3000/signup",
        {username:username,
          password:password
        }
      )
      alert("You are signed up")
      setUsername("")
      setPassword("")
    }
    catch(err){
      console.log(err); 
    }
  }

  const signIn=async()=>{
    try {
     const response= await axios.post("http://localhost:3000/signIn",
        {username:susername,
          password:spassword
        }
      )
      localStorage.setItem("token",response.data.message)
       alert("You are signed In")
       setSusername("")
       setSpassword("")
       getme();
    } catch (err) {
      console.log(err);
      
    }
  }

  const getme =async()=>{
    const response=await axios.get("http://localhost:3000/me",
      {headers:
        {token:localStorage.getItem("token")
        }
      }
    )
    setInfo({
      username:response.data.username,
      password:response.data.password
      
    })
  }
  const logout=()=>{
    localStorage.clear("token")
  }

  return (
    <>
      <div>
        Signup
        <input type="text"
         value={username}
          placeholder='username'
          onChange={(e)=>setUsername(e.target.value)}
          />
        <input type="password"
         value={password}
          placeholder='password'
          onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={signup}>Submit</button>
      </div>

       <div>
        SignIn
        <input type="text"
         value={susername}
          placeholder='username'
          onChange={(e)=>setSusername(e.target.value)}
          />
        <input type="password"
         value={spassword}
          placeholder='password'
          onChange={(e)=>setSpassword(e.target.value)} />
        <button onClick={signIn}>Submit</button>
      </div>

      <div>
        userInfo:{info.username},{info.password}
      </div>
      <div>
        <button>Logout</button>
      </div>
    </>
  )
}

export default App
