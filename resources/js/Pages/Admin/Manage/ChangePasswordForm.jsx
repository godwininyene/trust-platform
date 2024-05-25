import React from 'react'
import {  router, usePage } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import LoadingIndicator from '@/Components/LoadingIndicator';

const ChangePasswordForm = () => {
    const user = usePage().props.auth.user;
    const [processing, setProcessing] = useState(false);


    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let form = new FormData(e.target);
        await axios.post(route('api.update_user'), form)
        .then((res) => {
            router.visit(location.href);
        }).catch((err) => {
            setProcessing(false);
            alert(err.response.data.message);
        });
    };
  return (
    <div className='dark:bg-slate-700 p-5'>


    <header className=''>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Change Password</h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Ensure your account is using a long, random password to stay secure.
        </p>
    </header>

    <form onSubmit={submit} className="mt-6 space-y-6">
            <input type="hidden" name="user_id" value={user.id} />
        <div className='flex flex-col lg:flex-row w-full gap-x-5'>
            
            <div className='w-full lg:w-1/2 mb-4'>
                <label htmlFor="current_password" className='text-sm block dark:text-gray-100'>Current Password</label>
                <input
                    id="current_password"
                    name='current_password'
                    type="password"
                    className="peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                    required
                    autoFocus
                />
            </div>

            <div className='w-full lg:w-1/2'>
            
                <label htmlFor="password" className='text-sm block dark:text-gray-100'>New Password</label>
                <input
                    
                    className="peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                    id="password"
                    type="password"
                    required
                    name='password'
                />

            </div>
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-x-5'>
            <div className="mb-5 relative w-full lg:w-1/2">
                <label htmlFor="password_confirmation" className='text-sm block dark:text-gray-100'>Confirm Password</label>
                <input 
                    required
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"  
                    className='w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                />
            </div>

            
            <div className="flex items-center gap-4 w-full lg:w-1/2">
                <button type='submit' className='font-bold flex justify-center items-center gap-3 bg-primary  text-slate-100 rounded-full py-2 px-3 md:px-4 border'>
                    { processing ? <span className='flex items-center gap-2'><LoadingIndicator size={4} /> Updating...</span> : <span>Update Password</span> } 
                </button>
            </div>
        </div>

    </form>

</div>
  )
}

export default ChangePasswordForm