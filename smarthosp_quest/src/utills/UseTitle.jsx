import React, { useEffect } from 'react'

const UseTitle = (title) => {
    useEffect(()=>{
        document.title = `SMART HOSPITAL - ${title}`
    },[title])
  return null
}

export default UseTitle