import React from 'react'

function Error(props) {
  return (
    <div className="text-center mt-5">
          <h1 className="text-red-700 font-semibold text-2xl">{props.title}</h1>
          <p className="text-gray-500 mt-2">{props.desc}</p>
        </div>
  )
}

export default Error