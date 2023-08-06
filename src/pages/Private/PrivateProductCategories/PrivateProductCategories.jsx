import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProductCategories, createProductCategory, deleteProductCategory } from '../../../features/productCategory/productCategorySlice'
import { getProductFamilies } from '../../../features/productFamilly/productFamillySclice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import Modal from '../../../components/shared/modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'

function PrivateProductCategories() {
  const { productCategories, isLoading, isError, message } = useSelector(
    (state) => state.productCategory,
  )
  const { productFamilies } = useSelector(
    (state) => state.productFamily,
  )

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false)
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    ProductFamilly: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProductCategories())
    dispatch(getProductFamilies())
  }, [dispatch, isError, message])

  const openNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true)
  }

  const closeNewCategoryModal = () => {
    setIsNewCategoryModalOpen(false)
  }

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target
    setNewCategoryData({
      ...newCategoryData,
      [name]: value,
    })
  }

  
  // Fonction pour gérer le clic sur le produit
  const handleCategoryClick = (id, event) => {
    if (!event.defaultPrevented) {
      navigate(`/private/produit-categorie/${id}`);  // Navigation vers la page de la catégorie
    }
  };

  // Fonction pour gérer la suppression de la catégorie
  const handleDeleteCategory = async (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await dispatch(deleteProductCategory(id));  // Suppression de la catégorie
        toast.success('Catégorie supprimée avec succès !');
        dispatch(getProductCategories());  // On recharge les catégories
      } catch (error) {
        toast.error('Erreur lors de la suppression de la catégorie');
      }
    }
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault()
    dispatch(createProductCategory(newCategoryData))
      .unwrap()
      .then(() => {
        toast.success('La nouvelle catégorie a été créée avec succès.')
        closeNewCategoryModal()
        dispatch(getProductCategories())
      })
      .catch(() => {
        toast.error("Une erreur s'est produite lors de la création de la catégorie.")
      })
  }
  console.log(productCategories);
  

  if (isLoading || !productCategories.data  || !productFamilies.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des catégories de produits</h1>
        <button onClick={openNewCategoryModal} className="btn">
          Ajouter une nouvelle catégorie
        </button>
      </section>
      
      <div className="ticket-headings">
        <div>Famille</div>
        <div>Categorie</div>
        <div>Créé le</div>
        <div>Modifié le</div>
        <div>Actions</div>
      </div>

      {productCategories.data.map((category) => {
  // Trouver la famille dans productFamilies.data qui a le même id que category.ProductFamilly
  const famille = productFamilies.data.find(famille => famille.id === category.ProductFamilly);

  // Si aucune famille n'a été trouvée, retourner null ou une interface utilisateur de secours
  if (!famille) {
    return null;
  }

  return (
    <Link key={category.id} to={`/private/produit-categorie/${category.id}`}>
    <Ticket>
      {/* Afficher le nom de la famille */}
      <div>{famille.name}</div>
      {/* Afficher le nom de la catégorie */}
      <div>{category.name}</div>
      {/* Afficher la date de création de la catégorie */}
      <div>{new Date(category.createdAt).toLocaleDateString()}</div>
      {/* Afficher la date de modification de la catégorie */}
      <div>{new Date(category.updatedAt).toLocaleDateString()}</div>
      {/* Ajouter des icônes pour accéder à la page de la catégorie et pour supprimer la catégorie */}
      <div>
        <button onClick={(event) => handleCategoryClick(category.id, event)} style={{ background: 'none', border: 'none' , marginRight:'20px' }}>
          <AiOutlineEye size={20} color="green" />
        </button>
        <button onClick={(event) => handleDeleteCategory(category.id, event)} style={{ background: 'none', border: 'none' }}>
          <AiOutlineDelete size={20} color="red" />
        </button>
      </div>
    </Ticket>
  </Link>
  );
})}


      <Modal
        titleModal="Ajouter une nouvelle catégorie"
        btnTxt="Ajouter"
        isOpen={isNewCategoryModalOpen}
        onClose={closeNewCategoryModal}
      >
        <form onSubmit={handleNewCategorySubmit}>

        <div className="form-group">
          <label htmlFor="ProductFamilly">Famille de produit</label>
          <select
            name="ProductFamilly"
            onChange={handleNewCategoryChange}
            value={newCategoryData.ProductFamilly}
          >
            {productFamilies.data.map((family) => (
              <option value={family.id} key={family.id}>
                {family.name}
              </option>
            ))}
          </select>
        </div>
        
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleNewCategoryChange}
              value={newCategoryData.name}
            />
          </div>
     
          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default PrivateProductCategories
