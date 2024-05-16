const FormSuccess = ({ message }: { message: string | undefined }) => {
  return (
    <p className="mt-4 p-3 bg-green-100 text-green-500 rounded">😊 {message}</p>
  );
};

export default FormSuccess;
