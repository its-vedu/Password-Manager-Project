import React from 'react';

function Footer() {
  return (
    <>
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full' >
            <div className='logo font-bold text-white text-2xl '>
                <span className='text-red-500'> &lt;</span>
                <span className='text-blue-400'>Safe</span><span className='text-red-500'>Password/&gt;</span>                
            </div >
            <div className='flex justify-center items-center'>Created with <img src='/src/images/heart.png' className='mx-2 w-7' alt='heart'/> by Vedant Chaudhari</div>
         
        </div>
    </>
  );
}

export default Footer;
