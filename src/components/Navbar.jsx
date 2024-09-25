import React from 'react';

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white w-full">
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-24 w-full'>

            <div className='logo font-bold text-white text-2xl'>
                <span className='text-red-500'> &lt;</span>
                <span className='text-blue-400'>Safe</span><span className='text-red-500'>Password/&gt;</span>                
            </div >
            <div className='flex justify-center items-center'><ul>   

                <li className='flex gap-4'>
                    <a href='/' className='hover:font-bold'>Home</a>
                    <a href='about' className='hover:font-bold'>About</a>
                    <a href='contact' className='hover:font-bold'>Contact</a>
                    
                </li>

            </ul>

            <button className='text-white'><a href='https://github.com/its-vedu?tab=repositories'>
                <img src='/src/images/github.png' className='w-20 invert p-5'></img>
            </a></button> 

            <button className='text-white'><a href='kedin.com/in/vedant-chaudhari-149509272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>
                <img src='/src/images/linkedin.png' className='w-20  p-5'></img>
            </a></button> 
            </div>
        </div>
      
    </nav>
  );
}

export default Navbar;