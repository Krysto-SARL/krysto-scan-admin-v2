import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import Modal from '../../../components/shared/modal/Modal'
import { BackButton } from '../../../components/shared/BackButton'
import { Link } from 'react-router-dom'
import Ticket from '../../../components/shared/ticket/Ticket'
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'
import { getGarbageTypes, createGarbageType, deleteGarbageType } from '../../../features/garbageType/garbageTypeSlice'

function PrivateGarbagesTypes() {
  const { garbageTypes, isLoading, isError, message } = useSelector(
    (state) => state.garbageType,
  )

  const [isNewGarbageTypeModalOpen, setIsNewGarbageTypeModalOpen] = useState(false)
  const [newGarbageType, setNewGarbageType] = useState({ name: "", containerColor: "", details: "" })

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce type de déchet ?')) {
      try {
        await dispatch(deleteGarbageType(id)); // Appel de l'action de suppression
        toast.success('Type de déchet supprimé avec succès !');
        dispatch(getGarbageTypes()); // Recharger la liste des types de déchets
      } catch (error) {
        toast.error('Erreur lors de la suppression du type de déchet');
      }
    }
  };
  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getGarbageTypes())
  }, [dispatch, isError, message])

  const openNewGarbageTypeModal = () => {
    setIsNewGarbageTypeModalOpen(true)
  }

  const closeNewGarbageTypeModal = () => {
    setIsNewGarbageTypeModalOpen(false)
  }

  const handleInputChange = (e) => {
    setNewGarbageType({ ...newGarbageType, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(createGarbageType(newGarbageType))
      .then(() => {
        setIsNewGarbageTypeModalOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        toast.error(`Une erreur s'est produite, merci de réessayer.`)
      })
  }

  if (isLoading || !garbageTypes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des types de déchets</h1>
      </section>

      <button onClick={openNewGarbageTypeModal} className="btn">
        Ajouter un nouveau type de déchets
      </button>

      <div className="ticket-headings">
        <div>Nom</div>
        <div>Couleur</div>
        <div>détails</div>
        <div>Créé le</div>
        <div>Actions</div>
      </div>

      {garbageTypes.data.map((garbage) => (
        <Ticket key={garbage.id}>
          <div>{garbage.name}</div>
          <div>{garbage.containerColor}</div>
          <div>{garbage.details}</div>
          <div>{new Date(garbage.createdAt).toLocaleDateString()}</div>
          <div>
            <Link to={`/private/type-de-dechet/${garbage.id}`}>
              <AiOutlineEye size={20} style={{ color: 'green', marginRight: '20px' }} />
            </Link>
            <AiOutlineDelete size={20} style={{ color: 'red' }} onClick={() => handleDelete(garbage.id)} />
          </div>
        </Ticket>
      ))}

      <Modal
        titleModal="Ajouter un nouveau type de déchets"
        isOpen={isNewGarbageTypeModalOpen}
        onClose={closeNewGarbageTypeModal}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Nom:</label>
            <input type="text" name="name" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Couleur du conteneur:</label>
            <input type="text" name="containerColor" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Détails:</label>
            <input type="text" name="details" onChange={handleInputChange} />
          </div>
          <button className="btn btn-block btn-danger" type="submit">Ajouter</button>
        </form>
      </Modal>
    </>
  )
}

export default PrivateGarbagesTypes
