import Footer from '@/Components/Footer'
import Navigation from '@/Components/Navigation'
import { Head } from '@inertiajs/react'
import React, {useEffect} from 'react'
import bannerBg from '@/Assets/Images/forex.jpeg';
import AOS from "aos";
import 'aos/dist/aos.css';


export default function BaseLayout({ banner, children }) {
  useEffect(()=>{
    AOS.init();
    const tidioChatBox = document.getElementById('tidio-chat-iframe');
    if(tidioChatBox){
      tidioChatBox.style.display = 'block';
    }
  })
  return (
    <div>
      {/* Page Header and Banner Section */}
      <section className={`bg-no-repeat bg-cover bg-center-top`} >
        <div className={`bg-dark  text-primary`}>
          <Navigation />
          {banner && (<div>
            {banner}
          </div>)}
        </div>
      </section>
      
      {/* Page Body */}
      <main className={`min-h-screen bg-slate-200 dark:bg-slate-900`}>
        { children }
      </main>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </div>
  )
}

// export default BaseLayout