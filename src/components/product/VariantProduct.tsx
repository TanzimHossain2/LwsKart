import Link from "next/link"

const VariantProduct = () => {
  return (
    
    <div className="flex gap-3 mt-4">
    <Link
      href="#"
      className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
    >
      <i className="fa-brands fa-facebook-f">x</i>
    </Link>
    <Link
      href="#"
      className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
    >
      <i className="fa-brands fa-twitter">x</i>
    </Link>
    <Link
      href="#"
      className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
    >
      <i className="fa-brands fa-instagram">x</i>
    </Link>
  </div>
  )
}

export default VariantProduct