import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import bannerImage from '@/Assets/Images/banner_bg.jpeg';
import logo from '@/Assets/Images/favicon.png';

export default function Guest({ children }) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 min-h-screen`}>
           {children}
        </div>
    );
}
