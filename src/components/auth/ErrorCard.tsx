import Link from "next/link"

const ErrorCard = () => {
  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500">Error</h1>
        <p className="mt-2 text-lg">An error occurred while processing your request.</p>
        <div className="mt-5">
             <Link href={"/auth/login"} className="px-4 py-2 mt-5 text-white bg-red-500  rounded-lg hover:bg-red-600">Back to Login</Link>
        </div>
       
      </div>
      </div>
    </>
  )
}

export default ErrorCard