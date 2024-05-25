import CryptoWidget from '@/Components/CryptoWidget';
import HomeBanner from '@/Components/HomeBanner';
import BaseLayout from '@/Layouts/BaseLayout';
import coverImg from '@/Assets/Images/about_img.png';
import { Link, Head } from '@inertiajs/react';
import { MdManageAccounts } from 'react-icons/md';
import {IoIosHeadset} from 'react-icons/io';
import { FaServer } from 'react-icons/fa';
import {GiTrade} from 'react-icons/gi'
import peoples from '@/Assets/Images/peoples.jpg';
import peoples2 from '@/Assets/Images/group.jpg';
import featureIcon1 from '@/Assets/Images/feature-icon-1.png'
import featureIcon3 from '@/Assets/Images/feature-icon-3.png';
import featureIcon4 from '@/Assets/Images/feature-icon-4.png';
import featureIcon5 from '@/Assets/Images/feature-icon-5.png';
import featureIcon6 from '@/Assets/Images/feature-icon-6.png';
import group2 from '@/Assets/Images/group-2.png';
import investor1 from "@/Assets/Images/investor-1.jpg";
import investor2 from "@/Assets/Images/investor-2.jpg";
import investor3 from "@/Assets/Images/investor-3.webp";
import investor4 from "@/Assets/Images/investor-4.jpg";
import {AiFillStar} from 'react-icons/ai';

import {Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Welcome({ auth }) {
    return (
        <BaseLayout banner={<HomeBanner />}>
            <Head title="Massive Wealth & Finance">
                <meta name="description" content="Massive Wealth & Financial Investments" />
                <meta name="keywords" content="Massive Wealth, Financial Investments, Crypto Investments" />
            </Head>

            <CryptoWidget />
            {/*Section About Start */}
            <section className='py-12 lg:py-20 px-0 md:px-3 bg-[rgb(244,244,244)] dark:bg-slate-800 overflow-hidden lg:px-0'>
        	    <div className="max-w-6xl mx-auto">
                    <div className='flex flex-col lg:flex-row gap-x-5 items-center'>

                        <div className='w-full lg:w-2/4'>
                            <div className='text-center lg:text-left overflow-hidden' data-aos="fade-right" data-aos-delay="400">
                                <img src={coverImg} className='w-full inline-block'/>
                            </div>
                        </div>


                        <div className='w-full lg:w-2/4 px-4 lg:px-0'>
                            {/*About us Text Start */}
                            <div className='bg-white px-4 lg:px-10 py-5 rounded-lg shadow-lg dark:bg-slate-950 dark:text-white' data-aos="slide-up">
                                <div className=''>
                                    <h2 className='text-3xl  md:text-4xl font-bold text-slate-600 dark:text-white'>
                                        Massive Wealth Finance Awesome Service that Works for You!
                                    </h2>
                                    <div className='mt-2 lg:mt-8'>
                                        <h3 className='text-xl font-bold mb-1 text-black dark:text-white'>Get to meet Massive Wealth finance</h3>
                                        <p className='leading-[140%] mb-7'>
                                            Massive-wealthfinance.com is a real estate shares
                                            and investments service company founded by professional brokerage
                                            traders who have been working in stock market for more than 10 years.
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                            {/*About us Text End */}

                            <div className='bg-white dark:bg-slate-950 dark:text-white px-4 lg:px-10 py-5 rounded-lg shadow-lg mt-5' data-aos="slide-up">
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


                            <div className={`md:flex gap-3 mt-6 justify-center`}>
                               
                                <Link href={route('my_investments')} className={`transition-all duration-100 py-3 px-5 mx-2 md:mx-0 rounded-3xl border border-primary  text-primary hover:text-white hover:bg-primary font-bold`}>
                                    Get Started
                                </Link>
                                <Link href={route('about_us')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-gradient-to-b from-primary to-[#ca4a00] hover:bg-black text-white font-bold`}>
                                    Learn More
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/*Section About End */}

            {/*Section Strategy Start */}
            <section className='py-12 lg:py-20 px-0 md:px-3 bg-white dark:bg-slate-800 overflow-hidden lg:px-0'>
        	    <div className="max-w-6xl mx-auto">
                    <div className='mb-16 text-center'>
                        <h2 className='font-black text-4xl text-black dark:text-white'>Our GLOBAL STRATEGY</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">


                        <div className=''>
                            <div className='py-7 px-3 text-center border-r border-slate-300 text-black dark:text-white'>
                                <GiTrade className='text-6xl text-slate-500 dark:text-white inline-block' />
                                
                                <h5 className='font-semibold text-xl'>Trading Experience</h5>
                                <p className='mt-6'>
                                    For our purpose to provide best trading experience and cutting
                                    edge technologies, Massive Wealth has established partnership with
                                    corporates and institutions from more than 10 countries.
                                </p>

                            </div>
                        </div>

                        <div className=''>
                            <div className='py-7 px-3 text-center border-r border-slate-300 text-black dark:text-white'>
                                <FaServer className='text-6xl text-slate-500 dark:text-white inline-block' />
                                <h5 className='font-semibold text-xl'>Diversified Servers</h5>
                                
                                <p className='mt-6'>
                                    With firewalls, diversified servers and backup servers operating in Europe,
                                    Asia and the US, we provide accurate and fast trading experience.
                                    Our global offices are ready to support our clients 24/5.
                                </p>

                            </div>
                        </div>
                        
                        <div className=''>
                            <div className='py-7 px-3 text-center border-r border-slate-300 text-black dark:text-white'>
                                <MdManageAccounts className='text-6xl text-slate-500 dark:text-white inline-block' />
                                <h5 className='font-semibold text-xl'>Segregated Account</h5>
                                <p className='mt-6'>
                                    We value our clients' funds. With our segregated account, clients'
                                    funds are kept safe in top tier global bank. 
                                    Our Finance Team is here to process clients’ transactions promptly, and safely.
                                </p>

                            </div>
                        </div>

                        <div className=''>
                            <div className='py-7 px-3 text-center  text-black dark:text-white'>
                                <IoIosHeadset className='text-6xl text-slate-500 dark:text-white inline-block' />
                                <h5 className='font-semibold text-xl'>Quality Support Team</h5>
                                <p className='mt-6'>
                                    The team processes clients transactions in compliance with regulations such as AML and CFT.
                                    Join us today and ascend on the next stage of international market with us.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Section Strategy End */}


            {/*plan Content Start */}
            <section className='py-12 lg:py-24 bg-[rgb(244,244,244)] px-4 lg:px-0 dark:bg-slate-950'>
                <div className='max-w-6xl mx-auto dark:text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-black'>Our Investment Plans</h2>
                    <p className='text-center text-xl mt-3 mb-10 md:mb-20 w-[70%] ml-[15%] '>
                        We offer the best in class investment plans, with rapid returns on your investments.
                        We also provide 100% security to your investments. 
                        All investments are 100% insured.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className='flex gap-x-5 flex-col lg:flex-row'>

                    <div className='w-full lg:w-1/4 mb-10 lg:mb-0'>
                        <div className='h-full bg-slate-900 rounded-md relative border-[3px] border-primary  rounded-tr-[80px] rounded-tl-[20px] px-5 pb-3' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                        <div className='h-16 w-16 rounded-full border-[3px] border-primaryLight mx-auto flex items-center justify-center text-4xl font-black bg-white relative -top-10'>1</div>
                        <div className="w-12 h-12 rounded-full border-[3px] border-primaryLight  bg-white text-black   mx-auto flex items-center justify-center text-2xl p-7 font-black relative -top-14 left-5">30%</div>
                        <div className='text-center pb-3 px-2'>
                            <h3 className='uppercase text-2xl font-black mb-5 text-primary'>
                                After 24 Hours
                                
                            </h3>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Minimum Deposit - $30</small>
                            </div>

                            <div className='border-b border-b-primaryLight py-2'>
                                <small className='text-lg text-white  block'>Maximum Deposit - $499</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Referral Bonus - 3%</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Principal Return - No</small>
                            </div>


                        </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/4 mb-10 lg:mb-0'>
                        <div className='h-full bg-slate-950 rounded-md relative border-[2px] border-primary  rounded-tr-[80px] rounded-tl-[20px] px-5 pb-3' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                        <div className='h-16 w-16 rounded-full border-[3px] border-primaryLight mx-auto flex items-center justify-center text-4xl font-black bg-white relative -top-10'>2</div>
                        <div className="w-12 h-12 rounded-full border-[3px] border-primaryLight  bg-white text-black   mx-auto flex items-center justify-center text-2xl p-7 font-black relative -top-14 left-5">50%</div>
                        <div className='text-center pb-3 px-2'>
                            <h3 className='uppercase text-2xl font-black mb-5 text-primary'>
                                After 28 Hours
                                
                            </h3>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Minimum Deposit - $500</small>
                            </div>

                            <div className='border-b border-b-primaryLight py-2'>
                                <small className='text-lg text-white  block'>Maximum Deposit - $999</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Referral Bonus - 3%</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Principal Return - No</small>
                            </div>


                        </div>
                        </div>
                    </div>

                
                    <div className='w-full lg:w-1/4 mb-10 lg:mb-0'>
                        <div className='h-full bg-slate-900 rounded-md relative border-[2px] border-primary  rounded-tr-[80px] rounded-tl-[20px] px-5 pb-3' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                        <div className='h-16 w-16 rounded-full border-[3px] border-primaryLight mx-auto flex items-center justify-center text-4xl font-black bg-white relative -top-10'>3</div>
                        <div className="w-12 h-12 rounded-full border-[3px] border-primaryLight  bg-white text-black   mx-auto flex items-center justify-center text-2xl p-7 font-black relative -top-14 left-5">80%</div>
                        <div className='text-center pb-3 px-2'>
                            <h3 className='uppercase text-2xl font-black mb-5 text-primary'>
                                After 72 Hours
                                
                            </h3>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Minimum Deposit - $1000</small>
                            </div>

                            <div className='border-b border-b-primaryLight py-2'>
                                <small className='text-lg text-white  block'>Maximum Deposit - $1,999</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Referral Bonus - 5%</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Principal Return - No</small>
                            </div>


                        </div>
                        </div>
                    </div>
                    
                    <div className='w-full lg:w-1/4'>
                        <div className='h-full bg-slate-950 rounded-md relative border-[2px] border-primary  rounded-tr-[80px] rounded-tl-[20px] px-5 pb-3' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                        <div className='h-16 w-16 rounded-full border-[3px] border-primaryLight mx-auto flex items-center justify-center text-4xl font-black bg-white relative -top-10'>4</div>
                        <div className="w-12 h-12 rounded-full border-[3px] border-primaryLight  bg-white text-black   mx-auto flex items-center justify-center text-xl p-7 font-black relative -top-14 left-5">100%</div>
                        <div className='text-center pb-3 px-2'>
                            <h3 className='uppercase text-2xl font-black mb-5 text-primary'>
                                After 4 Days
                                
                            </h3>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Minimum Deposit - $2,000</small>
                            </div>

                            <div className='border-b border-b-primaryLight py-2'>
                                <small className='text-lg text-white  block'>Maximum Deposit - Unlimited</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Referral Bonus - 7%</small>
                            </div>

                            <div className='border-b border-b-primaryLight  py-2'>
                                <small className='text-lg text-white  block'>Principal Return - No</small>
                            </div>


                        </div>
                        </div>
                    </div>
              </div>
            </div>
            </section>
            {/*plan Content End */}

            {/* Section Get Started Start */}
            <section className="overflow-hidden bg-cover bg-fixed" style={{backgroundImage:`url(${peoples})`}}>
                <div className={`h-full py-12 lg:py-24 px-4 lg:px-0 bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95`}>
                    <div className="max-w-6xl mx-auto">

                        <div className='mb-16 text-center'>
                            <h2 className='font-black text-4xl text-white'>Get started in minutes</h2>
                            <p className='uppercase text-white'>START PROFIT MAXIMIZATION JOURNEY WITH massive wealth finance</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">


                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300 text-white' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <GiTrade className='text-6xl text-white inline-block' />
                                    
                                    <h5 className='font-semibold text-xl text-primary'>1. Register</h5>
                                    <p className='mt-6'>
                                        Sign up to create your own Massive Wealth Finance account
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
                                        Start earning from Massive-wealthfinance.com anytime, anywhere
                                    </p>

                                </div>
                            </div>



                        </div>

                        <div className='text-center mt-12'>
                            <Link  href={route('my_investments')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-gradient-to-b from-primary to-[#ca4a00] hover:bg-black text-white font-bold`}>
                                Get Started
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
             {/* Section Get Started End */}

            {/* Sub-features Content Start */}
            <section className='py-12 lg:py-24 bg-[rgb(244,244,244)] dark:bg-slate-800'>
                <div className='max-w-6xl mx-auto dark:text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-black'>Our Main Features</h2>
                    <p className='text-center text-xl mt-3 mb-10 md:mb-20'>
                        Explore the main advantages and features of our program.
                    </p>
                </div>
               
               <div className="max-w-6xl mx-auto">
                    <div className='flex flex-col md:flex-row flex-wrap lg:justify-center justify-around px-4 lg:px-0'>

                        <div className='w-full md:w-[45%] lg:w-[30%] mb-5 mr-0 lg:mr-5 flex-shrink-0'>
                            <div className='transition-all duration-200 text-center h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black ' data-aos="flip-left" data-aos-delay="150" data-aos-offset="200">
                                <img src={featureIcon1} className='inline-block'/>
                                <h3 className='text-xl font-bold my-1'>High Profit</h3>
                                <p className=''>
                                    Make high profit when you invest your crytocurrency with our platform like never before
                                </p>
                            </div>
                        </div>

                        <div className='w-full md:w-[45%] lg:w-[30%] mb-5 mr-0 lg:mr-5 flex-shrink-0'>
                            <div className='transition-all duration-200 text-center h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <img src={featureIcon4} className='inline-block'/>
                                <h3 className='text-xl font-bold my-1'>Always Online</h3>
                                <p className=''>
                                    Make high profit when you invest your crytocurrency with our platform like never before
                                </p>
                            </div>
                        </div>

                        <div className='w-full md:w-[45%] lg:w-[30%] mb-5 flex-shrink-0'>
                            <div className='transition-all duration-200 text-center h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black ' data-aos="flip-right" data-aos-delay="150" data-aos-offset="200">
                                <img src={featureIcon3} className='inline-block'/>
                                <h3 className='text-xl font-bold my-1'>Fully Secured</h3>
                                <p className=''>
                                    Make high profit when you invest your crytocurrency with our platform like never before
                                </p>
                            </div>
                        </div>

                        <div className='w-full md:w-[45%] lg:w-[30%] mb-5 mr-0 lg:mr-5 flex-shrink-0'>
                            <div className='transition-all duration-200 text-center h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black ' data-aos="fade-up" data-aos-delay="150" data-aos-offset="200">
                                <img src={featureIcon4} className='inline-block'/>
                                <h3 className='text-xl font-bold my-1'>2/4 Support</h3>
                                <p className=''>
                                    Make high profit when you invest your crytocurrency with our platform like never before
                                </p>
                            </div>
                        </div>


                        <div className='w-full md:w-[45%] lg:w-[30%] mb-5 mr-0 lg:mr-5 flex-shrink-0'>
                            <div className='transition-all duration-200 text-center h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black ' >
                                <img src={featureIcon5} className='inline-block'/>
                                <h3 className='text-xl font-bold my-1'>Fast Payout</h3>
                                <p className=''>
                                    Make high profit when you invest your crytocurrency with our platform like never before
                                </p>
                            </div>
                        </div>


                        <div className='w-full md:w-[45%] lg:w-[30%] mb-5 flex-shrink'>
                            <div className='transition-all duration-200 text-center h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black ' data-aos="fade-up" data-aos-delay="150" data-aos-offset="200">
                                <img src={featureIcon6} className='inline-block'/>
                                <h3 className='text-xl font-bold my-1'>True Statistics</h3>
                                <p className=''>
                                    Make high profit when you invest your crytocurrency with our platform like never before
                                </p>
                            </div>
                        </div>

                    </div>
               </div>

            </section>
            {/* Sub-features Content End */}


            {/* Referal Content Start */}
             <section className="overflow-hidden bg-cover bg-fixed " style={{backgroundImage:`url(${peoples2})`}}>
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
                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden bg-primary rounded bg-opacity-60 shadow-md'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 1</span>
                                            <h1 className='text-3xl font-bold'>5%</h1>
                                        </div>


                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden bg-primary rounded bg-opacity-60 shadow-md'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 2</span>
                                            <h1 className='text-3xl font-bold'>2%</h1>
                                        </div>

                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden bg-primary rounded bg-opacity-60 shadow-md'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 3</span>
                                            <h1 className='text-3xl font-bold'>1%</h1>
                                        </div>

                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden bg-primary rounded bg-opacity-60 shadow-md'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 4</span>
                                            <h1 className='text-3xl font-bold'>1%</h1>
                                        </div>

                                        <div className='flex-shrink-0 w-24 h-20 text-white text-center overflow-hidden bg-primary rounded bg-opacity-60 shadow-md'>
                                            <span className='inline-block w-full bg-white text-black  py-1 font-bold'>Level 5</span>
                                            <h1 className='text-3xl font-bold'>1%</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className='text-center mt-12'>
                                    <Link  href={route('my_investments')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-gradient-to-b from-primary to-[#ca4a00] hover:bg-black text-white font-bold`}>
                                        Get Started
                                    </Link>
                                </div>
                            </div>

                            <div className='w-full lg:w-2/4'>
                                <div className='text-center relative rounded-md bg-slate-800 bg-opacity-60' data-aos="zoom-in" data-aos-delay="300">
                                    <img src={group2}  className='inline-block'/>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </section>
            {/* Referal Content End */}

            {/* Testimonial Content Start */}
             <section className='py-12 lg:py-24 bg-[rgb(244,244,244)] dark:bg-slate-800 px-4 lg:px-0'>
                <div className='max-w-6xl mx-auto dark:text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-bold'>What Our Investors Are Saying</h2>
                    <p className='text-center text-xl mt-3 mb-10 md:mb-20'>
                        We make people genuinely happy.
                    </p>
                </div>

                <div className='max-w-6xl mx-auto dark:text-white pb-10'>
                    <Swiper className='hidden'
                        modules={[Autoplay]}
                        spaceBetween={50}
                        slidesPerView={3}
                        autoplay
                        breakpoints={{
                            320: {
                                width: 320,
                                slidesPerView: 1,
                            },
                              768: {
                                width: 768,
                                slidesPerView: 2,
                            },
                        }}
                       
                    >
                        <SwiperSlide className='h-[272px]'>
                            <div className='transition-all duration-200  flex h-[272px] p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor1} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 pr-3 lg:pr-0'>
                                        <h2 className='font-semibold'>Kelly Smith</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>

                                        <p>	
                                            massive-wealthfinance.com is my most correct choice, I can get continuous income, 
                                            I will continue to invest in massive-wealthfinance.com, it will help me gain wealth freedom
                                        </p>
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide>
                            <div className='transition-all duration-200  flex h-[272px] p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor2} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 pr-3 lg:pr-0 '>
                                        <h2 className='font-semibold'>Anglo Matthew</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>

                                        <p>	
	
                                            massive-wealthfinance.com team is very professional, I have started to recommend to family, 
                                            friends, and build my own team, to get passive income.
                                        </p>
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide>
                            <div className='transition-all duration-200  flex h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor3} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 pr-3 lg:pr-0 '>
                                        <h2 className='font-semibold'>Kelvin Smith</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>

                                        <p>	
	
                                            massive-wealthfinance.com is a Great looking website with all the possible ways to trade and invest bitcoins all over the world with quick and massive profits also professional support!
                                        </p>
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide>
                            <div className='transition-all duration-200  flex h-[272px] p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor4} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 pr-3 lg:pr-0 '>
                                        <h2 className='font-semibold'>John Holz</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>
                                        <p>	 	
                                            I am very grateful to massive-wealthfinance.com.ltd, I can earn a steady profit every day, 
                                            I can get payment instantly, 
                                            I can use it to pay for my doctoral tuition.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        
                    </Swiper>
                    <div className='gap-x-5 hidden'>

                        <div className="w-1/3">
                            <div className='transition-all duration-200  flex h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor1} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 '>
                                        <h2 className='font-semibold'>Kelly Smith</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>

                                        <p>	
                                            massive-wealthfinance.com is my most correct choice, I can get continuous income, 
                                            I will continue to invest in massive-wealthfinance.com, it will help me gain wealth freedom
                                        </p>
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/3">
                            <div className='transition-all duration-200  flex h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor2} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 '>
                                        <h2 className='font-semibold'>Anglo Matthew</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>

                                        <p>	
	
                                            massive-wealthfinance.com team is very professional, I have started to recommend to family, 
                                            friends, and build my own team, to get passive income.
                                        </p>
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/3">
                            <div className='transition-all duration-200  flex h-full p-5 rounded-lg bg-white dark:bg-slate-950 dark:text-white shadow-lg hover:bg-slate-900 cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black '>
                                <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                                    <img src={investor3} alt="" className='h-20 w-20 rounded-full'/>
                                </div>

                                <div className="28 grow">
                                    <div className='pl-3 '>
                                        <h2 className='font-semibold'>Kelvin Smith</h2>
                                        <div className='flex my-3'>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                            <AiFillStar className='text-primary'/>
                                        </div>

                                        <p>	
	
                                            massive-wealthfinance.com is a Great looking website with all the possible ways to trade and invest bitcoins all over the world with quick and massive profits also professional support!
                                        </p>
                                        
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Testimonial Content End */}
        </BaseLayout>
    );
}
