import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import phoneMock from '@/Assets/Images/about_dark.png';
import logo from '@/Assets/Images/logo.png';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm } from '@inertiajs/react';
import LoadingIndicator from '@/Components/LoadingIndicator';
import { useEffect } from 'react';

export default function ForgotPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };
    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="bg-primary hidden md:block bg-cover bg-right-bottom">
                <div className={`h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95 text-primary`}>
                    
                <div className='h-full'>
                    <img src={phoneMock} alt="mock" className={`w-[100%] -ml-14 -mt-14`} />
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
                        <h3 className='font-bold text-2xl mb-10'>Forgot Password</h3>

                        <form className='' method='post' onSubmit={submit}>
                        <div className="mb-1 relative">
                            <input
                                type="email" 
                                name="email"  
                                autoFocus={true}
                                value={data.email}
                                placeholder="Email Address" 
                                required onChange={(e) => setData('email', e.target.value)}
                                className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                            />
                            <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[70px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Email Address</label>
                            <InputError message={errors.email} className="mt-1 absolute -bottom-1 dark:text-red-400" />
                        </div>

                        <div className="mb-1 relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="New Password" 
                                required
                                className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                            />
                            <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>New Password</label>
                            <InputError message={errors.email} className="mt-1 absolute -bottom-1 dark:text-red-400" />
                        </div>

                        <div className="mb-1 relative">
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm Password"
                                className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                            />
                            <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Confirm Password</label>
                            <InputError message={errors.email} className="mt-1 absolute -bottom-1 dark:text-red-400" />
                        </div>

                            <div className='text-center'>
                                <button className='w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                    { processing && <LoadingIndicator size={5} /> }
                                    Email Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
