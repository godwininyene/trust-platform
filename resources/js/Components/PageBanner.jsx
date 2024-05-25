import React from 'react';
import phoneMock from '@/Assets/Images/phonemock.png';
import { Link } from '@inertiajs/react';
import {BiDollarCircle} from 'react-icons/bi';

const PageBanner = ({page}) => {
  return (
    <div className={`py-3 px-4`}>
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className={`flex items-center text-center justify-center md:text-left md:justify-start my-8`}>
                <aside>
                  <h1 className={`text-white text-6xl font-black mb-4 capitalize`}>
                    { page.title }
                  </h1>
                  <p className={`text-slate-300 font-normal text-lg mb-4`}>
                    { page.description }
                  </p>
                  {/* <div className={`flex justify-center items-center md:justify-start gap-2 text-sm mb-3`}>
                    <Link href="" className={`p-1 inline-flex items-center justify-center md:mx-0 rounded-3xl bg-white bg-opacity-10 text-slate-300 font-medium`}>
                      <BiDollarCircle className={`h-6 w-6`} />
                    </Link>
                    <Link href="" className={`px-2 py-1 inline-flex items-center md:mx-0 rounded-xl bg-white bg-opacity-10 text-slate-300 font-medium`}>
                      { page.action_caption }
                    </Link>
                  </div> */}
                </aside>
            </div>
        </section>
    </div>
  )
}

export default PageBanner