import React from 'react'

const LeftMessage = ({ message }) => {
  return (
    <div>
        <p className='max-w-64 bg-[#f0f0fe] rounded-lg text-left p-2'>{message}</p>
    </div>
  )
}

export default LeftMessage