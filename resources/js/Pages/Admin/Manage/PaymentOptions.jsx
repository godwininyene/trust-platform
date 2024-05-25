import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/CustomModal';
import LoadingIndicator from '@/Components/LoadingIndicator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BiEditAlt, BiSave, BiTrashAlt, BiWallet } from 'react-icons/bi';
import { BsBank, BsEye, BsEyeSlash } from 'react-icons/bs';
import { GiBank } from 'react-icons/gi';
import { ImPieChart } from 'react-icons/im';

const InvestmentPlans = ({auth}) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [loadingPlans, setLoadOptionState] = useState(false);
  const [payOptions, loadPayOptions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchPayOption();
  }, [])

  let fetchPayOption = async () => {
    setLoadOptionState(true);
    await axios.get(route('api.admin.fetch_payment_options'))
    .then((res) => {
      setLoadOptionState(false);
      setFetched(true);
      loadPayOptions(res.data.body.pay_options);
    })
    .catch((err) => {
      setLoadOptionState(false);
    });
  }

  let submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    let form = new FormData(e.target);
    await axios.post(route('api.add_payment_option'), form)
    .then((res) => {
      setProcessing(false);
      loadPayOptions(res.data.body.pay_options);
      e.target.reset();
    })
    .catch((err) => {
      setProcessing(false);
      setError(err.response.data.message);
    });
  }

  let updateOption = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    let form = new FormData(e.target);
    await axios.post(route('api.update_pay_option'), form)
    .then((res) => {
      setProcessing(false);
      loadPayOptions(res.data.body.pay_options);
      setEditModal(false);
      e.target.reset();
    })
    .catch((err) => {
      setProcessing(false);
      setError(err.response.data.message);
    });
  }

  let deleteOption = async (option) => {
    setDeleting(true);
    await axios.delete(route('api.delete_payment_option', {option_id: option.id}))
    .then((res) => {
      setDeleting(false);
      loadPayOptions(res.data.body.pay_options);
      setEditModal(false);
    })
    .catch((err) => {
      setDeleting(false);
    });
  }

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
                <BsBank className={`h-5 w-5`} /> <span> Payment Options </span>
            </h2>}
        >
          <Head title="Investment Plans" />
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-5xl">
                <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                    <h1 className="text-lg font-semibold mb-4 border-b">
                        Add New Payment Option
                    </h1>
                    <form method="post" onSubmit={submit} encType="multipart/form-data">
                        <div className="mb-5 relative">
                            <label htmlFor="pay_option" className='text-sm block'> Payment Option </label>
                            <select
                                    name="pay_option" defaultValue="" required
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                >
                                <option value="bank">Bank</option>
                                <option value="mobile wallet">Mobile Wallet</option>
                                <option value="crypto wallet">Crypto Wallet</option>
                            </select>
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="bank" className='text-sm block'> Bank Name/Wallet </label>
                            <input type="text" name="bank" placeholder="Enter Bank Name or Wallet"  
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="account_number" className='text-sm block'> Account Number / Wallet Address </label>
                            <input type="text" name="account_number" placeholder="Enter Account Number or Wallet Address"  
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <div className="grid grid-cols-2 items-start gap-4">
                                <aside>
                                    <label htmlFor="image" className='text-sm block'>Image/Barcode </label>
                                    <input type="file" id='image' name="image" placeholder="Upload Image/Barcode" accept="image"
                                        className='peer w-full py-3 px-1 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                                <aside>
                                    <label htmlFor="extra" className='text-sm block'>Extra Info <small>(optional)</small> </label>
                                    <input type="text" id='extra' name="extra" placeholder="Extra Infomation" 
                                        className='peer w-full py-3 px-3 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                            </div>
                        </div>
                        <div className="mb-5 relative">
                            <Checkbox name="display_status" id="display_status" type="checkbox" className='' 
                                />
                            <label htmlFor="display_status" className='inline-block pl-4 text-sm'>
                                Show Payment Option
                            </label>
                        </div>
                        <div className="mb-5 relative">
                            {error && (<p className="text-sm text-red-500 mb-4">{ error }</p>)}
                            <button className='w-full inline-flex gap-2 justify-center items-center bg-primaryLight hover:bg-primary rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                                Save  Payment Option
                            </button>
                        </div>
                    </form>
                </aside>
                <aside className='col-span-3 bg-white dark:bg-slate-700 px-4 py-1 pb-3 rounded-md'>
                  <h2 className="py-2 mb-4 border-b font-semibold flex justify-between items-center">
                      <span className="flex gap-2 items-center"> <BsBank className="w-6 h-6 inline-block" /> All Payment Options  </span>
                  </h2>
                  <div className="overflow-x-auto">
                    {/* Cards */}
                    <ul className="grid grid-cols-1 md:grid-cols-2">
                        { payOptions && payOptions.map((payOption) => (
                            <li key={payOption.id} className={`px-4 pt-3 pb-0 shadow-md rounded-md bg-primary text-white bg-opacity-80`} role='button' onClick={()=> {setSelectedOption(payOption); setEditModal(true);}}>
                                <span className="flex items-center gap-2 text-lg font-semibold  mb-5"> 
                                    { payOption.pay_option == 'bank' ? (<><GiBank className="w-6 h-6" /> Bank</>) : (<><BiWallet className="w-6 h-6" /> Wallet</>) }
                                </span>
                                <h3 className="text-xl">
                                    { payOption.bank }
                                </h3>
                                <h1 className="font-black text-3xl space-x-2">
                                    { payOption.account_number }
                                </h1>
                                <small>{ payOption.extra } </small>
                                <p className="text-right w-full mb-0">
                                    <span className="inline-flex items-center gap-2 text-lg font-semibold  mb-5"> 
                                        { payOption.display_status == true ? (<><BsEye className="w-6 h-6" /> showing</>) : (<><BsEyeSlash className="w-6 h-6" /> not showing</>) }
                                    </span>
                                </p>
                            </li>))
                        }
                    </ul>
                  </div>
                </aside>
              </div>
            </section>

            <Modal show={editModal} maxWidth="sm" onClose={() => setEditModal(false)} backDrop={false}>
              <section>
              <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                  <h1 className="text-lg font-semibold mb-4 border-b">
                    Edit New Plan
                  </h1>
                  <form method="post" onSubmit={updateOption}>
                    <input type="hidden" name="option_id" value={selectedOption?.id} />
                        <div className="mb-5 relative">
                            <label htmlFor="pay_option" className='text-sm block'> Payment Option </label>
                            <select
                                    name="pay_option" defaultValue={selectedOption?.pay_option} required
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                >
                                <option value="bank">Bank</option>
                                <option value="mobile wallet">Mobile Wallet</option>
                                <option value="crypto wallet">Crypto Wallet</option>
                            </select>
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="bank" className='text-sm block'> Bank Name/Wallet </label>
                            <input type="text" name="bank" placeholder="Enter Bank Name or Wallet" defaultValue={selectedOption?.bank}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="account_number" className='text-sm block'> Account Number / Wallet Address </label>
                            <input type="text" name="account_number" placeholder="Enter Account Number or Wallet Address"  defaultValue={selectedOption?.account_number}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <div className="grid grid-cols-2 items-start gap-4">
                                <aside>
                                    <label htmlFor="image" className='text-sm block'>Image/Barcode </label>
                                    <input type="file" id='image' name="image" placeholder="Upload Image/Barcode" accept="image"
                                        className='peer w-full py-3 px-1 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                                <aside>
                                    <label htmlFor="extra" className='text-sm block'>Extra Info <small>(optional)</small> </label>
                                    <input type="text" id='extra' name="extra" placeholder="Extra Infomation" defaultValue={selectedOption?.extra}
                                        className='peer w-full py-3 px-3 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                            </div>
                        </div>
                        <div className="mb-5 relative">
                            <Checkbox name="display_status" id="updisplay_status" type="checkbox" className=''
                                />
                            <label htmlFor="updisplay_status" className='inline-block pl-4 text-sm'>
                                Show Payment Option
                            </label>
                        </div>
                        <div className="mb-5 relative">
                            {error && (<p className="text-sm w-full text-red-500 mb-4">{ error }</p>)}
                            <button className='inline-flex gap-2 justify-center items-center bg-primaryLight hover:bg-primary rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white'>
                                {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                                Update Payment Option
                            </button>
                            <button className='inline-flex gap-2 ml-1 justify-center items-center bg-red-500 hover:bg-red-600 rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white' onClick={()=> {deleteOption(selectedOption)}}>
                                {(deleting) ? <LoadingIndicator size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> } Delete
                            </button>
                        </div>
                  </form>
                </aside>
              </section>
            </Modal>
    </AuthenticatedLayout>
  )
}

export default InvestmentPlans