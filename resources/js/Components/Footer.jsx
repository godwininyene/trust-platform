import React, { useEffect } from 'react'
import GoogleTranslate from './GoogleTranslate'
import logo from '@/Assets/Images/logo.png';
import {FaPhoneAlt, FaEnvelope} from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import bannerBg from '@/Assets/Images/forex.jpeg';
import { Link } from '@inertiajs/react';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={`pt-10 bg-dark text-white min-h-[300px]`}>
      <div className="mx-auto max-w-6xl h-auto lg:h-96  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        <div className="md:col-span-2">
          <div className='mb-4 lg:mb-0 ml-5 lg:ml-0'>

            <Link href="/" className='block text-left mb-6'>
              <img src={logo} className='w-auto h-24 inline'/>
            </Link>

            <p className='text-sm leading-6 text-[#B6B6B6] pr-5'>
              Welcome to Trust Platform, your premier cryptocurrency trading platform. 
              We offer cutting-edge tools, secure transactions, and expert support to help you 
              maximize your investments. Join us and start your journey towards financial success today!
            </p>
            {/* <div className='mt-5 '>
              <img src={bannerBg} className='h-40 w-full object-cover rounded-md'/>
            </div> */}
          </div>
        </div>

        <div className="ml-5 lg:ml-0 px-4">
          <h3 className='text-left font-semibold text-white mb-5'>Quick Links</h3>

          <ul className='footer-nav-list list-none'>
            <li className='text-left mb-3 text-sm font-semibold relative group'>
                <Link href="/"className="text-[#B6B6B6] transition-all duration-300 hover:text-slate-100">Home</Link>
            </li>
            <li className='text-left mb-3 text-sm font-semibold relative group'>
                <Link href={route('about_us')} className="text-[#B6B6B6] transition-all duration-300 hover:text-slate-100">About</Link>
            </li>
            <li className='text-left mb-3 text-sm font-semibold relative group'>
                <Link  href={route('contact_support')} className="text-[#B6B6B6] transition-all duration-300 hover:text-slate-100">Contact</Link>
            </li>
            <li className='text-left mb-3 text-sm font-semibold relative group'>
                <Link href={route('investment')} className="text-[#B6B6B6] transition-all duration-300 hover:text-slate-100">Investments</Link>
            </li>
            <li className='text-left mb-3 text-sm font-semibold relative group'>
                <Link  href={route('FAQs')} className="text-[#B6B6B6] transition-all duration-300 hover:text-slate-100">Faq</Link>
            </li>
          </ul>
        </div>

       

        <div className="ml-5">
          
          <h3 className='text-left font-semibold text-white mb-5 pb-5'>Contact Us</h3>
          <div className='flex gap-x-3 items-center mb-5'>
            <div className=' h-9 w-9 rounded-full border-[2px] border-primary flex-shrink-0 flex justify-center items-center'>
             <MdLocationPin className={`inline text-sm`} />
            </div>
            <p className='text-[#B6B6B6]'>
             10, Arcadia Avenue, Finchley, London, United Kingdom, N3 2FH
            </p>
          </div>

          <div className='flex gap-x-3 items-center mb-5'>
            <div className=' h-9 w-9 rounded-full border-[2px] border-primary flex-shrink-0 flex justify-center items-center'>
             <FaEnvelope className={`inline text-sm`} />
            </div>
            <p className='text-[#B6B6B6] transition-all duration-300 hover:text-slate-100 flex-shrink-0'>
              <a href="mailto:support@trust-platform.com">support@trust-platform.com</a>
            </p>
          </div>

          

          {/* <div className='flex gap-x-3 items-center mb-5'>
            <div className=' h-9 w-9 rounded-full border-[2px] border-primary flex-shrink-0 flex justify-center items-center'>
             <FaPhoneAlt className={`inline text-sm`} />
            </div>
            <p className='text-[#B6B6B6] transition-all duration-300 hover:text-slate-100'>
              <a  href="tel:+2348163875505"> +2348163875505</a>
            </p>
          </div> */}
         
         
         
          <div>
            <GoogleTranslate />
          </div>

        </div>
      </div>
      <div className='font-medium text-[#999] text-center text-sm pb-5'>
          <span className=''>
            All rights reserved. copyright {year} 
            <Link href='/' className='text-primary'> trust-platform.com</Link>
          </span>
      </div>
    </div>
  )
}

export default Footer