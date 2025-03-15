"use server"

import { auth } from "@/auth";


const Session = async () => {
    const session = await auth()
    return ( session?.user );
}

export default Session;