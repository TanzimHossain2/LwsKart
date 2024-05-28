'use client'

import React from "react"

 
export default function GlobalError({ error, reset }: { error: any, reset: () => void }) {
    return (
        <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded my-1 ">Try again</button>
            </body>
        </html>
    )
}