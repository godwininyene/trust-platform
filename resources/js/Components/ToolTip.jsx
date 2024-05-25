import React, { useEffect, useState } from 'react'

const ToolTip = ({position = 'top', text = 'Hello', showtip = false}) => {
    const [show, setShow] = useState(showtip);
    return (
        <>
            <div className={`absolute ${position == 'top' && '-top-9'} ${!showtip && 'hidden'} right-0 py-1 px-3 rounded-lg bg-blue-100`}>
                {text}
            </div>
        </>
    )
}

export default ToolTip