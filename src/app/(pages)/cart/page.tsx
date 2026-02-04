import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../../auth'

export default async function Cart() {


    let session = await getServerSession(authOptions)
    console.log(session);
    
  return (
    <div>
      cart
    </div>
  )
}
