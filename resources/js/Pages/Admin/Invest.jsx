import LoadingIndicator from '@/Components/LoadingIndicator';
import { Head } from '@inertiajs/react';
import React, {useEffect, useState} from 'react'
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi'

const Invest = ({onBack, wallet, onInvestComplete }) => {
    const [loadingPlans, setPlanState] = useState(false);
    const [plans, loadPlans] = useState([]);
    const [selectedPlan, setSelectPlan] = useState();
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [message, setErrorMessage] = useState('');
    const [amount, setAmount] = useState();

    let back = () => {
        onBack();
    }

    useEffect(() => {
        fetchPlan();
    }, [])
    
    let fetchPlan = async () => {
        setPlanState(true);
        await axios.get(route('api.fetch_plans'))
        .then((res) => {
            setPlanState(false);
            setFetched(true);
            loadPlans(res.data.body.plans);
        })
        .catch((err) => {
            setPlanState(false);
        });
    }

    let invest = async (e) => {
        e.preventDefault();
        if(!selectedPlan){
            alert("Please select a plan first");
            return;
        }
        
        if(wallet.balance < amount){
            alert("Insuficient wallet balance. Please enter amount $" + wallet.balance + ", or fund your wallet to continue.");   
            return;
        }
        
        if(amount < selectedPlan.min_deposit){
            console.log(amount, selectedPlan, 'Complained Minimum Deposit');
            alert("Please, the selected plan requires a minimum deposit amount of $" + selectedPlan.min_deposit);
            return;
        }else if(amount > selectedPlan.max_deposit){
            console.log(amount, selectedPlan, 'Complained maximum Deposit');
            alert("Please, you can't invest more than $" + selectedPlan.max_deposit + " on the selected plan");
            return;
        }
        console.log(amount, selectedPlan, 'No Deposit Complained');
        
        setProcessing(true);
        let form = new FormData(e.target)
        await axios.post(route('api.make_investment', {plan_id: selectedPlan.id, amount: amount}))
        .then((res) => {
            setProcessing(false);
            alert("Successfully Invested")
            onInvestComplete();
        })
        .catch((err) => {
            setProcessing(false);
        });

    }

    return (
        <section>
            <Head title="Invest" />
            <div className="mb-4">
                <button onClick={() => back()} className="flex items-center gap-2 py-2 px-4 rounded-3xl bg-gradient-to-t from-primary to-primaryLight shadow-md text-slate-100 font-semibold">
                    <BiArrowBack className="h-6 w-6" /> Back
                </button>
            </div>

            <form onSubmit={invest}>
                <aside>
                    <h2 className="text- font- my-4">
                        <span className="font-bold">Click</span> or <span className="font-bold">Tap</span> on an investment plan to select it, and enter the amount to invest below;
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        {fetched ? <section className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {plans.length > 0 && plans.map((plan, index) => (
                            <aside key={plan.id}>
                                <input type="radio" name="plan_id" id={`plan${plan.id}`} value={plan.id} onChange={() => setSelectPlan(plan)} className="hidden" />
                                <label htmlFor={`plan${plan.id}`} role="button" className={`${(selectedPlan?.id == plan.id) && 'border border-blue-500'} bg-white dark:bg-slate-800 block enabled:bg-black py-2 px-4 rounded-lg shadow-lg h-full`}>
                                    <h1 className="font-bold py-1 relative">
                                        {plan.name ? plan.name : `Plan ${index + 1}`}
                                        <div className="w-10 h-10 rounded-full border-[3px] border-primaryLight bg-white text-black ml-auto flex items-center justify-center text-sm md:text-base p-6 font-black absolute -top-4 right-0">{plan.percentage}%</div>
                                    </h1>
                                    <h3 className="text-primary text-xl font-semibold">
                                        After {plan.mining_duration} {plan.timing_parameter}
                                    </h3>
                                    <ul className="divide-y">
                                        <li>
                                            Min. Deposit - <strong>${plan.min_deposit}</strong>
                                        </li>
                                        <li>
                                            Max. Deposit - <strong>${plan.max_deposit}</strong>
                                        </li>
                                        <li>
                                            Referral Bonus - <strong>{plan.ref_bonus}%</strong>
                                        </li>
                                    </ul>
                                </label>
                            </aside>))}
                        </section> 
                        :
                        <section className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <aside>
                                <label role="button" className={`bg-white dark:bg-slate-800 block enabled:bg-black py-2 px-4 rounded-lg shadow-lg h-full`}>
                                    <h1 className="font-bold py-1 relative h-5 animate-pulse">
                                        <div className="w-10 h-10 rounded-full border-[3px] border-primaryLight bg-white text-black ml-auto flex items-center justify-center text-lg p-6 font-black absolute -top-4 right-0">%</div>
                                    </h1>
                                    <h3 className="text-primary text-xl font-semibold h-5 animate-pulse">
                                        
                                    </h3>
                                    <ul className="divide-y h-5 animate-pulse">
                                        <li>
                                            Min. Deposit 
                                        </li>
                                        <li>
                                            Max. Deposit - 
                                        </li>
                                        <li>
                                            Referral Bonus - 
                                        </li>
                                    </ul>
                                </label>
                            </aside>
                        </section>
                        }
                        <section className="md:col-span-2 sticky top-[30%]">
                            <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md py-3 px-4">
                            <div className="mb-5 relative">
                                    <label htmlFor="" className='text-sm block'>Available Balance</label>
                                    <input
                                        type="text" 
                                        name="balance" 
                                        readOnly 
                                        value={`$${wallet?.balance ? wallet.balance : 0}`}
                                        className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </div>
                                <div className="mb-5 relative">
                                    <label htmlFor="" className='text-sm block'>Enter Amount</label>
                                    <input
                                        type="number" 
                                        name="amount"  
                                        required placeholder="Enter amount"  
                                        onChange={(e) => setAmount(e.target.value)} 
                                        className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </div>
                                {message !== '' && <p className={'text-sm text-red-600 mb-2'}>
                                    {message}
                                </p>}
                                <div className='text-left'>
                                    <button disabled={processing} className='inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-4 py-3 transition-all duration-300 ease-in  text-white'>
                                        {processing ? <>
                                                <LoadingIndicator className="w-6 h-6"  /> Investing...
                                            </>
                                            : 
                                            <>
                                                <AiOutlineTransaction className="w-6 h-6"  /> Invest Now
                                            </> 
                                        }
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </aside>
            </form>

        </section>
    )
}

export default Invest