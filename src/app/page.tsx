'use client'
import React from 'react'
import Form from "../components/Form";
import ListUsers from "../components/ListUsers";

function Home() {
  const [update, setUpdate] = React.useState(false)
  return (
   <div>
      <Form update={update} setUpdate={setUpdate} />
      <ListUsers update={update} setUpdate={setUpdate} />
   </div>
  )
}

export default Home
