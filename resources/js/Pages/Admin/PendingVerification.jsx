import React, { useEffect, useState } from 'react';
import ExtraLayout from '@/Layouts/ExtraLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BiHomeAlt } from 'react-icons/bi';

const CompleteRegistration = ({auth}) => {
    

    return (
        <ExtraLayout>
            <Head title="Complete registration" />
            <section className="w-full max-w-3xl mx-auto">
                <div className='px-4 py-6 md:p-10 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                    <aside>
                        { auth.user.approval_status === 'pending' ?
                            (<h4 className="font-bold text-2xl mb-3">Pending Account Approval</h4>)
                        :
                           ( <h4 className="font-bold text-2xl mb-3">Account Denied</h4>)
                        }
                        
                        <div className="form-group">
                            <label className="col-form-label mb-2">Dear <strong>{ auth.user.firstname } { auth.user.lastname } <i>!</i></strong></label>
        
                            {(auth.user.approval_status === 'pending') ?
                                (<>
                                <label className="col-form-label block my-4">
                                    <p>
                                        Your account have been created successfully and it is been reviewed.
                                    </p>
                                    <p>
                                        This might take upto 30 minutes or more.
                                        Kindly hold on for a while as our customer support team swiftly verify your account credentials.
                                    </p>
                                </label>
                                <label className="block py-3">
                                        <div className="mb-3 text-primary py-1 px-2" style={{backgroundColor: 'rgba(0, 174, 255, 0.075)', fontWeight: '600'}}>
                                            <small>
                                                <i>You will be redirected automatically when this process is done.</i>
                                            </small>
                                        </div>
                                        <p>
                                            You will also be notified via email. Kindly check your email if this page doesn't redirect you automatically after 30 minutes.
                                        </p>
                                    </label><label className="col-form-label">
                                        <p>
                                            Best Regards, <br /> <strong>Customer Support Team.</strong>
                                        </p>
                                    </label></>)
                            :
                            (<label className="block my-2">
                                <p>
                                    Your account creation was denied due to some violation of our policies.
                                </p>
                                <p>
                                    Kindly contact our <strong>Support Team</strong> for more information!
                                </p>
                            </label>)
                           }
                        </div>

                        <div className="pt-4">
                            <Link method="post" href={route('logout')} as="button" className={`font-bold md:gap-2 bg-primary dark:bg-transparent text-slate-100 rounded-full inline-flex gap-2 items-center justify-center py-2 px-6 md:px-4 border dark:text-slate-300`}>
                                <BiHomeAlt className={`h-6 w-6`} /> <span className={`text-sm md:text-base`}> Logout & <span> Return&nbsp;Home</span> </span>
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </ExtraLayout>
    )
}

export default CompleteRegistration