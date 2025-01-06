import React, { useEffect, useState } from 'react'

const Hello = () => {
    const [message, setMessage] = useState("")
    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error("Error fetching API : ", error))
    })
    return (
        <>
            <h1>React-Tomcat Integration</h1>
            <p>{message}</p>
        </>
    )
}

export default Hello