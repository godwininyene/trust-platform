import CryptoWidget from '@/Components/CryptoWidget';
import PageBanner from '@/Components/PageBanner';
import BaseLayout from '@/Layouts/BaseLayout';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

export default function Welcome({ auth }) {
    const pageHeadInfo = {
        title: 'Frequetly Asked Questions',
        description: `We're building much more than just profits
        with all investments fully secured and good returns on your investments.`,
        action_caption: 'A truly profitable platform for your trading!',
    };

    const [ID, setID] = useState(null);
    const toggleID = ID=>setID(prevID=> prevID == null ? ID :null)
    const [questionsList, loadQuestions] = useState([]);

    useEffect(() => {
        fetchPayOption();
      }, [])
    
      let fetchPayOption = async () => {
        // setLoadOptionState(true);
        await axios.get(route('api.fetch_faqs'))
        .then((res) => {
        //   setLoadOptionState(false);
        //   setFetched(true);
          loadQuestions(res.data.body.faqs);
        })
        .catch((err) => {
        //   setLoadOptionState(false);
        });
      }
    return (
        <BaseLayout banner={<PageBanner page={pageHeadInfo} />}>
           <Head title="FAQS">
                <meta name="description" content="Trust Platform  Investments" />
                <meta name="keywords" content="Trust Platform, Trust Platform Investments, Crypto Investments" />
            </Head>

            <section className='py-12 lg:py-36  px-4 bg-dark-light overflow-hidden lg:px-0'>
        	    <div className="max-w-[1110px] mx-auto">
                    <div className='mb-16 text-center'>
                        <h2 className='text-4xl font-bold dark:text-white'>Frequetly Asked Questions</h2>
                    </div>

                    {/* FAQs Start */}
                    <div className='grid grid-cols-1  lg:grid-cols-2 gap-5'>
                        {
                            questionsList.map((question, i)=>(
                            <div key={question.id} className={`${i==0 ? 'border-b-0' : 'border-b'} border-b-slate-400 border-t border-t-slate-300 px-4 bg-dark rounded-md`} onClick={()=>toggleID(question.id)}>
                                <div className='py-5 relative cursor-pointer flex justify-between w-full'>
                                    <h3 className='text-xl font-medium dark:text-white flex-grow'>{question.question}</h3>
                                    {
                                        (ID !== question.id)?(
                                            <MdAddCircleOutline className='h-8 w-8 text-primary m-auto'/>
                                        ):(
                                            <AiOutlineClose className='h-7 w-7 text-primary m-auto'/>
                                        )
                                    }
                                </div>
                                <div className={`${ID== question.id ? 'block': 'hidden'}`}>
                                    <div className='pb-5'>
                                        <p className='text-text-dark'>
                                           {question.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                    {/* FAQs End */}
                </div>
            </section>
        </BaseLayout>
    );
}
