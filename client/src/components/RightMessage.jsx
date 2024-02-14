import React from 'react';

const RightMessage = ({message}) => {
  return (
    <div className="flex justify-end">
      <p className='max-w-[16rem] bg-[#6468f8] rounded-lg text-left text-white mt-2 p-2'>{message}</p>
    </div>
  );
};

export default RightMessage;
