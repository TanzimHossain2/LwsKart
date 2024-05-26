import CategoryForm from "@/components/categories/CategoryForm"

const CategoriesCreatePage = () => {

  return (
    <div className="container py-10">
       <h1 className='text-3xl font-bold text-center mb-6'>Admin: Manage Categories</h1>
        <CategoryForm />
    </div>
  )
}

export default CategoriesCreatePage