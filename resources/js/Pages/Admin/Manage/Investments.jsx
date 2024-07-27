import Modal from '@/Components/CustomModal';
import LoadingIndicator from '@/Components/LoadingIndicator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { BiCheck, BiTransferAlt } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import {FaMoneyBillTransfer} from 'react-icons/fa6';
import defaulAvatar from '@/Assets/Images/default.png';
import coverImage from '@/Assets/Images/forex.jpeg';
import { FaTimesCircle } from 'react-icons/fa';
import Pagination from '@/Components/Pagination';

export default function Dashboard({ auth }) {
    const [investments, setInvestments] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [pagination, setPagination] = useState([]);
    
    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        setProcessing(true)
        await axios.get(route('api.admin.fetch_investments'))
        .then((res) => {
            setInvestments(res.data.body.investments.data)
            setPagination(res.data.body.investments)
            setFetched(true);
            setProcessing(false)
        })
    }

    useEffect(() => {
    fetchStats();
    }, []);

    const paginateResult = (data)=>{
        setPagination(data.body.investments)
        setInvestments(data.body.investments.data);
    }

   


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
                <FaMoneyBillTransfer className={`h-5 w-5 dark:text-slate-400`} /> <span> Manage Investments </span>
            </h2>}
        >
            <Head title="Dashboard" />


            {/* Transaction Table */}
            <section className="my-4">
                <aside className="">
                    {/* Transaction History */}
                    <div className="bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 min-h-[200px]">
                        <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                            <span> <BiTransferAlt className="w-6 h-6 inline-block" /> All Investments History  </span>
                            <div>
                                Filter By: 
                            </div>
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                                    <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                        <tr>
                                           
                                            <th className="py-1 px-3 whitespace-nowrap">User</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Plan</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Amount Invested</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Profit</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Start Date/Time</th>
                                            <th className="py-1 px-3 whitespace-nowrap">End Date/Time</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                                    { (processing || !fetched) && (<tr>
                                            <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                                <LoadingIndicator type='dots' size={10} />
                                            </td>
                                        </tr>)}
                                    
                                    { (investments.length > 0 && !processing) && investments.map((investment) => (
                                        <tr key={investment.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                            <td className="px-2 py-2">{investment.user.firstname} {investment.user.lastname}</td>
                                            <td className="px-2 py-2">{investment?.plan?.name}</td>
                                            <td className="px-2 py-2">${investment.amount}</td>
                                            <td className="px-2 py-2">${parseFloat(investment?.profit).toFixed(2)}</td>
                                            <td className="px-2 py-2">{moment(investment.created_at).calendar()}</td>
                                            <td className="px-2 py-2">{moment(investment.expiry_date).calendar()}</td>
                                            <td className="px-2 py-2">
                                                {(investment.status == 'active' || investment.status == 'completed') && (<span className="text-xs flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-green-400 inline-block"></div> {investment.status}
                                                </span>)}
                                                {(investment.status == 'denied') && (<span className="text-xs flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-red-400 inline-block"></div> {investment.status}
                                                </span>)}
                                            </td>
                                        </tr>
                                    )) }
                                    { (investments.length == 0 && !processing) && (
                                        <tr className="odd:bg-red-50 dark:odd:bg-slate-800">
                                            <td className="px-2 py-2" colSpan={5}>
                                                <div className="flex flex-col items-center justify-center py-3">
                                                    <p className="mb-4">
                                                        
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) }
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </aside>

                {pagination && <div className="mt-3 flex justify-end">
                    <Pagination pageLimit={pagination.per_page} totalRecords={pagination.total} links={pagination.links} onPageResponse={(data) => paginateResult(data)} />
                </div>}
            </section>

           
        </AuthenticatedLayout>
    );
}
