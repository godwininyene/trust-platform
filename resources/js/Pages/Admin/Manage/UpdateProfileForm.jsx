import React from 'react'
import { router, usePage } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import LoadingIndicator from '@/Components/LoadingIndicator';

const UpdateProfileForm = () => {
    const user = usePage().props.auth.user;
    const [processing, setProcessing] = useState(false);


    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let form = new FormData(e.target);
        await axios.post(route('api.update_user'), form)
        .then((res) => {
            // location.reload();
            router.visit(location.href);
        }).catch((err) => {
            setProcessing(false);
            alert(err?.response.data.message);
        });
    };
  return (
    <div className='dark:bg-slate-700 p-5'>


        <header className=''>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100"> Edit Profile Information</h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update your account's profile information and email address.
            </p>
        </header>

        <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
            
            <input type="hidden" name="user_id" value={user.id} />

            <div className='flex  flex-col lg:flex-row w-full gap-x-5'>
                <div className='w-full lg:w-1/2 mb-4'>
                    <label htmlFor="firstname" className='text-sm block dark:text-gray-100'>First Name</label>

                    <input
                        id="firstname"
                        className="peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                        required
                        autoFocus
                        name='firstname'
                        defaultValue={user.firstname}
                    />
                </div>

                <div className='w-full lg:w-1/2'>
                    <label htmlFor="lastname" className='text-sm block dark:text-gray-100'>Last Name</label>
                    <input
                        id="lastname"
                        type="lastname"
                        name='lastname'
                        required
                        defaultValue={user.lastname}
                        className="peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                    />
                </div>
            </div>

            <div className='flex flex-col lg:flex-row w-full gap-x-5'>
                

                <div className="mb-5 relative w-full lg:w-1/2">
                    <label htmlFor="email" className='text-sm block dark:text-gray-100'>Email </label>
                    <input 
                        type="email" 
                        name="email"  
                       id='email'
                       required
                       defaultValue={user.email}
                        className='w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                    />
                </div>

                <div className="mb-5 relative w-full lg:w-1/2">
                    <label htmlFor="image" className='text-sm block dark:text-gray-100'> Choose Profile Photo </label>
                    <input 
                        type="file" 
                        name="avatar"  
                        accept='image/*'
                        className='w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                    />
                </div>

               
            </div>
            <div className="">
                <button className='font-bold flex justify-center items-center gap-3 bg-primary  text-slate-100 rounded-full py-2 px-3 md:px-4 border'>
                    { processing ? <span className='flex items-center gap-2'><LoadingIndicator size={4} /> Saving...</span> : <span>Save Changes</span> } 
                </button>
            </div>


        </form>


    </div>
  )
}

export default UpdateProfileForm