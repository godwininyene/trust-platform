import React from 'react';
import hero_image from '@/Assets/Images/hero_image.png';
import { Link } from '@inertiajs/react';
import {BiDollarCircle} from 'react-icons/bi';

const HomeBanner = () => {
  return (
    <div className={`min-h-screen py-20 px-4 overflow-hidden`}>
        <section className="max-w-6xl mx-auto min-h-[400px] grid grid-cols-1 md:grid-cols-2">
            <div className={`flex items-center text-center justify-center md:text-left md:justify-start mb-8`}>
                <aside>
                  <div className={`flex justify-center items-center md:justify-start gap-2 text-sm mb-3`}>
                    <Link href="" className={`p-1 inline-flex items-center justify-center md:mx-0 rounded-3xl bg-white bg-opacity-10 text-slate-300 font-medium`}>
                      <BiDollarCircle className={`h-10 w-10`} />
                    </Link>
                    <Link href="" className={`px-2 py-1 inline-flex items-center md:mx-0 rounded-xl bg-white bg-opacity-10 text-slate-300 font-medium`}>
                    We promise a 100% profit guarantee!
                    </Link>
                  </div>
                  <h1 className={`text-white text-6xl font-black mb-4`}>
                   Invest Your Money for  <span className={`text-primary`}> Greater </span> Returns
                  </h1>
                  <p className={`text-slate-300 font-normal text-lg mb-7`}>
                    With Trust Platform, anyone can boost their earnings by investing in various currencies online.
                  </p>
                  <div className={`md:flex gap-3 mb-10 md:mb-28`}>
                    <Link href={route('about_us')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-primary text-white font-bold`}>
                      Learn More
                    </Link>
                    <Link href={route('my_investments')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl border border-primary bg-black bg-opacity-50 text-white hover:bg-black font-bold`}>
                      Start Investing
                    </Link>
                  </div>
                </aside>
            </div>

            <div className='relative z-0'>
                <img src={hero_image} alt="mock" className={`md:absolute z-0 -mt-10 w-full`} />
            </div>
        </section>
    </div>
  )
}

export default HomeBanner