'use client' 
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {

    console.error(error)
  }, [error])
 
  return (
    <div className='container flex justify-center items-center h-screen'>
      <div className='flex flex-col items-center'>
        <h2 className='mb-4 text-2xl font-semibold'>Something went wrong!</h2>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}