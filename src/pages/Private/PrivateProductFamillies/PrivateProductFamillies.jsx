import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProductFamilies, createProductFamily, deleteProductFamily } from '../../../features/productFamilly/productFamillySclice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import Modal from '../../../components/shared/modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'

function PrivateProductFamilies() {
  const { productFamilies, isLoading, isError, message } = useSelector(
    (state) => state.productFamily,
  )

  const [isNewFamilyModalOpen, setIsNewFamilyModalOpen] = useState(false)
  const [newFamilyData, setNewFamilyData] = useState({ name: '' })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProductFamilies())
  }, [dispatch, isError, message])

  const openNewFamilyModal = () => {
    setIsNewFamilyModalOpen(true)
  }

  const closeNewFamilyModal = () => {
    setIsNewFamilyModalOpen(false)
  }

  const handleNewFamilyChange = (e) => {
    const { name, value } = e.target
    setNewFamilyData({
      ...newFamilyData,
      [name]: value,
    })
  }

  const handleFamilyClick = (id, event) => {
    if (!event.defaultPrevented) {
      navigate(`/private/produit-famille/${id}`) 
    }
  }

  const handleDeleteFamily = async (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette famille de produits ?')) {
      try {
        await dispatch(deleteProductFamily(id)) 
        toast.success('Famille de produits supprimée avec succès !')
        dispatch(getProductFamilies()) 
      } catch (error) {
        toast.error('Erreur lors de la suppression de la famille de produits')
      }
    }
  }

  const handleNewFamilySubmit = (e) => {
    e.preventDefault()
    dispatch(createProductFamily(newFamilyData))
      .unwrap()
      .then(() => {
        toast.success('La nouvelle famille de produits a été créée avec succès.')
        closeNewFamilyModal()
        dispatch(getProductFamilies())
      })
      .catch(() => {
        toast.error("Une erreur s'est produite lors de la création de la famille de produits.")
      })
  }

  if (isLoading || !productFamilies.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des familles de produits</h1>
        <button onClick={openNewFamilyModal} className="btn">
          Ajouter une nouvelle famille de produits
        </button>
      </section>
      
      <div className="ticket-headings">
        <div>Id</div>
        <div>Nom</div>
        <div>Créé le</div>
        <div>Modifié le</div>
        <div>Actions</div>
      </div>

      {productFamilies.data.map((family) => (
        <Ticket key={family.id}>
          <div>{family.id}</div>
          <div>{family.name}</div>
          <div>{new Date(family.createdAt).toLocaleDateString()}</div>
          <div>{new Date(family.updatedAt).toLocaleDateString()}</div>
          <div>
            <button onClick={(event) => handleFamilyClick(family.id, event)} style={{ background: 'none', border: 'none', marginRight:'20px' }}>
              <AiOutlineEye size={20} color="green" />
            </button>
            <button onClick={(event) => handleDeleteFamily(family.id, event)} style={{ background: 'none', border: 'none' }}>
              <AiOutlineDelete size={20} color="red" />
            </button>
          </div>
        </Ticket>
      ))}

      <Modal
        titleModal="Ajouter une nouvelle famille de produits"
        btnTxt="Ajouter"
        isOpen={isNewFamilyModalOpen}
        onClose={closeNewFamilyModal}
      >
        <form onSubmit={handleNewFamilySubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleNewFamilyChange}
              value={newFamilyData.name}
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

export default PrivateProductFamilies
