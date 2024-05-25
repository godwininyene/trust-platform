import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import phoneMock from '@/Assets/Images/phonemock.png';
import bannerImage from '@/Assets/Images/banner_bg.jpeg';
import logo from '@/Assets/Images/favicon.png';
import Checkbox from '@/Components/Checkbox';

import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { IoLogInOutline } from 'react-icons/io5';
import LoadingIndicator from '@/Components/LoadingIndicator';

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            post(route('login'));
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="bg-primary hidden md:block bg-cover bg-right-bottom" style={{backgroundImage : `url(${bannerImage})`}}>
                <div className={`h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95 text-primary`}>
                    
                <div className='h-full pt-20 pl-10'>
                    <img src={phoneMock} alt="mock" className={`w-[70%]`} />
                </div>
            </div>
            </div>

            <div className="relative min-h-full px-4 py-10 flex items-center justify-center dark:bg-slate-950 bg-slate-100">
                <section className={`w-full md:max-w-md mx-auto`}>

                   <div className='text-center'>
                        <Link href={route('home')}>
                            <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                        </Link>
                   </div>

                    <div className='px-4 py-6 md:p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                        <h3 className='font-bold text-2xl mb-1'>Login</h3>
                        <p className='text-sm font-medium leading-[1.6] mb-8'>Enter your login credentials to continue.</p>

                        {status && <div className="mb-7 font-medium text-sm text-green-600">{status}</div>}
                        
                        <form className='' method='post' onSubmit={submit}>
                            <div className="mb-5 relative">
                                <input
                                    type="email" 
                                    name="email"  
                                    defaultValue={data.email}
                                    required placeholder="Email Address" 
                                    onChange={(e) => setData('email', e.target.value)}
                                    className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                />
                                <InputError message={errors.email} className="mt-2 absolute -bottom-1 dark:text-red-400" />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Email Address</label>
                            </div>
                    
                            <div className="mb-1 relative">
                                <input
                                    type="password" 
                                    name="password"  
                                    defaultValue={data.password}
                                    required placeholder="password" 
                                    onChange={(e) => setData('password', e.target.value)}
                                    className='mb-2 peer w-full relative py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Password</label>
                                <InputError message={errors.password} className="mt-1 absolute -bottom-1 dark:text-red-400" />
                            </div>

                            <div className='flex justify-between w-full '>

                                <div className="mb-3">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Remember me</span>
                                    </label>
                                </div>

                                <p className='inline-block text-sm text-right'>
                                    <Link href={route('password.request')} className='inline-block ml-1 text-blue-600 dark:text-blue-400' >Forgot your password?</Link>
                                </p>
                            </div>

                            <div className='text-center'>
                                <button 
                                    disabled = {processing}
                                    className='w-full inline-flex items-center justify-center gap-2 items-bottom bg-primaryLight hover:bg-primary rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                    {processing ? <LoadingIndicator size={5} />  : <IoLogInOutline className="w-6 h-6"  /> }
                                    Login
                                </button>
                            </div>

                            <div className='mt-5 text-center'>
                                <p className='inline-block pl-4 text-sm'>
                                    Don't have Account?
                                    <Link href="register" className='inline-block ml-1 text-blue-600 dark:text-blue-400' >Create Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

        </GuestLayout>
    )
}

export default Login