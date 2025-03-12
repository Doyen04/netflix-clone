// "use client"
// import { auth, signOut } from "@/auth";
import Navbar from "@/component/navbar";

// import { signIn } from "next-auth/react";



const Home = async () => {
    // const session = await auth()
    
    return (
        <div >
           <Navbar />
        </div>
    );
}

export default Home;