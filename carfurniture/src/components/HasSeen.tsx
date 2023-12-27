'use client'
import React, { useState } from 'react'

const HasSeen = () => {
    const [hasSeen, setHasSeen] = useState<number[]>(() =>
      JSON.parse(localStorage.getItem("news") ?? "")
    );
  return (
    <div>
      Has
    </div>
  )
}

export default HasSeen
