import logo from '@/Assets/Images/favicon.png';
import { Link } from '@inertiajs/react';

export default function Extra({ children }) {
    return (
        <div className={`flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-700`}>
           <section className="my-4 w-full">
                <div className='text-center mb-4'>
                    <Link href={route('home')}>
                        <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                    </Link>
                </div>

                <div className="px-4">
                    {children}
                </div>
           </section>
        </div>
    );
}