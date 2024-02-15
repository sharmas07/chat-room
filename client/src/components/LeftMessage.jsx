import React from 'react';

const LeftMessage = ({ messageItem }) => {
  return (
    <div>
      <p className='text-xs text-gray-500 mb-1'>{messageItem.sender}</p>
      <div className="left__ms">
        <div className="relative bg-[#f0f0fe] min-w-[6rem] max-w-[18rem] rounded-lg text-left p-2">
          <p className='overflow-wrap break-word'>{messageItem.message}</p>
          <span className="absolute bottom-1 right-1 text-xs text-gray-400">{messageItem.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

export default LeftMessage;
