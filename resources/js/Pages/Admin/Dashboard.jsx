import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {RxDashboard} from 'react-icons/rx';
import {BiWallet, BiMoneyWithdraw, BiCopy} from 'react-icons/bi';
import {FaMoneyBillTransfer, FaUsersLine} from 'react-icons/fa6';
import {BsCashCoin} from 'react-icons/bs';
import defaulAvatar from '@/Assets/Images/default.png';
import verifyBadge from '@/Assets/Images/verified_badge.png';
import SkeletonLoader from '@/Components/SkeletonLoader';
import { FaChartLine } from 'react-icons/fa';
import ToolTip from '@/Components/ToolTip';
import { useRef, useState, useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import FunnelChaart from '@/Components/Charts/FunnelChart';
import RadialBarCharts from '@/Components/Charts/RadialBarChartsDummy';
import GuageCharts from '@/Components/Charts/GuageCharts';
import { HiPresentationChartBar } from 'react-icons/hi';
import LoadingIndicator from '@/Components/LoadingIndicator';
import moment from 'moment/moment';

export default function Dashboard({ auth, wallet }) {
    // console.log(wallet);
    const [showTip, setShowTip] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [deposits, setDeposits] = useState();
    const [Withdrawal, setWithdraws] = useState();
    const [investments, setInvestments] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    // const reffVid = useRef();
    const reffid = useRef();
    const copyReffLink = () => {
        setShowTip(true);
        // document.
        reffid.current.select();
        navigator.clipboard.writeText( reffid.current.value)
        setTimeout(() => {
            setShowTip(false);
        }, 3000);
        console.log('copied link');
    }
    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        setProcessing(true)
        await axios.get(route('api.fetch_statistics'))
        .then((res) => {
            setTransactions(res.data.body.transactions);
            setDeposits(res.data.body.total_deposit);
            setWithdraws(res.data.body.total_withdraw);
            setInvestments(res.data.body.investments)
            setFetched(true);
            console.log(fetched);
            setProcessing(false)
        })
    }

    useEffect(() => {
      fetchStats();
      axios.get(route('api.fetch_referrals'))
        .then((res) => {
            // console.log(res.data.body);
        });
    }, [])

    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
                <RxDashboard className={`h-5 w-5`} /> <span> Dashboard </span>
            </h2>}
        >
            <Head title="Dashboard" />

            <section>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg py-2 px-3 shadow md:px-4 col-span-2 lg:col-span-2 lg:row-span-2">
                        <section className={`flex flex-col items-center md:flex-row gap-2 md:gap-4 md:items-start h-full py-3`}>
                            <aside className={`h-16 md:h-24 w-16 md:w-24 rounded-full shadow relative`}>
                                <img src={(auth.user.profile_photo_path && auth.user.profile_photo_path != 'default.png') ? auth.user.profile_photo_path : defaulAvatar} alt="" className={`h-16 md:h-24 w-16 md:w-24 rounded-full overflow-hidden`} />
                                {(auth.user.is_verified == true) && (<div className={`text-base absolute -bottom-2 -right-2 md:bottom-0 md:-right-1`}>
                                    {/* assumed the user is approve, */}
                                    {/* <img src={verifyBadge} className={`max-h-[30px]`} /> */}
                                    <MdVerified className={`h-7 w-7 text-blue-500 dark:text-blue-400`} />
                                </div>)}
                            </aside>
                            <aside className='md:mt-4 text-center md:text-left flex-grow w-full md:max-w-[300px]'>
                                <h1 className="text-xl md:text-3xl font-black">
                                    { auth.user.firstname } { auth.user?.lastname }
                                </h1>
                                <p className="mb-2 text-blue-600 dark:text-blue-400">
                                    { auth.user.email }
                                </p>
                                <div className="mb-4">
                                    <label htmlFor="refid" className="block text-sm text-left">Referral Link</label>
                                    <div className="flex h-8 w-full border rounded-md">
                                        <input type="text" ref={reffid} readOnly value={route('home') + '/register?refid=' + auth.user.account_id} className="flex-grow dark:text-slate-700 rounded-l-sm border-none outline-none ring-0 text-sm" /> 
                                        <button onClick={() => copyReffLink()} className="p-2 flex justify-center items-center bg-slate-200 relative">
                                            <div className={`absolute -top-9 ${!showTip && 'hidden'} text-sm right-0 py-1 px-3 rounded-t-lg rounded-bl-lg bg-blue-100`}>
                                                Copied
                                            </div>
                                            <BiCopy className="h-6 w-6 dark:text-slate-700" />
                                        </button>
                                    </div>
                                </div>
                                <div className={`flex gap-3 justify-center`}>
                                    <Link href={route('my_investments')} className={`border-teal-700 text-teal-700 dark:border-[#1bffcb] dark:text-[#1bffcb] border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                        <FaChartLine className={`h-5 w-5`} /> Investments
                                    </Link>
                                    <Link href={route('my_transactions')} className={`bg-primary text-white dark:bg-primaryLight inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                        <FaMoneyBillTransfer className={`h-5 w-5`} /> Transactions
                                    </Link>
                                </div>
                            </aside>
                        </section>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BiWallet className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm`}>
                                Account Balance
                            </p>
                            <h1 className={`font-black text-2xl mb-1 text-teal-600 dark:text-[#1bffcb]`}>
                                ${wallet.balance}
                            </h1>
                            <div className='text-xs '>
                                <Link href={``}>
                                    Current Balance Amount
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <FaUsersLine className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm text-primary`}>
                                Referral Balance
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${wallet.referral_balance}
                            </h1>
                            <div className='text-xs'>
                                {/* <Link href={route('manage_account')}>
                                    Check referrals on profile
                                </Link> */}
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BsCashCoin className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm text-primary`}>
                                Total Deposit
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${deposits ? deposits : 0}
                            </h1>
                            <div className='text-xs'>
                                <Link href={route('my_transactions')}>
                                    Click to see your transactions
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BiMoneyWithdraw className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm text-primary`}>
                                Total Accrued Profit
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${wallet.profit}
                            </h1>
                            <div className='text-xs'>
                                <Link href={route('my_investments')}>
                                    Manage my profile
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="my-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {(investments.length > 0) && investments.map((investment) =>(<aside key={investment.investment.id} className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3">
                        <h2 className="font-bold">
                            <HiPresentationChartBar className="h-7 w-7 inline-block" /> Active Investment Status :: <strong>{ `$${investment.investment.amount}` }</strong>
                        </h2>
                        {(processing && !fetched) ? <>
                            <div>
                                <LoadingIndicator type='dots' size={7}  />
                            </div>
                        </> : <>
                            {(investment && investment.investment != null) ? <div>
                                <GuageCharts percent={(investment.percentage).toFixed(2)} />
                                <section className="mt-4 flex text-sm justify-between items-center">
                                    <span>
                                        <p className="flex flex-col md:flex-row gap-x-1 mb-2"><strong>Start Date: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{ moment(investment.investment?.created_at).format('L LT') }</span> </p>
                                        <p className="flex flex-col md:flex-row gap-x-1"><strong>End Date: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{ moment(investment.investment?.expiry_date).format('L LT') }</span> </p>
                                    </span>
                                    <span>
                                        <p className="flex flex-col md:flex-row gap-x-1 mb-2"><strong>Total Duration: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{ investment.totalDuration } hours</span> </p>
                                        <p className="flex flex-col md:flex-row gap-x-1"><strong>TIme Remaining: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{investment.totalDuration - investment.currentLevel } hours</span> </p>
                                    </span>
                                </section>
                            </div> :
                            <div className='py-20 text-center text-sm'>
                                <p className="mb-4">No Active Investment found</p>
                                <Link href={route('my_investments')} className={`border-primary text-primary dark:border-primaryLight dark:text-primaryLight border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                    <FaChartLine className={`h-5 w-5`} /> Invest Now
                                </Link>
                            </div>
                            }
                        </>}
                        <div>

                        </div>
                    </aside>)
                    )}

                    {(investments.length == 0) && (<aside className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3">
                        <h2 className="font-bold">
                            <HiPresentationChartBar className="h-7 w-7 inline-block" /> Active Investment Status
                        </h2>
                        {(processing && !fetched) ? <>
                            <div>
                                <LoadingIndicator type='dots' size={7}  />
                            </div>
                        </> : <>
                            <div className='py-20 text-center text-sm'>
                                <p className="mb-4">No Active Investment found</p>
                                <Link href={route('my_investments')} className={`border-primary text-primary dark:border-primaryLight dark:text-primaryLight border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                    <FaChartLine className={`h-5 w-5`} /> Invest Now
                                </Link>
                            </div>
                        </>}
                        <div>

                        </div>
                    </aside>
                    )}

                    {(investments.length == 0 || investments.length == 1 || investments.length == 3 || investments.length == 5) && <aside className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3 flex items-center justify-center">
                        <FunnelChaart />
                    </aside>}
                </div>
            </section>


            
        </AuthenticatedLayout>
    );
}
