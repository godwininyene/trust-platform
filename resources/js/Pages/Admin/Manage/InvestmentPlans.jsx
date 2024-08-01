import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/CustomModal';
import LoadingIndicator from '@/Components/LoadingIndicator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BiEditAlt, BiSave, BiTrashAlt } from 'react-icons/bi';
import { ImPieChart } from 'react-icons/im';

const InvestmentPlans = ({auth}) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [loadingPlans, setPlanState] = useState(false);
  const [plans, loadPlans] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [editModal, setEditModal] = useState(false);

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

  let submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    let form = new FormData(e.target);
    await axios.post(route('api.add_plan'), form)
    .then((res) => {
      setProcessing(false);
      loadPlans(res.data.body.plans);
      e.target.reset();
    })
    .catch((err) => {
      setProcessing(false);
      setError(err.response.data.message);
    });
  }

  let updatePlan = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    let form = new FormData(e.target);
    await axios.post(route('api.update_plan'), form)
    .then((res) => {
      setProcessing(false);
      loadPlans(res.data.body.plans);
      setEditModal(false);
      e.target.reset();
    })
    .catch((err) => {
      setProcessing(false);
      setError(err.response.data.message);
    });
  }

  let deletePlan = async (plan) => {
    setDeleting(true);
    await axios.delete(route('api.delete_plan', {plan_id: plan.id}))
    .then((res) => {
      setDeleting(false);
      loadPlans(res.data.body.plans);
    })
    .catch((err) => {
      setDeleting(false);
    });
  }

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
                <ImPieChart className={`h-5 w-5`} /> <span> Manage Plans </span>
            </h2>}
        >
          <Head title="Investment Plans" />
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-5xl">
                <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                  <h1 className="text-lg font-semibold mb-4 border-b">
                    Add New Plan
                  </h1>
                  <form method="post" onSubmit={submit}>
                    <div className="mb-5 relative">
                      <label htmlFor="plan_name" className='text-sm block'>Plan Name <small>(optional)</small> </label>
                      <input type="text" name="plan_name" placeholder="Enter Plan Name"  
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="duration" className='text-sm block'>Plan Duration </label>
                      <div className="grid grid-cols-2 items-start gap-4">
                        <input type="number" id='duration' name="duration" placeholder="Duration"  required 
                            className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                        />
                        <select
                            name="timing_param" defaultValue="" required
                            className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                        >
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="min_deposit" className='text-sm block'>Min. Deposit <small>($)</small> </label>
                            <input type="number" name="min_deposit" placeholder="Minimum Deposit" id="min_deposit" required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="max_deposit" className='text-sm block'>Max. Deposit <small>($)</small> </label>
                            <input type="number" name="max_deposit" placeholder="Maximum Deposit" id="max_deposit" required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="percentage" className='text-sm block'>Return Percentage <small>(%)</small> </label>
                            <input type="number" name="percentage" placeholder="Investment Percentage" id="percentage" required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="ref_bonus" className='text-sm block'>Refferal Bonus <small>(%)</small> </label>
                            <input type="number" name="ref_bonus" placeholder="Referral Bonus" id="ref_bonus"
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <Checkbox name="principal_return" id="principal_return" type="checkbox" className='' 
                          />
                      <label htmlFor="principal_return" className='inline-block pl-4 text-sm'>
                          Return principal
                      </label>
                    </div>
                    <div className="mb-5 relative">
                      {error && (<p className="text-sm text-red-500 mb-4">{ error }</p>)}
                      <button className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                          {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                          Save Plan
                      </button>
                    </div>
                  </form>
                </aside>
                <aside className='col-span-3 bg-white dark:bg-slate-700 px-4 py-1 pb-3 rounded-md'>
                  <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                      <span className="flex gap-2 items-center"> <ImPieChart className="w-6 h-6 inline-block" /> All Plans  </span>
                  </h2>
                  <div className="overflow-x-auto">
                      <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                              <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                  <tr>
                                      <th className="py-1 px-3 whitespace-nowrap">Duration</th>
                                      <th className="py-1 px-3 whitespace-nowrap">Min. Deposit</th>
                                      <th className="py-1 px-3 whitespace-nowrap">Max. Deposit</th>
                                      <th className="py-1 px-3 whitespace-nowrap">Percentage </th>
                                      <th className="py-1 px-3 whitespace-nowrap"></th>
                                  </tr>
                              </thead>

                              <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                              { (loadingPlans || !fetched) && (<tr>
                                      <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                          <LoadingIndicator type='dots' size={10} />
                                      </td>
                                  </tr>)}
                              
                              { (plans.length > 0 && !loadingPlans) && plans.map((plan) => (
                                  <tr key={plan.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                      <td className="px-2 py-2">{plan.mining_duration} {plan.timing_parameter}</td>
                                      <td className="px-2 py-2">${plan.min_deposit}</td>
                                      <td className="px-2 py-2">${plan.max_deposit}</td>
                                      <td className="px-2 py-2">{plan.percentage}%</td>
                                      <td className="px-2 py-2 whitespace-nowrap">
                                        <button className="py-1 px-2 text-blue-500" onClick={()=> {setSelectedPlan(plan); setEditModal(true);}}>
                                          <BiEditAlt  className="h-6 w-6"  />
                                        </button>
                                        <button className="py-1 px-2 text-red-500" onClick={()=> {deletePlan(plan); setSelectedPlan(plan)}}>
                                          {(deleting && selectedPlan.id == plan.id) ? <LoadingIndicator size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
                                        </button>
                                      </td>
                                  </tr>
                              )) }
                              </tbody>
                          </table>
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
                  <form method="post" onSubmit={updatePlan}>
                    <input type="hidden" name="plan_id" value={selectedPlan.id} />
                    <div className="mb-5 relative">
                      <label htmlFor="plan_name" className='text-sm block'>Plan Name <small>(optional)</small> </label>
                      <input type="text" name="plan_name" placeholder="Enter Plan Name" defaultValue={selectedPlan.name} 
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="duration" className='text-sm block'>Plan Duration </label>
                      <div className="grid grid-cols-2 items-start gap-4">
                        <input type="number" id='duration' name="duration" placeholder="Duration"  required defaultValue={selectedPlan.mining_duration}
                            className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                        />
                        <select
                            name="timing_param" defaultValue={selectedPlan.timing_parameter} required
                            className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                        >
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="min_deposit" className='text-sm block'>Min. Deposit <small>($)</small> </label>
                            <input type="number" name="min_deposit" placeholder="Minimum Deposit" id="min_deposit" required defaultValue={selectedPlan.min_deposit}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="max_deposit" className='text-sm block'>Max. Deposit <small>($)</small> </label>
                            <input type="number" name="max_deposit" placeholder="Maximum Deposit" id="max_deposit" required defaultValue={selectedPlan.max_deposit}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="percentage" className='text-sm block'>Return Percentage <small>(%)</small> </label>
                            <input type="number" name="percentage" placeholder="Investment Percentage" id="percentage" required defaultValue={selectedPlan.percentage}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="ref_bonus" className='text-sm block'>Refferal Bonus <small>(%)</small> </label>
                            <input type="number" name="ref_bonus" placeholder="Referral Bonus" id="ref_bonus" defaultValue={selectedPlan.ref_bonus}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <Checkbox name="principal_return" id="principal_return" type="checkbox" className='' defaultValue={selectedPlan.return_principal} 
                          />
                      <label htmlFor="principal_return" className='inline-block pl-4 text-sm'>
                          Return principal
                      </label>
                    </div>
                    <div className="mb-5 relative">
                      {error && (<p className="text-sm text-red-500 mb-4">{ error }</p>)}
                      <button className='w-full inline-flex gap-2 justify-center items-center bg-primaryLight hover:bg-primary rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                          {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                          Update Plan
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