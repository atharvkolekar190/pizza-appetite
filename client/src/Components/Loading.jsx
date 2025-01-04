import React from 'react'

function Loading(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
          <p className="text-red-600 font-bold mt-4">{props.name}</p>
        </div>
  )
}

export default Loading