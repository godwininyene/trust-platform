import CryptoWidget from '@/Components/CryptoWidget';
import PageBanner from '@/Components/PageBanner';
import BaseLayout from '@/Layouts/BaseLayout';
import { Link, Head } from '@inertiajs/react';
import { MdLocationPin } from 'react-icons/md';
import {FaPhoneAlt, FaEnvelope} from 'react-icons/fa';
import React from 'react';
import LoadingIndicator from '@/Components/LoadingIndicator';

export default function Welcome({ auth }) {
    const pageHeadInfo = {
        title: 'Contact Us',
        description: `We love to show how you can get more profit. Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Corrupti ad, eveniet modi`,
        action_caption: 'Get in touch with us to help you more.',
    };
    const[isProcessing, setIsProcessing] = React.useState(false);
    const [isOk, setIsOk] = React.useState(false);
    const submitData = async(event)=>{
        event.preventDefault();
        const data = new FormData(event.target);
        setIsProcessing(true);

        try{
            const res = await axios.post(route('api.save_contact'), data);
            if( res.statusText == "OK"){
                setIsOk(true)
                event.target.reset();
            }

            setIsProcessing(false);
        }catch(error){
            setIsProcessing(false);
            console.log(error)
        }
    }
 
    return (
        <BaseLayout banner={<PageBanner page={pageHeadInfo} />}>
           <Head title="Contact Us">
                <meta name="description" content="Trust Platform  Investments" />
                <meta name="keywords" content="Trust Platform, Trust Platform Investments, Crypto Investments" />
            </Head>

    
            <section className='py-12 lg:py-24  bg-dark-light overflow-hidden'>
               
               <div className="max-w-6xl mx-auto">
                  <div className='flex flex-col lg:flex-row gap-x-3'>

                    <div className='w-full lg:w-2/4'>
                        <div className='bg-dark flex flex-col justify-center items-center py-5 rounded-lg h-full'>

                            <div className='mb-4 flex flex-col items-center'>
                                <MdLocationPin className='text-primary text-4xl'/>
                                <p className='w-52 text-center text-[#B6B6B6] mt-2'>10, Arcadia Avenue, Finchley, London, United Kingdom, N3 2FH</p>
                            </div>

                            <div className='mb-4 flex flex-col items-center'>
                                <FaEnvelope className='text-primary text-3xl'/>
                                <p className='text-[#B6B6B6] mt-2 transition-all duration-300 hover:text-slate-100'>
                                    <a href="mailto:support@massive-wealthfinance.com">support@trust-platform.com</a>
                                </p>
                            </div>

                            {/* <div className='mb-4 flex flex-col items-center'>
                                <FaPhoneAlt className='text-primary text-3xl'/>
                                <p className='text-[#B6B6B6] mt-2 transition-all duration-300 hover:text-slate-100'>
                                    <a  href="tel:+2348163875505"> +2348163875505</a>
                                </p>
                            </div> */}

                        </div>
                    </div>

                    {/* Form Start */}
                    <div className='w-full lg:w-2/4'>
                        <form onSubmit={(e)=>submitData(e)} className="p-5 sm:p-10 bg-dark rounded-lg text-white">
                            <h3 className="text-center font-medium text-2xl relative mb-6 after:block  after:h-[1px] after:w-40 after:mx-auto  after:dark:bg-white after:bg-primary">Send us a message</h3>
                           
                            <div className="w-full  mb-3">
                                <label htmlFor="name" className="block">Full name</label>
                                <input id="name" type="text" name="name" className="transition-all duration-200 block w-full rounded py-3 pl-4 focus:border-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg dark:text-black"/>
                            </div>

                            <div className="w-full  mb-3">
                                <label htmlFor="subject" className="block">Subject</label>
                                <input id="subject" type="text" name="subject" className="transition-all duration-200 block w-full rounded py-3 pl-4 focus:border-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg dark:text-black"/>
                            </div>


                            <div className="w-full  mb-3">
                                <label htmlFor="email" className="block">Email Address</label>
                                <input id="email" type="email" name="email" className="transition-all duration-200 block w-full rounded py-3 pl-4 focus:border-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg dark:text-black"/>
                            </div>

                            <div className="mb-3 md:mb-0">
                                <label htmlFor="message" className="block">Message</label>
                                <textarea name="message" id="message" className="w-full rounded  min-h-[150px] focus:border-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg dark:text-black"></textarea>
                            </div>
                            {
                                isOk &&  <p className='bg-green-100 p-3 rounded-sm text-center leading-[1] text-sm'>Your email has been sent successfully. Our support team will get back to you soon. Thank you</p>
                            }
                            <button className="mt-3 flex items-center justify-center py-3 text-center bg-primary   rounded hover:bg-green-500 text-white w-full">
                               {isProcessing && <LoadingIndicator />}
                                Send!
                            </button>

                               
                
                        </form>
                    </div>
                    {/* Form Content End */}
                   
                  </div>
                </div>
            </section>

            
        </BaseLayout>
    );
}
