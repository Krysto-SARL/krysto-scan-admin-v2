import React, { useEffect, useState } from 'react'
import './productEnvironement.css'
import Modal from '../../shared/modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../../features/product/productSlice'
import { toast } from 'react-toastify'
import Spinner from '../../shared/spinner/Spinner'
import { getPlasticTypes } from '../../../features/plasticType/plasticTypeSlice'
import { getGarbageTypes } from '../../../features/garbageType/garbageTypeSlice'
import { FaCheck, FaTimes } from 'react-icons/fa'
import './productEnvironement.css'
function ProductEnvironement({ product }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [environmentData, setEnvironmentData] = useState({
    recyclableByKrysto: product.recyclableByKrysto,
    environementReglementation: product.environementReglementation,
    remarque: product.remarque,
    plasticTypes: product.plasticTypes || [], // Renommez ici
    garbageTypes: product.garbageTypes || [], // Renommez ici
  })
  const dispatch = useDispatch()

  const { plasticTypes, isLoading, isError, message } = useSelector(
    (state) => state.plasticType,
  )
  const { garbageTypes } = useSelector((state) => state.garbageType)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const handleEnvironmentChange = (name, value) => {
    setEnvironmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  console.log(plasticTypes)

  const togglePlasticType = (plasticId) => {
    setEnvironmentData((prevData) => {
      const plasticTypes = prevData.plasticTypes.includes(plasticId)
        ? prevData.plasticTypes.filter((id) => id !== plasticId)
        : [...prevData.plasticTypes, plasticId]
      return { ...prevData, plasticTypes } // Modifiez ici
    })
  }

  const toggleGarbageType = (garbageId) => {
    setEnvironmentData((prevData) => {
      const garbageTypes = prevData.garbageTypes.includes(garbageId)
        ? prevData.garbageTypes.filter((id) => id !== garbageId)
        : [...prevData.garbageTypes, garbageId]
      return { ...prevData, garbageTypes } // Modifiez ici
    })
  }

  const handleEnvironmentUpdate = async (e) => {
    e.preventDefault()
    try {
      await dispatch(
        updateProduct({
          productId: product.id,
          updatedData: environmentData,
        }),
      ).unwrap()
      toast.success(
        "Les informations sur l'environnement ont été mises à jour avec succès!",
      )
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la mise à jour des informations sur l'environnement.",
      )
    }
    closeEditModal()
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getPlasticTypes())
    dispatch(getGarbageTypes())
  }, [dispatch, isError, message])

  if (isLoading || !product || !garbageTypes.data || !plasticTypes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <section>
      <div className="recyblability">
        <h4>Recyclable par KRYSTO</h4>

        <p>
          {product.recyclableByKrysto ? (
            <FaCheck className="icon-yes" />
          ) : (
            <FaTimes className="icon-no" />
          )}
        </p>
      </div>
      <h3>Types de déchets:</h3>
      <div className="garbageTypeProduct-container">
        {product.garbageTypes && product.garbageTypes.length > 0 ? (
          product.garbageTypes.map((garbage) => <div>{garbage.name}</div>)
        ) : (
          <div>Pas de données disponibles</div>
        )}
      </div>
      <h3>Types de plastiques:</h3>
      <div className="plasticTypeProduct-container">
        {product.plasticTypes && product.plasticTypes.length > 0 ? (
          product.plasticTypes.map((plastic) => <div>{plastic.sigleFr}</div>)
        ) : (
          <div>Pas de données disponibles</div>
        )}
      </div>
      <div>
  {product.remarque ? product.remarque : "Aucune remarques"}
</div>
<div>
  {product.environementReglementation
    ? product.environementReglementation
    : "Pas de données disponibles"}
</div>
      <button onClick={openEditModal} className="btn btn-danger btn-block">
        Modifier les informations
      </button>
      <Modal
        titleModal="Modifier les informations sur l'environnement du produit"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <form onSubmit={handleEnvironmentUpdate}>
          <div className="form-group">
            <label>Recyclable par Krysto:</label>
            <input
              type="checkbox"
              checked={environmentData.recyclableByKrysto}
              onChange={() =>
                handleEnvironmentChange(
                  'recyclableByKrysto',
                  !environmentData.recyclableByKrysto,
                )
              }
            />
          </div>
          <div className="form-group">
            <label>Réglementation environnementale:</label>
            <textarea
              value={environmentData.environementReglementation}
              onChange={(e) =>
                handleEnvironmentChange(
                  'environementReglementation',
                  e.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Types de plastique:</label>
            {plasticTypes.data.map((plastic) => (
              <div key={plastic._id}>
                <input
                  type="checkbox"
                  checked={environmentData.plasticTypes.includes(plastic._id)} // Modifiez ici
                  onChange={() => togglePlasticType(plastic._id)}
                />
                {plastic.sigleFr}
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Types de déchets:</label>
            {garbageTypes.data.map((garbage) => (
              <div key={garbage._id}>
                <input
                  type="checkbox"
                  checked={environmentData.garbageTypes.includes(garbage._id)} // Modifiez ici
                  onChange={() => toggleGarbageType(garbage._id)}
                />
                {garbage.name}
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Remarque:</label>
            <textarea
              value={environmentData.remarque}
              onChange={(e) =>
                handleEnvironmentChange('remarque', e.target.value)
              }
            />
          </div>
          <button type="submit" className="btn btn-block btn-danger">
            Mettre à jour
          </button>
        </form>
      </Modal>
    </section>
  )
}

export default ProductEnvironement
