import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>iTask</span>

      </div>
      <ul className="flex gap-8">
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
