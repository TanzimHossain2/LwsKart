

const FormError = ( { message }:  { message: any } ) => {
  return (
    <p className="mt-4 p-3 bg-red-100 text-red-500 rounded">
    😡  {message}
    </p>
  )
}

export default FormError
