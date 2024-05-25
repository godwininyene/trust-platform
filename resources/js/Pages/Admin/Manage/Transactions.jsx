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

export default function Dashboard({ auth }) {
    const [transactions, setTransactions] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [approving, setApproving] = useState(false);
    const [declining, setDeclining] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(false);

    console.log(transactions);
    
    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        setProcessing(true)
        await axios.get(route('api.admin.fetch_transactions'))
        .then((res) => {
            setTransactions(res.data.body.transactions.data);
            setFetched(true);
            setProcessing(false)
        })
    }

    useEffect(() => {
    fetchStats();
    }, []);

    let approve = async (transaction_id) => {
        setApproving(true)
        await axios.post(route('api.approve_transaction'), {transaction_id: transaction_id})
        .then((res) => {
            setTransactions(res.data.body.transactions.data);
            setApproving(false);
        })
        .catch((err) => {
            alert(err.response.data.message);
            setApproving(false);
        });
    }

    let decline = async (transaction_id) => {
        setDeclining(true)
        await axios.post(route('api.decline_transaction'), {transaction_id: transaction_id})
        .then((res) => {
            setTransactions(res.data.body.transactions.data);
            setDeclining(false);
        })
        .catch((err) => {
            alert(err.response.data.message);
            setDeclining(false);
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
                <FaMoneyBillTransfer className={`h-5 w-5 dark:text-slate-400`} /> <span> Manage Transactions </span>
            </h2>}
        >
            <Head title="Dashboard" />


            {/* Transaction Table */}
            <section className="my-4">
                <aside className="">
                    {/* Transaction History */}
                    <div className="bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 min-h-[200px]">
                        <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                            <span> <BiTransferAlt className="w-6 h-6 inline-block" /> All Transaction History  </span>
                            <div>
                                Filter By: 
                            </div>
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                                    <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                        <tr>
                                            <th className="py-1 px-3 w-20"></th>
                                            <th className="py-1 px-3 whitespace-nowrap">User</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Type</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Amount</th>
                                            <th className="py-1 px-3 whitespace-nowrap">status </th>
                                            <th className="py-1 px-3 whitespace-nowrap">Date</th>
                                        </tr>
                                    </thead>

                                    <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                                    { (processing || !fetched) && (<tr>
                                            <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                                <LoadingIndicator type='dots' size={10} />
                                            </td>
                                        </tr>)}
                                    
                                    { (transactions.length > 0 && !processing) && transactions.map((transaction) => (
                                        <tr key={transaction.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                            <td className="px-2 py-2 whitespace-nowrap">
                                                <button className='bg-blue-500 text-white py-1 px-2 rounded-md' onClick={() => {setSelectedTransaction(transaction); setDetailModal(true);}}>
                                                    <BsEye className="w-5 h-4 font-bold" />
                                                </button>
                                                <button className='bg-green-500 ml-1 text-white py-1 px-2 rounded-md' onClick={() => {setSelectedTransaction(transaction); approve(transaction.id);}}>
                                                    { (approving && selectedTransaction.id == transaction.id) ? <LoadingIndicator size={5} /> : <BiCheck className="w-5 h-4 font-bold" /> }
                                                </button>
                                            </td>
                                            <td className="px-2 py-2">{transaction.user.firstname} {transaction.user.lastname}</td>
                                            <td className="px-2 py-2">{transaction.type}</td>
                                            <td className="px-2 py-2">${transaction.amount}</td>
                                            <td className="px-2 py-2">
                                                <span className={`${transaction.status == 'success' ? 'text-green-500 dark:text-teal-400' : (transaction.status == 'pending' ? 'text-orange-500 dark:text-orange-300' : 'text-red-500 dark:text-red-300')}`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="px-2 py-2">{ moment(transaction.created_at).calendar() }</td>
                                        </tr>
                                    )) }
                                    { (transactions.length == 0 && !processing) && (
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
            </section>

            {/* Deposit Modal */}
            <Modal show={detailModal} maxWidth="md" onClose={() => setDetailModal(false)} backDrop={false}>
                {/* Transaction Details */}
                <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md">
                    <div className="min-h-[150px] bg-cover md:rounded-t-md" style={{backgroundImage: `url(${coverImage})`}}>

                    </div>
                    { selectedTransaction && (<>
                        <div>
                            <span className="mx-auto h-32 w-32 block -mt-32">
                                <img src={(selectedTransaction?.user.profile_photo_path && selectedTransaction?.user.profile_photo_path != 'default.png') ? selectedTransaction?.user.profile_photo_path : defaulAvatar} alt=" " className={`bg-slate-300 h-32 w-32 rounded-full overflow-hidden`} />
                            </span>
                            <section className="px-4 pt-3 text-center">
                                <h1 className="text-xl font-bold">
                                    { selectedTransaction?.user?.firstname } { selectedTransaction?.user?.lastname }
                                </h1>
                                <p className="text-sm font-semibold text-primary mb-2">
                                    { selectedTransaction?.user?.email }
                                </p>
                            </section>
                            {/* User Information */}
                            <section className="text-left">
                                <h2 className="py-2 px-4 font-semibold border-b bg-primary bg-opacity-20 flex justify-between">
                                    <span>Transaction Details</span>
                                    <span className="flex items-center gap-2">
                                        { selectedTransaction.status != 'success' && <button className="text-sm text-green-500" onClick={() => {setSelectedTransaction(selectedTransaction); approve(selectedTransaction.id);}}>
                                            { (approving) ? <LoadingIndicator size={5} /> : <><BiCheck className="inline-block h-5 w-5" /> Approve </> }
                                        </button> }
                                        { selectedTransaction.status != 'failed' && <button className="text-sm text-red-500" onClick={() => {setSelectedTransaction(selectedTransaction); decline(selectedTransaction.id);}}>
                                            { (declining) ? <LoadingIndicator size={5} /> : <><FaTimesCircle className="inline-block h-5 w-5" /> Decline</> }
                                        </button> }
                                    </span>
                                </h2>
                                <ul className="px-4 pt-1 pb-3 grid md:grid-cols-2 gap-4 md:max-h-[250px] overflow-y-auto">
                                    <li className="flex items-center gap-3 text-sm">
                                        <div>
                                            <h3 className="font-semibold">
                                                Transaction Type
                                            </h3>
                                            <span>
                                                {selectedTransaction.type}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div>
                                            <h3 className="font-semibold">
                                                Transaction Amount
                                            </h3>
                                            <span>
                                                ${selectedTransaction.amount}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div>
                                            <h3 className="font-semibold">
                                                Transaction Status
                                            </h3>
                                            <span className={`${selectedTransaction.status == 'success' ? 'text-green-500 dark:text-teal-400' : (selectedTransaction.status == 'pending' ? 'text-orange-500 dark:text-orange-300' : '')}`}>
                                                {selectedTransaction.status}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div>
                                            <h3 className="font-semibold">
                                                Transaction Date
                                            </h3>
                                            <span>
                                                {  moment(selectedTransaction.created_at).calendar() }
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm col-span-2">
                                        <div>
                                            <img src={selectedTransaction.image } alt=" " className={`bg-slate-300 w-full rounded-md overflow-hidden`} />
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </>)}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
