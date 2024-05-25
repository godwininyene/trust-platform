import React from 'react'
import TradingViewWidget from './TradingViewWidget'

const CryptoWidget = () => {
  return (
    <div className={`bg-[#002a1e] relative`}>
        <aside className={`max-w-6xl mx-auto rounded-xl relative -top-20 overflow-hidden`}>
            <TradingViewWidget mode={`light`} />
        </aside>
    </div>
  )
}

export default CryptoWidget