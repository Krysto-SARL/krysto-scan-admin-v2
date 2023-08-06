import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { createProduct, getProducts } from '../../features/product/productSlice'

import { getProductCategories } from '../../features/productCategory/productCategorySlice'
import { getProductFamilies } from '../../features/productFamilly/productFamillySclice'


function AddProductForm({ closeModal }) {
  const [newProductData, setNewProductData] = useState({
    productFamilly: '',
    productCategory: '',
    codeBarre: '',
    designation: '',
  })
  const { productFamilies } = useSelector((state) => state.productFamily)

  const { productCategories, isError, message } = useSelector(
    (state) => state.productCategory,
  )


  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProductCategories())
    dispatch(getProductFamilies())
  }, [dispatch, isError, message])

  const handleNewProductChange = (e) => {
    const { name, value } = e.target
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNewProductSubmit = (e) => {
    e.preventDefault()

    dispatch(createProduct(newProductData))
      .then(() => {
        toast.success('Le nouveau produit  a été créé avec succès.')
     dispatch(getProducts())
        console.log(newProductData)
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors de la création du produit .",
        )
      })
    closeModal()
  }

  if (
    !productCategories.data ||
    !productFamilies.data
  ) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <form onSubmit={handleNewProductSubmit}>
        <div className="form-group">
          <label htmlFor="productFamilly">Famille de produit</label>
          <select
            name="productFamilly"
            onChange={handleNewProductChange}
            value={newProductData.productFamilly}
          >
            {productFamilies.data.map((family) => (
              <option value={family.id} key={family.id}>
                {family.name}
              </option>
            ))}
          </select>
        </div>

       
            <div className="form-group">
              <label htmlFor="productCategory">Catégorie de produit</label>
              <select
                name="productCategory"
                onChange={handleNewProductChange}
                value={newProductData.productCategory}
              >
                <option value="">Selectionner</option>
                {productCategories.data.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

           
         

        <div className="form-group">
          <label htmlFor="designation">Désignation</label>
          <input
            type="text"
            name="designation"
            required
            onChange={handleNewProductChange}
            value={newProductData.designation}
          />
        </div>
         

        <div className="form-group">
          <label htmlFor="codeBarre">Code Barre</label>
          <input
            type="text"
            name="codeBarre"
            required
            onChange={handleNewProductChange}
            value={newProductData.codeBarre}
          />
        </div>

      



        <div className="form-group">
          <button className="btn btn-block btn-danger" type="submit">
            Créer
          </button>
        </div>
      </form>
    </>
  )
}

export default AddProductForm
