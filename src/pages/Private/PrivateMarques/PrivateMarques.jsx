import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getMarques, createMarque, deleteMarque } from '../../../features/marque/marqueSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import Modal from '../../../components/shared/modal/Modal'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'

function PrivateMarques() {
  const { marques, isLoading, isError, message } = useSelector((state) => state.marque)

  const [isNewMarqueModalOpen, setIsNewMarqueModalOpen] = useState(false)
  const [newMarqueData, setNewMarqueData] = useState({
    name: '',
    subname: '',
    country: '',
    web: '',
    details: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getMarques())
  }, [dispatch, isError, message])

  const openNewMarqueModal = () => {
    setIsNewMarqueModalOpen(true)
  }

  const closeNewMarqueModal = () => {
    setIsNewMarqueModalOpen(false)
  }

  const handleNewMarqueChange = (e) => {
    const { name, value } = e.target
    setNewMarqueData({
      ...newMarqueData,
      [name]: value,
    })
  }

  const handleNewMarqueSubmit = (e) => {
    e.preventDefault()
    dispatch(createMarque(newMarqueData))
      .then(() => {
        toast.success('La nouvelle marque a été créée avec succès.')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
      .catch(() => {
        toast.error("Une erreur s'est produite lors de la création de la marque.")
      })
    closeNewMarqueModal()
  }

  const handleDeleteMarque = async (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette marque ?')) {
      try {
        await dispatch(deleteMarque(id))
        toast.success('La marque a été supprimée avec succès.')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        console.error(error)
        toast.error('Erreur lors de la suppression de la marque.')
      }
    }
  }
  
  if (isLoading || !(marques.data)) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <h1>Gestion des marques</h1>
      </section>

      <button onClick={openNewMarqueModal} className="btn">
        Ajouter une nouvelle marque
      </button>

      <div className="ticket-headings">
        <div>Marque</div>
        <div>Sous-marque</div>
        <div>Modifié le</div>
        <div>Supprimer</div>
      </div>

      {marques.data.map((marque) => (
        <Link key={marque.id} to={`/private/marque/${marque.id}`}>
          <Ticket>
            <div>{marque.name}</div>
            <div>{marque.subname}</div>
            <div>{new Date(marque.createdAt).toLocaleDateString()}</div>
            <div>{new Date(marque.updatedAt).toLocaleDateString()}</div>
            <button
              onClick={(event) => handleDeleteMarque(marque.id, event)}
              style={{ background: 'none', border: 'none', color:'red' }}
            >
              <AiOutlineDelete size={20} />
            </button>
          </Ticket>
        </Link>
      ))}

      <Modal
        titleModal="Ajouter une nouvelle marque"
        btnTxt="Ajouter"
        isOpen={isNewMarqueModalOpen}
        onClose={closeNewMarqueModal}
      >
        <form onSubmit={handleNewMarqueSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleNewMarqueChange}
              value={newMarqueData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subname">Sous-marque</label>
            <input
              type="text"
              name="subname"
              onChange={handleNewMarqueChange}
              value={newMarqueData.subname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Site Web</label>
            <input
              type="text"
              name="web"
              onChange={handleNewMarqueChange}
              value={newMarqueData.web}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Pays</label>
            <input
              type="text"
              name="country"
              onChange={handleNewMarqueChange}
              value={newMarqueData.country}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Détails</label>
            <textarea
              type="text"
              name="details"
              onChange={handleNewMarqueChange}
              value={newMarqueData.details}
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

export default PrivateMarques
