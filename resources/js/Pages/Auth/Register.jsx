import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import logo from '@/Assets/Images/logo.png';
import phoneMock from '@/Assets/Images/phonemock.png';
import Checkbox from '@/Components/Checkbox';

import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { FaUserPlus } from 'react-icons/fa6';
import LoadingIndicator from '@/Components/LoadingIndicator';

export default function Register() {
    const [refid, setRefid] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: '',
        referral_id: '',
        time_zone: '',
    });
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    useEffect(() => {
        console.log(timeZone);
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search)
        if(searchParams.get('refid') !== undefined && searchParams.get('refid') !== null) {
            setRefid(searchParams.get('refid'))
            localStorage.setItem('refid', searchParams.get('refid'));
        }else if(localStorage.getItem('refid') !== undefined && localStorage.getItem('refid') !== null && localStorage.getItem('refid') !== "") {
            setRefid(localStorage.getItem('refid'));
        };
        console.log(searchParams.get('refid'), refid);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        data.referral_id = refid;
        data.time_zone = timeZone;
        axios.get('/sanctum/csrf-cookie').then(response => {
            post(route('register'));
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="bg-primary hidden md:block bg-cover bg-right-bottom">
                <div className={`h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95 text-primary`}>
                    
                <div className='h-full pt-20 pl-10'>
                    <img src={phoneMock} alt="mock" className={`w-[70%]`} />
                </div>
            </div>
            </div>

            <div className="relative min-h-full px-4 py-10 flex items-center justify-center dark:bg-slate-950 bg-slate-100">
                <section className={`w-full max-w-md mx-auto`}>

                   <div className='text-center'>
                        <Link href={route('home')}>
                            <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                        </Link>
                   </div>

                    <div className='p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                        <h3 className='font-bold text-2xl mb-1'>Create your account</h3>
                        <p className='text-sm font-medium leading-[1.6] mb-10'>Enter your personal details to create account</p>
                        <form className='' method='post' onSubmit={submit}>
                        <input type="hidden" name="ref_id" defaultValue={refid} readOnly onChange={(e) => setData('referral_id', e.target.value)} />
                        <div className="mb-5 relative">
                            <input
                                type="text" 
                                name="fullname"  
                                defaultValue={data.fullname}
                                autoFocus={true}
                                required placeholder="Fullname" 
                                onChange={(e) => setData('fullname', e.target.value)}
                                className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                            />
                            <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Fullname</label>
                            <InputError message={errors.fullname} className="mt-2 absolute bottom-0" />
                        </div>

                            <div className="mb-5 relative">
                                <input
                                    type="email" 
                                    name="email"  
                                    defaultValue={data.email}
                                    required placeholder="Email Address" 
                                    onChange={(e) => setData('email', e.target.value)}
                                    className='mb-2 peer w-full py-3 px-5 rounded-md bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Email Address</label>
                                <InputError message={errors.email} className="mt-2 absolute bottom-0" />
                            </div>
                    
                            <div className="mb-5 relative">
                                <input
                                    type="password" 
                                    name="password"  
                                    defaultValue={data.password}
                                    required placeholder="password" 
                                    onChange={(e) => setData('password', e.target.value)}
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Password</label>
                                <InputError message={errors.password} className="mt-2 absolute bottom-0" />
                            </div>

                            <div className="mb-5 relative">
                                <input
                                    type="password" 
                                    name="password_confirmation"  
                                    defaultValue={data.password_confirmation}
                                    required placeholder="confirm password" 
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible -translate-y-10 opacity-0 invisible '>Confirm Password</label>
                                <InputError message={errors.password_confirmation} className="mt-2 absolute bottom-0" />
                            </div>

                            <div className='mb-5'>
                                <Checkbox name="terms" id="terms" type="checkbox" className='' required 
                                    onChange={(e) => setData('terms', e.target.value)}/>
                                <label htmlFor="terms" className='inline-block pl-4 text-sm'>
                                    Agree with
                                    <Link href="#" className='inline-block ml-1 text-blue-600' >Privacy Policy</Link>
                                </label>
                            </div>

                            <div className='text-center'>
                                <button disabled={processing} className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                    {processing ? <LoadingIndicator size={5} />  : <FaUserPlus className="w-6 h-6"  /> }
                                    Create Account
                                </button>
                            </div>

                            <div className='mt-5 text-center'>
                                
                                <p className='inline-block pl-4 text-sm'>
                                    Already have Account?
                                    <Link href="login" className='inline-block ml-1 text-blue-600' >Click here to login</Link>
                                </p>
                            </div>
                            

                        </form>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
