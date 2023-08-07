import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getProduct,
  addProductPhoto,
  getAveragePrice,
} from '../../../features/product/productSlice'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import Modal from '../../../components/shared/modal/Modal'
import { BackButton } from '../../../components/shared/BackButton'
import ProductBanner from '../../../components/Product/PrductBanner/ProductBanner'
import './product.css'

import AddPriceRecord from '../../../components/Product/ProductAddPriceRecords/AddPriceRecord'
import ProductAveragePrice from '../../../components/Product/ProductAveragePrice/ProductAveragePrice'
import ProductAdditives from '../../../components/Product/ProductAdditives'
import ProductAllergens from '../../../components/Product/ProductAllergen'
import ProductIngredients from '../../../components/Product/ProductIngredients'
import ProductGeneralInformation from '../../../components/Product/ProductGeneralInformation/ProductGeneralInformation'
import ProductScores from '../../../components/Product/ProductScores/ProductScores'
import ProductNutritionFacts from '../../../components/Product/ProductNutritionFacts/ProductNutritionFacts'
import BigTitle from '../../../components/shared/BigTitle/BigTitle'
import ProductEnvironement from '../../../components/Product/ProductEnvironement/ProductEnvironement'
import ProductPriceRecords from '../../../components/Product/ProductPriceRecords/ProductPriceRecords'

function PrivateProductDetail() {
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product,
  )
  const [isNewPhotoModalOpen, setIsNewPhotoModalOpen] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()

  const openNewPhotoModal = () => {
    setIsNewPhotoModalOpen(true)
  }

  const closeNewPhotoModal = () => {
    setIsNewPhotoModalOpen(false)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handlePhotoSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', photoFile)
    dispatch(
      addProductPhoto({
        productId: product.data.id,
        photo: formData,
      }),
    )
      .then(() => {
        setIsNewPhotoModalOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        toast.error(`Une erreur s'est produite, merci de réessayer.`)
      })
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProduct(params.id))
    dispatch(getAveragePrice({ productId: params.id })) // Fetch average price info when the component is mounted
  }, [dispatch, isError, message, params.id])

  console.log(product.data)

  if (isLoading || !product.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <BackButton url={'/private/produits'} />
      <button onClick={openNewPhotoModal} className="btn btn-sm">
        Ajouter une photo
      </button>

      {/* Section informations generale et header */}
      <ProductBanner product={product.data} />
      <BigTitle title={'Informations générales'} />
      <ProductGeneralInformation product={product.data} />
      <ProductScores product={product.data} />

      {/* Section santé */}
      <BigTitle title={'Santé'} />
      <ProductIngredients product={product.data} />
      <ProductAdditives product={product.data} />
      <ProductAllergens product={product.data} />
      <ProductNutritionFacts product={product.data} />
      
      <BigTitle title={'Environement'} />
      <ProductEnvironement product={product.data} />
      {/* Section Prix */}
      <BigTitle title={'Prix'} />

      <AddPriceRecord product={product.data} />

      <ProductAveragePrice product={product.data} />
      <ProductPriceRecords product={product.data}/>
      {/* Section environement */}


      {/* Modal ajout ou modification de la photos */}
      <Modal
        titleModal="Ajouter ou changer votre photo"
        isOpen={isNewPhotoModalOpen}
        onClose={closeNewPhotoModal}
      >
        <div>
          <form className="add-photo-form" onSubmit={handlePhotoSubmit}>
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {previewImage && (
                <img
                  className="photo-preview"
                  src={previewImage}
                  alt="Preview"
                />
              )}
            </div>
            <button className="btn" type="submit">
              Ajouter
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default PrivateProductDetail
