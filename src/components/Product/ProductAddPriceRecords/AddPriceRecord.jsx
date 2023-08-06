import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPriceRecordForProduct,
  getPriceRecords,
} from '../../../features/priceRecord/priceRecordSlice'
import Modal from '../../shared/modal/Modal'
import { toast } from 'react-toastify'
import { getEnseignes } from '../../../features/enseigne/enseigneSlice'
import Spinner from '../../shared/spinner/Spinner'

function AddPriceRecord({ product }) {
  const { enseignes, isLoading, isError, message } = useSelector(
    (state) => state.enseigne,
  )
  const { priceRecords } = useSelector((state) => state.priceRecord)

  const [isNewPriceRecordModalOpen, setIsNewPriceRecordModalOpen] = useState(
    false,
  )
  const [newPriceRecordData, setNewPriceRecordData] = useState({
    enseigne: '',
    price: '',
    promotion: false,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getEnseignes())
    dispatch(getPriceRecords())
  }, [dispatch, isError, message])

  const openNewPriceRecordModal = () => {
    setIsNewPriceRecordModalOpen(true)
  }

  const closeNewPriceRecordModal = () => {
    setIsNewPriceRecordModalOpen(false)
  }

  const handleNewPriceRecordChange = (e) => {
    const { name, value } = e.target
    setNewPriceRecordData({
      ...newPriceRecordData,
      [name]: value,
    })
  }

  const handleNewPriceRecordSubmit = (e) => {
    e.preventDefault()
    console.log(newPriceRecordData)
    dispatch(
      createPriceRecordForProduct({
        productId: product._id,
        priceRecordData: newPriceRecordData,
      }),
    )
      .then(() => {
        toast.success('Le nouveau record de prix a été créé avec succès.')
        closeNewPriceRecordModal()
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
      .catch((error) => {
        toast.error(`Une erreur est survenue, merci de réessayer.`)
      })
  }
  // Filtrer les priceRecords pour obtenir seulement ceux liés à ce produit
const productPriceRecords = priceRecords.data ? priceRecords.data.filter(record => record.product === product._id) : [];

  if (isLoading || !enseignes.data || !priceRecords) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <hr />
      <h2 style={{ marginTop: '20px' }}>
  prix enregistrées : <span>{productPriceRecords.length}</span>
</h2>

      <button onClick={openNewPriceRecordModal} className="btn">
        Ajouter un nouveau record de prix
      </button>
      <hr />

      <Modal
        titleModal="Ajouter un nouveau record de prix"
        isOpen={isNewPriceRecordModalOpen}
        onClose={closeNewPriceRecordModal}
      >
        <form onSubmit={handleNewPriceRecordSubmit}>
          <div className="form-group">
            <label htmlFor="enseigne">Enseigne</label>
            <select
              name="enseigne"
              required
              onChange={handleNewPriceRecordChange}
              value={newPriceRecordData.enseigne}
            >
              {enseignes.data.map((enseigne) => (
                <option key={enseigne._id} value={enseigne._id}>
                  {enseigne.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              name="price"
              required
              onChange={handleNewPriceRecordChange}
              value={newPriceRecordData.price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="promotion">Promotion</label>
            <input
              type="checkbox"
              name="promotion"
              onChange={(e) =>
                handleNewPriceRecordChange({
                  target: { name: e.target.name, value: e.target.checked },
                })
              }
              checked={newPriceRecordData.promotion}
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

export default AddPriceRecord
