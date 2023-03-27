import React, { useState, useEffect } from 'react'

export default function Prof() {
const [user, setuser] = useState({});

useEffect(() => {
    fetch('/login',{
        method: 'post'
    })
    .then(res => res.json())
    .then(data => setuser(data.message))
}, [])

  return (
    <div>
     <h2>{user.name}</h2>
     <h2>{user.email}</h2>
    </div>
  )
}
