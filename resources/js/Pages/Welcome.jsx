import CryptoWidget from '@/Components/CryptoWidget';
import HomeBanner from '@/Components/HomeBanner';
import BaseLayout from '@/Layouts/BaseLayout';
import coverImg from '@/Assets/Images/about_dark.png';
import { Link, Head } from '@inertiajs/react';
import { MdManageAccounts } from 'react-icons/md';
import {IoIosHeadset} from 'react-icons/io';
import { FaBookReader, FaCheckCircle } from "react-icons/fa";
import { SiCoinmarketcap } from "react-icons/si";
import { CiViewTimeline } from "react-icons/ci";
import {GiTrade} from 'react-icons/gi'
import peoples3 from '@/Assets/Images/referral_bg.jpg';

import ctabg from '@/Assets/Images/bg2.png';
import feature0 from '@/Assets/Images/features01.png';
import group2 from '@/Assets/Images/refferal_2.png';
import React from 'react';
import TestimonialCarousel from '@/Components/TestimonialCarousel';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';


export default function Welcome({ auth }) {
    const [plans, setPlans] = React.useState(null);
  

    const getPlans = async ()=>{
       try {
            const res = await axios.get(route(`api.fetch_plans`));
            const plans = res.data.body.plans;
            setPlans(plans)

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(()=>{
        getPlans();
    },[]);

        const widthrawals =
        [
            {
                id:0,
                name:"Tyrnan",
                amount:"$5,200",
            },

            {
                id:1,
                name:"Monae",
                amount:"$4,899",
            },

            {
                id:2,
                name:"Vladislav",
                amount:"$500",
            },

            {
                id:3,
                name:"Michael-Jame",
                amount:"$3,500",
            },

            {
                id:4,
                name:"Yusuf",
                amount:"$3,000",
            },

            {
                id:5,
                name:"Esteban",
                amount:"$4,000",
            },

            {
                id:6,
                name:"Brian",
                amount:"$2,000",
            },

            {
                id:7,
                name:"Dregan",
                amount:"$2,550",
            },

            {
                id:8,
                name:"Woodard",
                amount:"$967",
            },

            {
                id:9,
                name:"Lorenz",
                amount:"$805",
            },
        ]
    ;


    const deposits = [
        {
            id:0,
            name:"Alexzander",
            amount:"$1,932",
        },

        {
            id:1,
            name:"Reegan",
            amount:"$787",
        },

        {
            id:2,
            name:"Michaella",
            amount:"$500",
        },

        {
            id:3,
            name:"Andreas",
            amount:"$700",
        },

        {
            id:4,
            name:"Clinto",
            amount:"$1,000",
        },

        {
            id:5,
            name:"Mark",
            amount:"$700",
        },

        {
            id:6,
            name:"Morenio",
            amount:"$2,000",
        },

        {
            id:7,
            name:"John",
            amount:"$1,600",
        },

        {
            id:8,
            name:"Marvin",
            amount:"$2,000",
        },

        {
            id:9,
            name:"Robbi",
            amount:"$1,000",
        },

    ]

    const[startIndex, setStartIndex] = useState(0);

    const [displayDeposits, setDisplayDeposits] = useState([]);

    const [displayWithdrawals, setDisplayWithdrawals] = useState([]);

    useEffect(() => {
        const shuffleDeposits = () => {
          const shuffled = deposits.sort(() => Math.random() - 0.5);
          const shuffledWithdrawal = widthrawals.sort(() => Math.random() - 0.5);
          setDisplayDeposits(shuffled.slice(0, 5));
          setDisplayWithdrawals(shuffledWithdrawal.slice(0,5));
        };
    
        shuffleDeposits(); // Initial shuffle
        const interval = setInterval(shuffleDeposits, 4000); // Shuffle every 5 seconds
    
        return () => clearInterval(interval); // Cleanup on component unmount
      }, []);

   

    return (
        <BaseLayout banner={<HomeBanner />}>
            <Head title="Trust Platform">
                <meta name="description" content="Trust Platform  Investments" />
                <meta name="keywords" content="Trust Platform, Trust Platform Investments, Crypto Investments" />
            </Head>

            <CryptoWidget />
           

            {/*Section About Start */}
            <section className='py-12 lg:py-20 px-4 lg:px-0 bg-dark overflow-hidden'>
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
            <section className='bg-dark-light py-12 lg:py-20 px-4 lg:px-0 overflow-hidden'>
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap flex-col lg:flex-row">

                        {/* Left Hand Contents */}
                        <div className='w-full lg:w-2/4 relative order-1 lg:order-none lg:pr-24'>
                            <div className=''>
                                <div className='mb-12'>
                                    <div className='mb-5'data-aos="fade-right" data-aos-delay="300"  data-aos-duration="800" >
                                        <h1 className='heading-primary text-[36px] mt-14 md:mt-0 leading-[40px] font-black text-white'><span className='text-primary'>Benefits</span> We Offer</h1>
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

            {/*Section Services Start */}
            <section className='py-12 lg:py-20 px-4 lg:px-0 bg-dark overflow-hidden'>
        	    <div className="max-w-6xl mx-auto">
                    <div className='mb-16 text-center max-w-2xl mx-auto'>
                        <h2 className='mb-3 font-black text-5xl text-white'><span className='text-primary'>Services </span> we offer</h2>
                        <p className='text-text-dark text-lg'>
                            Experience seamless cryptocurrency trading with secure transactions, 
                            expert support, and powerful analytical tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


                        <div className='p-3'>
                            <div className='text-center bg-dark-light  p-7 rounded-xl cursor-pointer service_card border-2 border-transparent' data-aos='fade-up' data-aos-duration='800'>
                                <GiTrade className='text-6xl text-slate-500  inline-block' />
                                
                                <h5 className='font-semibold text-xl text-white transition-all duration-150 mt-3'>Secure Wallet Management:</h5>
                                <p className='mt-6 text-text-dark'>
                                    Protect your digital assets with our state-of-the-art wallet management system, 
                                    ensuring your cryptocurrencies are stored safely and securely with advanced 
                                    encryption and multi-factor authentication for ultimate peace of mind.
                                </p>

                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='text-center bg-dark-light p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='900'>
                                <SiCoinmarketcap className='text-6xl text-slate-500 inline-block ' />
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Real-Time Market Analysis</h5>
                                
                                <p className='mt-6 text-text-dark'>
                                    Stay ahead of the curve with our real-time market analysis tools, 
                                    offering comprehensive data, insights, and trends to help you make 
                                    informed trading decisions and maximize your investments.
                                </p>

                            </div>
                        </div>
                        
                        <div className='p-3'>
                            <div className='text-center bg-dark-light p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='1000'>
                                <MdManageAccounts className='text-6xl text-slate-500  inline-block' />
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Segregated Account</h5>
                                <p className='mt-6 text-text-dark'>
                                    We value our clients' funds. With our segregated account, clients'
                                    funds are kept safe in top tier global bank. 
                                    Our Finance Team is here to process clients’ transactions promptly, and safely.
                                </p>

                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='text-center bg-dark-light p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='1100'>
                                <FaBookReader className='text-6xl text-slate-500  inline-block' />
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Educational Resources</h5>
                                <p className='mt-6 text-text-dark'>
                                    Enhance your trading knowledge with our extensive library of educational 
                                    resources, including tutorials, webinars, and articles designed 
                                    to help both beginners and experienced traders succeed in the
                                    cryptocurrency market.
                                </p>

                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='text-center bg-dark-light p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='1200'>
                                <CiViewTimeline className='text-6xl text-slate-500  inline-block' />
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Trading Expertise</h5>
                                <p className='mt-6 text-text-dark'>
                                    To deliver the best trading experience and cutting-edge technologies, 
                                    Trust Platform has partnered with corporations and institutions in over 
                                    10 countries.
                                </p>

                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='text-center bg-dark-light p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='1300'>
                                <IoIosHeadset className='text-6xl text-slate-500  inline-block' />
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Quality Support Team</h5>
                                <p className='mt-6 text-text-dark'>
                                    The team processes clients transactions in compliance with regulations such as AML and CFT.
                                    Join us today and ascend on the next stage of international market with us.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Section Services End */}


            {/*plan Content Start */}
            <section className='py-12 lg:py-24 bg-dark-light px-4 lg:px-0'>
                <div className='max-w-6xl mb-5 mx-auto text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-black text-white'>Our <span className='text-primary'>Investment</span> Plans</h2>
                    <p className='text-center text-text-dark text-xl mt-3 mb-10 md:mb-20 w-[70%] ml-[15%] '>
                        We provide top-tier investment plans with swift returns and complete security.
                        All investments are fully insured for your peace of mind.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className='gap-x-5 gap-y-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                       {
                        plans && plans.map((plan, i)=>(
                            <div key={plan.id} className='mt-2'>
                            <div className='h-full bg-dark rrelative border-[3px] border-primary rounded-xl px-5 pb-3' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                <div className='h-16 w-16 rounded-full border-[3px] border-primary mx-auto flex items-center justify-center text-4xl font-black bg-white relative -top-10'>{i + 1}</div>
                                <div className="w-12 h-12 rounded-full border-[3px] border-primary  bg-white text-black   mx-auto flex items-center justify-center text-2xl p-7 font-black relative -top-14 left-5">{plan.percentage}%</div>
                                <div className='pb-3 px-2'>
                                    <h3 className='uppercase text-xl font-semibold text-white'>
                                        {plan.name}
                                    </h3>
                                    <h3 className='uppercase text-2xl font-semibold mb-5 text-primary'>
                                        After {plan.mining_duration + " "+ plan.timing_parameter}
                                    </h3>
                                
                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Minimum Deposit - ${plan.min_deposit.toLocaleString()}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Maximum Deposit - ${plan.max_deposit.toLocaleString()}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Referral Bonus - {plan.ref_bonus}%</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Principal Return -  {plan.return_principal ? 'Yes' : 'No'}</small>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='px-2 pb-4'>
                                    <Link href='register' className={`text-primary w-full inline-block text-center font-semibold border ${plan.name =='Gold' ? 'bg-primary text-white hover:bg-transparent hover:text-primary' : 'bg-transparent'} border-primary rounded-lg py-4 px-8 transition-all duration-300 hover:bg-primary hover:text-black`}>Get Started</Link>
                                </div>
                            </div>
                        </div>
                        ))
                       }

                    </div>
                </div>
            </section>
            {/*plan Content End */}

            {/* Section Last Transaction Start  */}
            <section className='py-12 lg:py-24 bg-dark  px-4 lg:px-0'>
                <div className='max-w-6xl mb-5 mx-auto dark:text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-black text-white'><span className='text-primary'>Deposits</span> and <span className='text-primary'>Withdrawal</span></h2>
                    <p className='text-center text-text-dark text-xl mt-3 mb-10 md:mb-20 w-[70%] ml-[15%] '>
                        We offer accurate statistics that anyone can verify.
                        Below, you'll find the most recent five deposit and withdrawal
                        transactions completed by our members.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                        <div className='bg-dark-light px-4 py-3 rounded-md'>
                            <h1 className="text-lg font-semibold mb-4 border-b text-primary">
                                Recent Deposits
                            </h1>

                            {
                                displayDeposits.map((item, i)=>(
                                    <div key={item.id} className='flex items-center my-7 border-b pb-2'>
                                        <div className='h-10 w-10 rounded-full border-[3px] border-primary flex items-center justify-center text-xl font-black bg-white'>{i + 1}</div>
                                        <div className='text-white px-5 py-2 bg-dark ml-auto'>{item.name}</div>
                                        <div className='text-white px-5 py-2 bg-dark ml-auto'>{item.amount}</div>
                                    </div>
                                ))
                            }

                        </div>

                        <div className='bg-dark-light px-4 py-3 rounded-md'>
                            <h1 className="text-lg font-semibold mb-4 border-b text-primary">
                                Recent Withdrawals
                            </h1>
                            {
                                displayWithdrawals.map((item,i)=>(
                                    <div key={item.id} className='flex items-center my-7 border-b pb-2'>
                                        <div className='h-10 w-10 rounded-full border-[3px] border-primary flex items-center justify-center text-xl font-black bg-white'>{i + 1}</div>
                                        <div className='text-white px-5 py-2 bg-dark ml-auto'>{item.name}</div>
                                        <div className='text-white px-5 py-2 bg-dark-light ml-auto'>{item.amount}</div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
            </section>
            {/* Section Last Transaction End  */}

            {/* CTA Start  */}
            <section className='py-12 lg:py-24 px-4 lg:px-0' style={{backgroundImage:`url(${ctabg})`}}>
                <div className="max-w-6xl mx-auto">
                    <div className='flex'>
                        <div className='md:w-[58.3333%] px-3'>
                            <div className=''>
                                <h2 className='text-white text-5xl font-black mb-2'>Trust <span className='text-primary'>Platform</span> Trading</h2>
                                <h3 className='mb-2 text-white font-medium text-2xl'>Skyrocket Your Crypto Trading with Us!</h3>
                                <div className='mt-12 flex gap-x-3'>
                                    <Link href='register' className='inline-block text-center text-sm md:text-base font-semibold border border-primary rounded-xl py-2 md:py-4 px-2 md:px-8 transition-all duration-300 bg-primary text-white hover:bg-transparent'>Get Started</Link>
                                    <Link href='contact-support' className='text-primary  inline-block text-center font-semibold border border-primary rounded-xl  py-2 md:py-4 px-2  md:px-8 transition-all duration-300 hover:bg-primary hover:text-black'>Contact Us</Link>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
            {/* CTA End  */}

            {/* Section Get Started Start */}
            <section className="overflow-hidden bg-cover bg-fixed bg-dark" >
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

            {/* Testimonial Content Start */}
             <section className='py-12 lg:py-24 bg-dark-light px-4 lg:px-0'>
                <div className='max-w-6xl mx-auto text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='uppercase text-3xl md:text-4xl font-bold'>Hear From <span className='text-primary'>Our Investors</span></h2>
                    <p className='text-xl mt-3 mb-10 md:mb-20 text-text-dark max-w-2xl'>
                        We enjoy engaging with our clients to learn about their experiences and find ways to improve.
                    </p>
                </div>

                <div className='max-w-6xl mx-auto  pb-10'>
                   <TestimonialCarousel />
                </div>
            </section>
            {/* Testimonial Content End */}
        </BaseLayout>
    );
}
