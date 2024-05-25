import React, { useEffect, useState } from 'react';
import ExtraLayout from '@/Layouts/ExtraLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { FaUserPlus } from 'react-icons/fa6';
import LoadingIndicator from '@/Components/LoadingIndicator';

const CompleteRegistration = () => {
    const [countries, loadCountries] = useState([]);
    useEffect(() => {
        const phoneInputField = document.querySelector("#tel_number");
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
        fetchCountries();
    },[])
    
    const { data, setData, post, processing, errors, reset } = useForm({
        phone: '',
        country: '',
        gender: '',
        address: '',
    });

    const fetchCountries = async () => {
        await axios.get(route('api.fetch_countries'))
        .then((res) => {
            loadCountries(res.data);
            data.country = res.data[0].name;
        })
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('complete_profile'));
    };

    return (
        <ExtraLayout>
            <Head title="Complete registration" />
            <section className="w-full max-w-3xl mx-auto">
                <div className='px-4 py-6 md:p-10 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                    <h3 className='font-bold text-2xl mb-1'>Update Profile</h3>
                    <p className='text-sm font-medium leading-[1.6] mb-10'>Kindly complete your registration by updating some of your profile information below;</p>
                    <form className="" method='post' onSubmit={submit}>
                        <aside className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-5 relative">
                                <input
                                    type="tel" 
                                    id="tel_number"
                                    name="fullname"  
                                    defaultValue={data.phone}
                                    autoFocus={true}
                                    required placeholder="Eg. +1 (478) 236 2056" 
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Phone Number</label>
                                <InputError message={errors.phone} className="mt-2 absolute bottom-0" />
                            </div>

                                <div className="mb-5 relative">
                                    <select
                                        name="country"  
                                        defaultValue={data.country}
                                        required 
                                        onChange={(e) => setData('country', e.target.value)}
                                        className='mb-2 peer w-full py-3 px-5 rounded-md bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    >
                                        <option defaultValue={``} disabled>Select Country</option>
                                        {countries.length > 0 && countries.map(country => (
                                            <option value={country.name} key={country.id}> { country.name }</option>
                                        ))}
                                    </select>
                                    <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Residence Country</label>
                                    <InputError message={errors.email} className="mt-2 absolute bottom-0" />
                                </div>
                        
                                <div className="mb-5 relative">
                                    <select
                                        name="gender"  
                                        defaultValue={data.gender} 
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                    >
                                        <option>Select Gender (Optional)</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Gender <small>(Optional)</small></label>
                                    <InputError message={errors.gender} className="mt-2 absolute bottom-0" />
                                </div>

                                <div className="mb-5 relative">
                                    <input
                                        type="address" 
                                        name="address"  
                                        defaultValue={data.address}
                                        placeholder="Enter address (optional)" 
                                        onChange={(e) => setData('address', e.target.value)}
                                        className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                    />
                                    <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible -translate-y-10 opacity-0 invisible '>Residence Address</label>
                                    <InputError message={errors.address} className="mt-2 absolute bottom-0" />
                                </div>

                                <div className='text-center'>
                                    <button disabled={processing} className='w-full inline-flex gap-2 justify-center items-center bg-primaryLight hover:bg-primary rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                        {processing ? <LoadingIndicator size={5} />  : <FaUserPlus className="w-6 h-6"  /> }
                                        Save My Details
                                    </button>
                                </div>

                                <div className='mt-5 text-center'>
                                    <p className='inline-block pl-4 text-sm'>
                                        You are currently signed in!
                                        <Link method="post" href={route('logout')} as="button" className='inline-block ml-1 text-blue-600'>Click here to logout.</Link>
                                    </p>
                                </div>
                        </aside>
                    </form>
                </div>
            </section>
        </ExtraLayout>
    )
}

export default CompleteRegistration