import React,{useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
const Signin=()=>{
    const history=useHistory()
    const [password,setPassword]=useState("")
    const {token}=useParams()
    console.log(token)
    const PostData=()=>{
        fetch("/new-password",{
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:data.message,classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2 style={{color: "rgb(95,158,160)"}}>Explore</h2>
                <input type="password" placeholder="Enter a new password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button class="btn waves-effect waves-light" onClick={PostData}>
                    Update Password
                </button>
            </div>
        </div>
    )
}

 export default Signin