import { signIn } from "next-auth/react";

export default function Unauth(){
    return <button onClick={()=>signIn('github')}>sign in</button>
}