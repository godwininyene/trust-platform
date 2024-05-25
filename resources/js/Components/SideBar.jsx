import React, { useEffect, useState } from 'react';
import logo from '@/Assets/Images/logo.png';
import {RxDashboard} from 'react-icons/rx'
import {FaChartLine, FaEllipsisV} from 'react-icons/fa'
import {FaMoneyBillTransfer, FaUsers} from 'react-icons/fa6'
import {MdManageAccounts} from 'react-icons/md'
import {HiOutlineLogout} from 'react-icons/hi'
import ToggleButton from './ToggleButton';
import { Link } from '@inertiajs/react';
import LoadingIndicator from './LoadingIndicator';

const SideBar = ({user}) => {
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
    const [routing, setRouting] = useState(false);
    const [nextRoute, setNextRoute] = useState('');
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [])
    const changeThemeMode = (darkmode) => {
        if (darkmode == true) {
            localStorage.setItem('theme', 'dark')
        } else {
            localStorage.removeItem('theme')
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark')
            setDarkMode(false);
        }
    }
    const setRoutingMode = (route) => {
        setNextRoute(route);
        setRouting(true);
    }
    return (
        <div className={`md:py-2 md:px-4 flex flex-col h-full`}>
            {/* Brand Name */}
            <section className={`bg-slate-700 dark:bg-slate-900 p-3 mt-1 rounded-md shadow-md hidden md:block`}>
                <img src={logo} alt="" />
            </section>

            <hr className="my-5 hidden md:block" />

            {/* Navigations */}
            <section className={`flex-grow relative z-50 max-w-full`}>
                <ul className={`flex md:flex-col justify-between md:justify-start md:gap-3`}>
                    { user.role === 'admin' ? <>
                        <li className="flex-grow">
                            <Link href={route('admin.dashboard')} onClick={() => setRoutingMode('admin.dashboard')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('admin.dashboard') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                                { (routing && nextRoute == "admin.dashboard") ? <LoadingIndicator type={`dots`} size={5} /> : <RxDashboard className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> Dashboard </span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href={route('admin.users_account')} onClick={() => setRoutingMode('admin.users_account')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('admin.users_account') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                            { (routing && nextRoute == "admin.users_account") ? <LoadingIndicator type={`dots`} size={5} /> : <FaUsers className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> <span className="hidden md:inline">Manage</span> Accounts </span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href={route('manage_transactions')} onClick={() => setRoutingMode('manage_transactions')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('manage_transactions') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                            { (routing && nextRoute == "manage_transactions") ? <LoadingIndicator type={`dots`} size={5} /> : <FaMoneyBillTransfer className={`h-5 w-5 dark:text-slate-400`} /> }
                                <span className={`text-xs md:text-sm`}> Transactions </span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href={route('manage_account')} onClick={() => setRoutingMode('manage_account')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('manage_account') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                                { (routing && nextRoute == "manage_account") ? <LoadingIndicator type={`dots`} size={5} /> : <MdManageAccounts className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> Account </span>
                            </Link>
                        </li>
                    </> : <>
                        <li className="flex-grow">
                            <Link href={route('dashboard')} onClick={() => setRoutingMode('dashboard')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('dashboard') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                                { (routing && nextRoute == "dashboard") ? <LoadingIndicator type={`dots`} size={5} /> : <RxDashboard className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> Dashboard </span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href={route('my_investments')} onClick={() => setRoutingMode('my_investments')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('my_investments') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                            { (routing && nextRoute == "my_investments") ? <LoadingIndicator type={`dots`} size={5} /> : <FaChartLine className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> Investments </span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href={route('my_transactions')} onClick={() => setRoutingMode('my_transactions')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('my_transactions') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                            { (routing && nextRoute == "my_transactions") ? <LoadingIndicator type={`dots`} size={5} /> : <FaMoneyBillTransfer className={`h-5 w-5 dark:text-slate-400`} /> }
                                <span className={`text-xs md:text-sm`}> Transactions </span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href={route('manage_account')} onClick={() => setRoutingMode('manage_account')} className={`font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 ${route().current('manage_account') ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`}>
                                { (routing && nextRoute == "manage_account") ? <LoadingIndicator type={`dots`} size={5} /> : <MdManageAccounts className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> Account </span>
                            </Link>
                        </li>
                    </>}
                </ul>
            </section>
            <section className={`hidden md:block`}>
                <div className="my-2 text-center">
                    <ToggleButton initialState={darkMode} text="Dark Mode" onToggle={(state) => changeThemeMode(state)} />
                </div>
                <Link method="post" href={route('logout')} as="button" className={`btn-primary py-2 px-3 md:px-4 w-full flex flex-col md:flex-row items-center justify-center`}>
                    <HiOutlineLogout className={`h-6 w-6`} /> <span className={`text-xs md:text-sm`}> Logout </span>
                </Link>
            </section>
        </div>
    )
}

export default SideBar