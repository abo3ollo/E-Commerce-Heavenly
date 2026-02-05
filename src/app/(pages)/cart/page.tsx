import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../../auth'
import { redirect } from 'next/navigation';

export default async function Cart() {


    let session = await getServerSession(authOptions)
    console.log(session);
    // if(!session){
    //     redirect("/login")
    // }
    
  return (
    <div>
      cart
    </div>
  )
}
