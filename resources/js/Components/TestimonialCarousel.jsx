import React,{useState, useEffect, useRef} from 'react'
import { register } from "swiper/element/bundle";
import investor1 from "@/Assets/Images/investor-1.jpg";
import investor2 from "@/Assets/Images/investor-2.jpg";
register();

const TestimonialCarousel = () => {

    const swiperRef = useRef(null);
   
    useEffect(() => {
      const swiperContainer = swiperRef.current;
      const params = {
        navigation: false,
        pagination: true,
        autoplay:true,
        spaceBetween:20,
        slidesPerView: 2,
        breakpoints:{
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
             // when window width is >= 0px
            0: {
                slidesPerView: 1,
              },
          },
        injectStyles: [
            `
              .swiper-button-next,
              .swiper-button-prev {
                background-color: white;
                padding: 8px 16px;
                color:#2a7ea3;
              }
              .swiper-pagination-bullet{
                width: 10px;
                height: 10px;
                
                background-color: #2a7ea3;
              }
          `,
          ],
      };
  
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    }, []);



  return (
    <div>
        <swiper-container ref={swiperRef} init="false">

            <swiper-slide>
                <div className='rounded-2xl border py-5 border-slate-300 flex flex-col px-7 mx-auto bg-dark'>
                    <div className='py-3'>
                        <div className=''>
                            <div className='mb-3'>
                                <h1 className='heading-primary text-[25px] leading-[30px]  font-semibold text-white'>Reliable and Profitable</h1>
                            </div>
                            <p className='text-text-dark'>
                                I've been trading on this platform for over a year, and it has consistently
                                delivered excellent results. The security features give me peace of mind, 
                                and the automated trading bots have maximized my profits effortlessly. 
                                Highly recommended!
                            </p>
                        </div>
                        <div className='max-w-full h-[1px] my-7 bg-slate-300'></div>

                        <div className='flex gap-4 items-center'>
                            <div className='h-20 w-20 overflow-hidden rounded-full'>
                                <img src={investor1} alt="" className='min-h-full min-w-full rounded-full object-cover'/>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-white'>Kellan Aldor</p>
                                <p className='text-sm font-medium text-gray-400'>March 10th, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide> 

            <swiper-slide>
                <div className='rounded-2xl border py-5 border-slate-300 flex flex-col px-7 mx-auto bg-dark'>
                    <div className='py-3'>
                        
                       
                        <div className=''>
                            <div className='mb-3'>
                                <h1 className='heading-primary text-[25px] leading-[30px]  font-semibold text-white'>Exceptional Trading Platform</h1>
                            </div>
                            <p className='text-text-dark'>
                                Using this platform has been a game-changer for me. The user interface is intuitive, 
                                and the customer support is outstanding. I’ve seen significant returns on my investments, 
                                and the real-time analytics tools have helped me make informed decisions
                            </p>
                        </div>
                        <div className='max-w-full h-[1px] my-7 bg-slate-300'></div>

                        <div className='flex gap-4 items-center'>
                            <div className='h-20 w-20 overflow-hidden rounded-full'>
                                <img src={investor2} alt="" className='min-h-full min-w-full rounded-full object-cover'/>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-white'>Antony Morenio</p>
                                <div>
                                    <p className='text-sm font-medium text-gray-400'>January 30th, 2024</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </swiper-slide>
        </swiper-container>
    </div>
  )
}

export default TestimonialCarousel