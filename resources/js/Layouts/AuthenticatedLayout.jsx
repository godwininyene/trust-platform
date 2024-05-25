import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import {IoNotificationsOutline} from 'react-icons/io5'
import SideBar from '@/Components/SideBar';
import defaulAvatar from '@/Assets/Images/default.png';
import LoadingIndicator from '@/Components/LoadingIndicator';

export default function Authenticated({ user, header, children }) {
    const [error, setError] = useState(false);
    const [sent, setSentSatus] = useState(false);
    const [processing, setProcessing] = useState(false);
    useEffect(() => {
        const tidioChatBox = document.getElementById('tidio-chat-iframe');
        if(tidioChatBox){
            tidioChatBox.style.bottom = '50px';
        }
    }, [])

    let submit = async  (e) => {
        e.preventDefault();
        setProcessing(true);
        await axios.post(route('verification.send'))
        .then((response) => {
            setSentSatus(true);
        }).catch((error) => {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }).finally(() => {
            setProcessing(false);
        });
    }
    
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 dark:text-slate-200">
            <aside className={`fixed md:h-screen md:top-0 bottom-0 left-0 w-full md:w-56 bg-white dark:bg-slate-800 shadow z-50`}>
                <SideBar user={user} />
            </aside>
            <aside className={`md:ml-56 min-h-full relative`}>
                <header className={`py-3 md:py-4 px-4 flex items-center justify-between`}>
                    <div>
                        {header && (
                            <aside className="dark:text-slate-200 text-slate-800">
                                <div className="max-w-7xl mx-auto">{header}</div>
                            </aside>
                        )}
                    </div>

                    <div>
                        {/* Intended Search Input */}
                    </div>

                    <div className={`flex items-center gap-4`}>
                        <span className="relative block">
                            <IoNotificationsOutline className="h-6 w-6" />
                        </span>
                        <span>
                            <img src={(user.profile_photo_path && user.profile_photo_path != 'default.png') ? user.profile_photo_path : defaulAvatar} alt=" " className={`bg-slate-300 h-10 w-10 rounded-full overflow-hidden`} />
                        </span>
                    </div>
                </header>

                {/* { ( user.role !== 'admin' && (user.is_verified == false || user.email_verified_at == null) ) && <div className="py-2 px-4">
                    <span className={`${sent ? 'bg-teal-50 text-green-600' : 'bg-orange-50 text-orange-600'} rounded-lg px-4 py-2 block text-sm font-semibold`}>
                        {sent ? <span className="text-sm"> 
                            A verification link has been sent to the email address you provided during registration.
                            kindly verify your account by clicking on the link we just emailed to you. 
                             </span> : 
                            <span> <strong className="font-black text-base">Verification Required: </strong> We noticed that your account havent been verified. 
                            kindly click on the button below to verify your account. </span>}
                        <br />
                        <form onSubmit={submit}>
                            <button type="submit" className="px-3 py-1 mt-3 rounded-md bg-slate-700 text-white dark:bg-[#1bffcb] dark:text-[#286154]">
                                {processing ? <LoadingIndicator size={6} /> : sent ? <span>Resend verification email</span> : <span>Verify My Account</span>}
                            </button>
                        </form>
                    </span>
                </div> } */}

                <main className={`py-3 md:py-4 px-4 text-slate-800 dark:text-slate-300 relative z-0 pb-20 md:pb-10`}>
                    { children }
                </main>
                
            </aside>
        </div>
    );
}
