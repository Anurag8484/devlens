'use client'
import { useSession } from "next-auth/react";

export default function Home() {
  const {data:session,status} = useSession();
  console.log(session)
  if(!session){
    return(
      <div>No sesison</div>
    )
  }
  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="User avatar"
          width={50}
          height={50}
        />
      )}
      <p>Email: {session.user?.email}</p>
      <button onClick={() => {}}>Sign out</button>
    </div>
  );
}
