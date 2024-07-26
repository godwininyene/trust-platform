import React, { useEffect, useState } from 'react'
import logo from '@/Assets/Images/logo.png';
import {IoIosHome, IoMdInformationCircle, IoIosHeadset, IoIosLogIn, IoIosPersonAdd} from 'react-icons/io';
import { MdCandlestickChart, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { HiMenuAlt1 } from 'react-icons/hi';
import { Link } from '@inertiajs/react';
import ToggleButton from './ToggleButton';
import { FaClipboardQuestion } from 'react-icons/fa6';

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
  }, [])
  let toggleDarkMode = () => {
        if (localStorage.theme === 'dark') {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', 'dark')
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark')
            setDarkMode(false);
        }
    }
    
  return (
    <header className={`sticky top-0 bg-black bg-opacity-20 md:bg-opacity-30 z-50 py-4 px-4`}>
      <div className="flex justify-between max-w-6xl mx-auto">
        <aside className={`flex items-center justify-between w-full md:w-auto`}>
          <div className={`flex-grow`}>
            <img src={logo} alt="" className={`w-40`} />
          </div>
          <button className={`bg-white text-slate-950 px-1 py-1 rounded-md md:hidden relative z-50`} onClick={() => setToggle((state) => !state)}>
            <HiMenuAlt1 className={`h-7 w-7`} />
          </button>
        </aside>
        
        <aside className={`fixed md:relative flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 dark:md:bg-transparent md:bg-transparent z-50 ${toggle ? 'left-0' : '-left-56 md:left-auto'} top-0 h-full w-56 md:w-auto transition-all duration-500 text-slate-900 dark:text-white`}>
          <div className={`px-3 py-3`}>
            <section className={`bg-slate-800 dark:bg-slate-950 p-3 mt-1 rounded-md shadow-md md:hidden block`}>
                <img src={logo} alt="" />
            </section>
          </div>
          <ul className={`text-sm flex-grow`}>
            <li className={`block md:inline-block`}>
              <Link href={route('home')} className={`flex items-center gap-1 md:text-white py-3 px-4 md:py-1 md:px-3 lg:px-4`}>
                <IoIosHome className={`inline h-5 w-5`} /> Home
              </Link>
            </li>
            <li className={`block md:inline-block`}>
              <Link href={route('about_us')} className={`flex items-center gap-1 md:text-white py-3 px-4 md:py-1 md:px-3 lg:px-4`}>
                <IoMdInformationCircle className={`inline h-5 w-5`} /> About
              </Link>
            </li>
           
            <li className={`block md:inline-block`}>
              <Link href={route('investment')} className={`flex items-center gap-1 md:text-white py-3 px-4 md:py-1 md:px-3 lg:px-4`}>
                <MdCandlestickChart className={`inline h-5 w-5`} /> Investment
              </Link>
            </li>
            <li className={`block md:inline-block`}>
              <Link href={route('contact_support')} className={`flex items-center gap-1 md:text-white py-3 px-4 md:py-1 md:px-3 lg:px-4`}>
                <IoIosHeadset className={`inline h-5 w-5`} /> Support
              </Link>
            </li>
            <li className={`block md:inline-block`}>
              <Link href={route('FAQs')} className={`flex items-center gap-1 md:text-white py-3 px-4 md:py-1 md:px-3 lg:px-4`}>
                <FaClipboardQuestion className={`inline h-5 w-5`} /> FAQs
              </Link>
            </li>
          </ul>
          {/* Mobile Only */}
          <ul className={`text-sm md:hidden flex flex-col px-4 py-3 gap-3`}>
            <li className={`block w-full`}>
              <Link href={route('login')} className={`flex items-center justify-center gap-1 py-2 text-center md:px-3 lg:px-4 border border-primary rounded-2xl`}>
                <IoIosLogIn className={`inline h-5 w-5`} /> Sign In
              </Link>
            </li>
            <li className={`block w-full md:ml-2`}>
              <Link href={route('register')} className={`flex items-center justify-center gap-1 text-white py-2 text-center px-3 bg-primary rounded-2xl`}>
                <IoIosPersonAdd className={`inline h-5 w-5`} /> Sign Up
              </Link>
            </li>
          
          </ul>
          {/* Mobile Only Ends Here */}
        </aside>
        <aside className={`hidden md:block`}>
          <ul className={`text-sm`}>
              <li className={`inline-block`}>
                <Link href={route('login')} className={`flex items-center gap-1 text-white py-1 px-3 transition-all duration-300 border-2 border-transparent hover:bg-transparent hover:border-primary  bg-primary rounded-2xl`}>
                  <IoIosLogIn className={`inline h-5 w-5`} /> Sign In
                </Link>
              </li>
              <li className={`inline-block md:ml-2`}>
                <Link href={route('register')} className={`flex items-center gap-1 text-black py-1 px-3 transition-all duration-300  hover:bg-primary bg-white rounded-2xl`}>
                  <IoIosPersonAdd className={`inline h-5 w-5`} /> Sign Up
                </Link>
              </li>
              
            </ul>
        </aside>
      </div>

      {/* Mobile Overlay */}
      <div className={`${toggle ? 'md:hidden block' : 'md:hidden hidden'} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40`}  onClick={() => setToggle(false)}></div>
    </header>
  )
}

export default Navigation