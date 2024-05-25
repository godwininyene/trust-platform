import LoadingIndicator from '@/Components/LoadingIndicator';
import React, { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi';

const Deposit = ({ onBack }) => {
  const [payOptions, setPayOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fetchOptions = async () => {
    await axios.get(route('api.fetch_payment_options'))
    .then((res) => {
      setPayOptions(res.data.body.pay_options)
    })
  }
  useEffect(() => {
    fetchOptions();
  }, [])

  const selectPayOption = (index) => {
    if (index !== null && index !== undefined && index !== "") {
      setSelectedOption(payOptions[index]);
    }
  }

  let submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    let form = new FormData(e.target);
    await axios.post(route('api.save_deposit'), form)
    .then((res) => {
      setProcessing(false);
      if (res.data.success) {
        onBack();
      }
    })
  }

  return (
    <div>
        <section className="px-4 py-3">
          <h2 className="pt-2 font-bold">
            Deposit Funds
          </h2>
          <hr className="my-2" />
          <form onSubmit={submit}>
            <div className="mb-5 relative">
              <label htmlFor="pay_option" className='text-sm block'> Payment Option </label>
              <select
                  onChange={(e) => selectPayOption(e.target.value)}
                  name="pay_option" defaultValue={``} required
                  className='mb-2 peer w-full py-3 px-5 rounded-md capitalize bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                >
                  <option value="">Select Payment Option</option>
                  {payOptions.length > 0 && payOptions.map((option, index) => (
                    <option value={index} key={option.id} > {option.pay_option} </option>
                  ))}
              </select>
            </div>
            {selectedOption && <>
              <aside className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-primary bg-opacity-20 rounded-lg px-2 py-3 mb-5">
                <div className="mb-5 relative">
                  <label htmlFor="bank" className='text-sm block'> {selectedOption.pay_option == 'bank' ? 'Bank Name' : 'Wallet Name'} </label>
                  <p className="text-lg font-bold">{selectedOption.bank}</p>
                </div>
                <div className="mb-5 relative">
                  <label htmlFor="bank" className='text-sm block'> {selectedOption.pay_option == 'bank' ? 'Account Number' : 'Wallet Address'} </label>
                  <p className="text-lg font-bold">{selectedOption.account_number}</p>
                </div>
                {selectedOption.extra && <div className="relative col-span-2">
                <label htmlFor="bank" className='text-sm block text-green-500'> <strong>Deposit NOTICE:</strong> </label>
                <p className="text-sm">{ selectedOption.extra }</p>
              </div>}
              </aside>
            </>}
            <aside className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="mb-5 relative">
                  <label htmlFor="amount" className='text-sm block'> Deposit Amount </label>
                  <input type="number" name="amount" placeholder="Enter the deposit amount" required defaultValue={``}
                      className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                  />
              </div>
              <div className="mb-5 relative">
                  <label htmlFor="image" className='text-sm block'> Upload Reciept </label>
                  <input type="file" name="image" id='image' accept='image/*' placeholder="Upload receipt" required defaultValue={``}
                      className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                  />
              </div>
            </aside>
            <div className="mb-5 relative">
                {error && (<p className="text-sm w-full text-red-500 mb-4">{ error }</p>)}
                <button className='bg-primaryLight hover:bg-primary rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white'>
                    {processing ? <span className='inline-flex gap-x-2 justify-center items-center'><LoadingIndicator size={5} /> Saving... </span> : 
                    <span className='inline-flex gap-x-2 justify-center items-center'><BiSave className="w-6 h-6"  /> Save Deposit Details </span> }
                </button>
            </div>
          </form>
        </section>
    </div>
  )
}

export default Deposit