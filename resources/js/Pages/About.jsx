import CryptoWidget from '@/Components/CryptoWidget';
import PageBanner from '@/Components/PageBanner';
import peoples from '@/Assets/Images/peoples.jpg';
import group2 from '@/Assets/Images/refferal_2.png';
import group from '@/Assets/Images/group.jpg';
import BaseLayout from '@/Layouts/BaseLayout';
import { Link, Head } from '@inertiajs/react';
import {LuMenu} from 'react-icons/lu';
import coverImg from '@/Assets/Images/about_dark.png';
import feature0 from '@/Assets/Images/features01.png';
import peoples3 from '@/Assets/Images/referral_bg.jpg';
import {GiTrade} from 'react-icons/gi'




export default function Welcome({ auth }) {
    const pageHeadInfo = {
        title: 'About Us',
        description: `We're creating more than just profits, with all investments fully secured and providing solid returns.`,
       
    };
    return (
        <BaseLayout banner={<PageBanner page={pageHeadInfo} />}>
            <Head title="About us">
                <meta name="description" content="Trust Platform  Investments" />
                <meta name="keywords" content="Trust Platform, Trust Platform Investments, Crypto Investments" />
            </Head>


            {/*Section About Start */}
            <section className='py-12 lg:py-20 px-4 lg:px-0 bg-dark-light overflow-hidden'>
        	    <div className="max-w-6xl mx-auto">
                    <div className='flex flex-col md:flex-row gap-x-5 items-center'>

                        <div className='w-full md:w-2/4 relative'>
                            <div className='' data-aos="fade-right" data-aos-delay="400">
                                <div className='text-center lg:text-left overflow-hidden lg:pr-11'>
                                    <img src={coverImg} className='w-full inline-block'/>
                                </div>
                                <div className='absolute left-[5px] top-[60px]'>
                                    <div className='py-6 px-8 bg-[#3f514bcc] rounded-2xl'>
                                        <h3 className=' text-primary font-bold text-[32px]'>10 Years</h3>
                                        <p className='text-xl text-white'>Trading Expertise</p>
                                    </div>
                                </div>

                                <div className='absolute right-[50px] bottom-10'>
                                    <div className='py-6 px-8 bg-[#3f514bcc] rounded-2xl'>
                                        <h3 className=' text-primary font-bold text-[32px]'>15K</h3>
                                        <p className='text-xl text-white'>Satisfied Investors</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='w-full md:w-2/4 px-4 lg:px-0'>
                            {/*About us Text Start */}
                            <div className=' ' data-aos="slide-up">
                                <div className=''>
                                    <h2 className='text-3xl  md:text-5xl font-bold text-white'>
                                        Meet <span className='text-primary'>Our Company </span> and Seize the Opportunity!
                                    </h2>
                                    <div className='mt-2 lg:mt-8'>
                                        <p className='leading-[140%] mb-7 text-text-dark'>
                                            Welcome to Trust Platform, your premier destination for cryptocurrency trading. 
                                            Our platform empowers investors of all levels to enhance their earnings by trading a 
                                            wide range of digital currencies. With user-friendly tools, real-time data, and expert support, 
                                            Trust Platform ensures a seamless and profitable trading experience. Join us today and take advantage of our exclusive 100% profit guarantee! Don’t 
                                            miss this opportunity to secure your financial future with Trust Platform.
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                            {/*About us Text End */}

                            <div className='bg-dark-light hidden px-4 lg:px-10 py-5 rounded-lg shadow-lg mt-5' data-aos="slide-up">
                                <div className='mb-2'>
                                    <h3 className=' font-bold mb-1 text-black dark:text-white'>Stock Trading</h3>
                                    <div className='text-end relative'>
                                        <span className='absolute -top-6 right-2'>99%</span>
                                    </div>
                                    <div className='bg-slate-200  h-2 rounded-lg overflow-hidden'>
                                        <div className='w-[99%] bg-primary h-full'>&nbsp;</div>
                                    </div>
                                </div>


                                <div className='mb-2'>
                                    <h3 className=' font-bold mb-1 text-black dark:text-white'>Real Estate Arbitrage</h3>
                                    <div className='text-end relative'>
                                        <span className='absolute -top-6 right-2'>80%</span>
                                    </div>
                                    <div className='bg-slate-200  h-2 rounded-lg overflow-hidden'>
                                        <div className='w-[80%] bg-primary h-full'>&nbsp;</div>
                                    </div>
                                </div>


                                <div className=''>
                                    <h3 className=' font-bold mb-1 text-black dark:text-white'>Stock Exchange</h3>
                                    <div className='text-end relative'>
                                        <span className='absolute -top-6 right-2'>95%</span>
                                    </div>
                                    <div className='bg-slate-200  h-2 rounded-lg overflow-hidden'>
                                        <div className='w-[95%] bg-primary h-full'>&nbsp;</div>
                                    </div>
                                </div>
                            </div>


                            <div className={`md:flex gap-3 mt-6`}>
                               
                                <Link href={route('my_investments')} className={`transition-all duration-100 py-3 px-5 mx-2 md:mx-0 rounded-3xl border border-primary  text-primary hover:text-white hover:bg-primary font-bold`}>
                                    Get Started
                                </Link>
                                <Link href={route('about_us')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-primary text-white font-bold`}>
                                    Learn More
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/*Section About End */}

            {/*Section Benefit Start */}
            <section className='bg-dark py-12 lg:py-20 px-4 lg:px-0 overflow-hidden'>
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap flex-col lg:flex-row">

                        {/* Left Hand Contents */}
                        <div className='w-full lg:w-2/4 relative order-1 lg:order-none lg:pr-24'>
                            <div className=''>
                                <div className='mb-12'>
                                    <div className='mb-5'data-aos="fade-right" data-aos-delay="300"  data-aos-duration="800" >
                                        <h1 className='heading-primary text-[36px] leading-[40px] font-black text-white'><span className='text-primary'>Benefits</span> We Offer</h1>
                                    </div>
                                    <div className=''>
                                        <p className='text-text-dark text-xl'>
                                            Unlock the full potential of cryptocurrency with our amazing features and top-notch platform.
                                        </p>
                                    </div>
                                </div>

                                <div className=''>
                                    <div className='flex flex-col'>
                                        <div className='shadow-[0px_12px_30px_rgba(14,4,0,0.24)] bg-[#1b2d29] mb-4 p-6 rounded-lg border border-text-dark'>
                                            <h6 className='font-semibold text-lg text-white'>Fast and secure transactions for peace of mind.</h6>
                                        </div>

                                        <div className='shadow-[0px_12px_30px_rgba(14,4,0,0.24)]  mb-4 p-6 rounded-lg border border-text-dark'>
                                            <h6 className='font-semibold text-lg text-text-dark'>User-friendly interface for seamless trading experiences.</h6>
                                        </div>

                                        <div className='shadow-[0px_12px_30px_rgba(14,4,0,0.24)]  mb-4 p-6 rounded-lg border border-text-dark'>
                                            <h6 className='font-semibold text-lg text-text-dark'>24/7 customer support to assist you anytime.</h6>
                                        </div>

                                        <div className='shadow-[0px_12px_30px_rgba(14,4,0,0.24)]  mb-4 p-6 rounded-lg border border-text-dark'>
                                            <h6 className='font-semibold text-lg text-text-dark'>Advanced analytics tools to maximize your profits.</h6>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Hand Content */}
                        <div className='w-full lg:w-2/4 relative feature_right' data-aos='fade-left'>
                          <div className='relative z-50'>
                            <img src={feature0} className='w-full inline-block'/>
                          </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            {/*Section Benefit End */}

            {/* Referal Content Start */}
            <section className="overflow-hidden bg-cover bg-fixed " style={{backgroundImage:`url(${peoples3})`}}>
                <div className={`h-full py-12 lg:py-24 px-4 lg:px-0 bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95 text-primary`}>
    
                    <div className="max-w-6xl mx-auto">
                        <div className='flex flex-col lg:flex-row gap-x-20  items-center'>

                            <div className='w-full lg:w-2/4'>
                                <div className="text-white text-center lg:text-left" data-aos="fade-right" data-aos-delay="300">
                                    <h1 className="font-black text-4xl">
                                        5 Level <span className="text-primary inline-block mx-1">Referral</span> 
                                        Commission
                                    </h1>

                                    <p className='text-xl mt-3 mb-10'>
                                        Use your referral link to invite friends and other people. 
                                        You can earn extra money by recommending our website to others. 
                                        Get a 5% commission of each deposit from person who will register with your link.
                                        Referral System has 5 levels of commission. 
                                        With each additional registered user in the second level you will receive 2%
                                        and for every user registered in 3rd,
                                        4th and 5th level you will receive 1% commission.
                                    </p>


                                    <div className='flex gap-2 lg:gap-y-0 flex-wrap mb-5 lg:mb-0 justify-center lg:justify-normal'>
                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden  shadow-md border-2 border-primary'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 1</span>
                                            <h1 className='text-3xl font-bold'>5%</h1>
                                        </div>


                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden  shadow-md border-2 border-primary'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 2</span>
                                            <h1 className='text-3xl font-bold'>2%</h1>
                                        </div>

                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden  shadow-md border-2 border-primary'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 3</span>
                                            <h1 className='text-3xl font-bold'>1%</h1>
                                        </div>

                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden  shadow-md border-2 border-primary'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 4</span>
                                            <h1 className='text-3xl font-bold'>1%</h1>
                                        </div>

                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden  shadow-md border-2 border-primary'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 5</span>
                                            <h1 className='text-3xl font-bold'>1%</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-12'>
                                    <Link  href={route('my_investments')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl border-2 border-transparent transition-all duration-200 hover:border-primary bg-primary hover:bg-transparent text-white font-bold`}>
                                        Get Started
                                    </Link>
                                </div>
                            </div>

                            <div className='w-full lg:w-2/4'>
                                <div className='text-center relative rounded-md bg-slate-800 bg-opacity-60 w-full' data-aos="zoom-in" data-aos-delay="300">
                                    <img src={group2}  className='inline-block w-full'/>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </section>
            {/* Referal Content End */}

            {/* Section Get Started Start */}
            <section className="overflow-hidden bg-cover bg-fixed bg-dark-light" >
                <div className={`h-full py-12 lg:py-24 px-4 lg:px-0`}>
                    <div className="max-w-6xl mx-auto">

                        <div className='mb-16 text-center'>
                            <h2 className='font-black text-4xl text-white'>Start in mere minutes</h2>
                            <p className='uppercase text-white'>BEGIN YOUR PROFIT MAXIMIZATION JOURNEY WITH TRUST PLATFORM</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">


                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300 text-white' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <GiTrade className='text-6xl text-white inline-block' />
                                    
                                    <h5 className='font-semibold text-xl text-primary'>1. Register</h5>
                                    <p className='mt-6'>
                                        Sign up to create your own Trust Plaftorm account
                                    </p>

                                </div>
                            </div>

                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300 text-white' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <GiTrade className='text-6xl text-white inline-block' />
                                    
                                    <h5 className='font-semibold text-xl text-primary'>2. Fund Wallet</h5>
                                    <p className='mt-6'>
                                        Deposit your funds securely through our supported options
                                    </p>

                                </div>
                            </div>

                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300 text-white' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <GiTrade className='text-6xl text-white inline-block' />
                                    
                                    <h5 className='font-semibold text-xl text-primary'>3. Make Investment</h5>
                                    <p className='mt-6'>
                                        Invest into any preferred plan in our platform
                                    </p>

                                </div>
                            </div>


                            <div className=''>
                                <div className='py-7 px-3 text-center  text-white'  data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <GiTrade className='text-6xl text-white inline-block' />
                                    
                                    <h5 className='font-semibold text-xl text-primary'>4. Start Earning</h5>
                                    <p className='mt-6'>
                                        Start earning from trust-platform.com anytime, anywhere
                                    </p>

                                </div>
                            </div>



                        </div>

                        <div className='text-center mt-12'>
                            <Link  href={route('my_investments')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-primary border-2 border-transparent hover:border-primary hover:bg-transparent text-white font-bold`}>
                                Get Started
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
             {/* Section Get Started End */}



        </BaseLayout>
    );
}
