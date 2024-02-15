import React from 'react';

const RightMessage = ({ messageItem }) => {
  return (
    <div className="flex justify-end mt-2">
      <div className="left__ms">
        <div className="relative bg-[#6468f6] min-w-[6rem] max-w-[18rem] rounded-lg text-left p-2">
          <p className='overflow-wrap break-word text-white mb-2'>{messageItem.message}
          </p>
          <span className="absolute bottom-1 right-1 text-xs text-gray-300 mt-1">{messageItem.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default RightMessage;
