import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import Modal from '../../../components/shared/modal/Modal'
import { BackButton } from '../../../components/shared/BackButton'
import {
  getProducts,
  deleteProduct,
} from '../../../features/product/productSlice'
import { Link } from 'react-router-dom'
import Ticket from '../../../components/shared/ticket/Ticket'
import './products.css'
import AddProductForm from '../../../components/Products/AddProductForm'
import { AiOutlineDelete } from 'react-icons/ai'
import SearchBar from '../../../components/shared/searchBar/SearchBar'
import { getProductCategories } from '../../../features/productCategory/productCategorySlice'

function PrivateProducts() {
  const { products, isLoading, isError, message } = useSelector((state) => state.product)
  const { productCategories } = useSelector((state) => state.productCategory)
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [noPhotoFilter, setNoPhotoFilter] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProducts())
  }, [dispatch, isError, message])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProducts())
    dispatch(getProductCategories())
  }, [dispatch, isError, message])

  useEffect(() => {
    if (products.data && productCategories.data) {
      let filtered = products.data
      if (searchTerm) {
        filtered = filtered.filter(
          (product) => {
            const productCategory = productCategories.data.find(category => category.id === product.productCategory)
            return (
              product.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.productFamilly.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.codeBarre.includes(searchTerm) ||
              (productCategory && productCategory.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
          }
        )
      }
  
      if (noPhotoFilter) {
        filtered = filtered.filter(
          (product) =>
            product.photo === 'no-photo.png' || product.photo === undefined || product.photo === ''
        )
      }
      setFilteredProducts(filtered)
    }
  }, [products, searchTerm, productCategories, noPhotoFilter])

  const openNewProductModal = () => {
    setIsNewProductModalOpen(true)
  }

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false)
  }

  const handleDelete = async (id, event) => {
    event.stopPropagation()
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await dispatch(deleteProduct(id))
        toast.success('Produit supprimé avec succès !')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        toast.error('Erreur lors de la suppression du produit')
      }
    }
  }

  if (isLoading || !products.data || !productCategories.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des produits</h1>
        <h2>Nombres de produits : <span>{products.data.length}</span></h2>
        <div className="formInput">

        <input type="checkbox" checked={noPhotoFilter} onChange={(e) => setNoPhotoFilter(e.target.checked)} /> Afficher uniquement les produits sans photo
</div>
      </section>
      <button onClick={openNewProductModal} className="btn">
        Créer un nouveau produit
      </button>
      <SearchBar onSearch={setSearchTerm} />

      <div className="ticket-headings">
        <div>Image</div>
        <div>Famille</div>
        <div>Catégorie</div>
        <div>Désignation</div>

        <div>Supprimer</div>
      </div>

      {filteredProducts.map((product) => (
        <Link to={`/private/product/${product.id}`} key={product.id}>
          <Ticket>
            <div className="ticket-img-container">
              <img
                src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.photo}`}
                alt=""
              />
            </div>
            <div>{product.productFamilly}</div>
            <div>{product.productCategory}</div>
            <div>{product.designation}</div>
         
            <button
              onClick={(event) => handleDelete(product.id, event)}
              style={{ background: 'none', border: 'none', color:'red' }}
            >
              <AiOutlineDelete size={20} />
            </button>
          </Ticket>
        </Link>
      ))}

      <Modal
        titleModal="Créer un nouveau produit"
        btnTxt="Créer"
        isOpen={isNewProductModalOpen}
        onClose={closeNewProductModal}
      >
        <AddProductForm closeModal={closeNewProductModal} />
      </Modal>
    </>
  )
}

export default PrivateProducts
