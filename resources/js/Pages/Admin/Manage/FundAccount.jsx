import LoadingIndicator from '@/Components/LoadingIndicator';
import defaulAvatar from '@/Assets/Images/default.png';
import coverImage from '@/Assets/Images/forex.jpeg';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineTransaction } from 'react-icons/ai';


const FundAccount = ({user, onBack, onFunded = () => Object}) => {
    
    let back = () => {
        onBack();
    }
    const [processing, setProcessing] = useState(false);
    const [message, setErrorMessage] = useState('');
    let submit = async (e) => {
        e.preventDefault();
        let form =  new FormData(e.target)
        setErrorMessage('')
        setProcessing(true);
        await axios.post(route('api.fund_user'), form)
        .then((res) => {
            if(res.data.success){
                alert(res.data.message)
                e.target.reset();
                setProcessing(false);              
                onFunded(res.data.body.user)
            }
        })
        .catch((err) => {
            setErrorMessage(err.response.data.message)
            setProcessing(false);
        });
    }

    return (
        <section>
            <div className="mb-4">
                <button onClick={() => back()} className="flex items-center gap-2 py-2 px-4 rounded-3xl bg-gradient-to-t from-primary to-primaryLight shadow-md text-slate-100 font-semibold">
                    <BiArrowBack className="h-6 w-6" /> Back
                </button>
            </div>

            {/*  */}
            <aside>
                <div className="grid grid-cols-1 md:grid-cols-5 max-w-4xl gap-4">
                    <section className="md:col-span-2">
                        <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md">
                            <div className="min-h-[150px] bg-cover rounded-t-md" style={{backgroundImage: `url(${coverImage})`}}>

                            </div>
                            { user && (<>
                                <div>
                                    <span className="mx-auto h-32 w-32 block -mt-20">
                                        <img src={(user.profile_photo_path && user.profile_photo_path != 'default.png') ? user.profile_photo_path : defaulAvatar} alt=" " className={`bg-slate-300 h-32 w-32 rounded-full overflow-hidden`} />
                                    </span>
                                    <section className="px-4 py-3 text-center">
                                        <h1 className="text-xl font-bold">
                                            { user.firstname } { user.lastname }
                                        </h1>
                                        <p className="text-sm font-semibold text-primary">
                                            { user.email }
                                        </p>
                                        <p className="text-sm capitalize">
                                            Status: 
                                            <span className={`ml-2 font-bold ${(user.approval_status == 'pending') ? 'text-orange-500' : (user.approval_status == 'approved') ? 'text-green-500' : 'text-red-500'}`}>
                                                {user.approval_status}
                                            </span>
                                        </p>

                                        <h2 className='mt-6'>Payment Channels/Bank Accounts</h2>
                                       <table className='w-full'>
                                        <thead className='bg-slate-50'>
                                            <th  className="py-1 px-3 text-sm">Name</th>
                                            <th  className="py-1 px-3 text-sm">Number</th>
                                            <th  className="py-1 px-3 text-sm">Bank</th>
                                            <th  className="py-1 px-3 text-sm">Type</th>

                                        </thead>
                                        <tbody>
                                            {
                                                (user?.bank_accounts?.length==0)&&
                                                <tr className="even:bg-teal-50">
                                                    <td className="whitespace-nowrap border py-1 px-4" colSpan="4">
                                                    <div className="flex items-center justify-center gap-5 w-full">
                                                        <span>No record available</span>
                                                    </div>
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                
                                                user?.bank_accounts?.map((account)=>(
                                                    <tr className='border-b'>
                                                        <td className='text-sm'>{account.account_name}</td>
                                                        <td className='text-sm'>{account.account_number}</td>
                                                        <td className='text-sm'>{account.bank_name}</td>
                                                        <td className='text-sm'>{account.account_type}</td>
                                                    </tr>
                                                ))
                                                
                                            }
                                        </tbody>
                                       </table>
  

                                        <div className="grid grid-cols-3 mt-6 border-y pb-1 pt-2 divide-x">
                                            {/* Action */}
                                            <aside>
                                                <h6>Balance</h6>
                                                ${user?.wallet?.balance}
                                            </aside>
                                            {/* Fund */}
                                            <aside>
                                                <h6>Profit</h6>
                                                ${user?.wallet?.profit}
                                            </aside>
                                            {/* Delete Account */}
                                            <aside>
                                                <h6>Referral Bal.</h6>
                                                ${user?.wallet?.referral_balance}
                                            </aside>
                                        </div>
                                    </section>
                                </div>
                            </>)}
                        </div>
                    </section>
                    <section className="md:col-span-3">
                        <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md py-3 px-4">
                            <form className='' method='post' onSubmit={submit}>
                                <input type="hidden" name="user_id" value={user.id} />
                                <div className="mb-5 relative">
                                    <label htmlFor="" className='text-sm block'>Choose Wallet to Fund</label>
                                    <select
                                        name="wallet_type" defaultValue="" required
                                        className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                    >
                                        <option value="" disabled>Select Wallet</option>
                                        <option value="balance">Balance</option>
                                        <option value="profit">Profit</option>
                                        <option value="referral_balance">Referral Balance</option>
                                    </select>
                                </div>
                                <div className="mb-5 relative">
                                    <label htmlFor="" className='text-sm block'>Enter Amount</label>
                                    <input
                                        type="number" 
                                        name="amount"  
                                        required placeholder="Enter amount"  
                                        className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </div>
                                <div className={`${message == '' ? 'mb-5' : 'mb-1'} relative`}>
                                    <label htmlFor="" className='text-sm block'>Funding Channel <small>(optional)</small> </label>
                                    <select
                                        name="channel" defaultValue="" 
                                        className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                    >
                                        <option value="" disabled>Select Wallet</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Bank Deposit">Bank Deposit</option>
                                        <option value="Paypal">Paypal</option>
                                    </select>
                                </div>
                                {message !== '' && <p className={'text-sm text-red-600 mb-2'}>
                                    {message}
                                </p>}
                                <div className='text-left'>
                                    <button disabled={processing} className='inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-4 py-3 transition-all duration-300 ease-in  text-white'>
                                        {processing ? <>
                                                <LoadingIndicator className="w-6 h-6"  /> Funding...
                                            </>
                                            : 
                                            <>
                                                <AiOutlineTransaction className="w-6 h-6"  /> Proceed with Funding
                                            </> 
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </aside>
        </section>
    )
}

export default FundAccount