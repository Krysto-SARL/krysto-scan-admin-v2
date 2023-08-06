import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRecords } from '../../features/priceRecord/priceRecordSlice'
import { getEnseignes } from '../../features/enseigne/enseigneSlice'
import { getAveragePrice } from '../../features/product/productSlice'
import Spinner from '../shared/spinner/Spinner'
import { FaTag } from 'react-icons/fa'

function ProductPriceRecords({ product }) {
  const { priceRecords, isLoading, isError } = useSelector((state) => state.priceRecord)
  const { enseignes } = useSelector((state) => state.enseigne)
  const { product: averagePriceProduct } = useSelector((state) => state.product)

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1) // Months are zero-based

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPriceRecords())
    dispatch(getEnseignes())
    dispatch(getAveragePrice({ productId: product._id, year, month }))
  }, [dispatch, product._id, year, month])

  if (isLoading || !priceRecords.data || !enseignes.data || !averagePriceProduct) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  const productPriceRecords = priceRecords.data.filter(
    (priceRecord) => priceRecord.product === product._id,
  )

  return (
    <div className='productPriceRecordsContainer'>
      <h2>Enregistrements de prix pour ce produit </h2>
      <h2>Enseigne la plus chère: <span> {averagePriceProduct.mostExpensiveEnseigneName} - {averagePriceProduct.mostExpensivePrice} XPF  </span></h2>
      <h2>Enseigne la moins chère: <span> {averagePriceProduct.leastExpensiveEnseigneName} - {averagePriceProduct.leastExpensivePrice} XPF</span> </h2>
      <h2>Prix moyen pour le mois sélectionné: {averagePriceProduct.averagePrice}</h2>
      <label>
        Année:
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
      </label>
      <label>
        Mois:
        <input type="number" value={month} onChange={(e) => setMonth(Number(e.target.value))} />
      </label>
      <div className="productPriceRecordContainer">
        {productPriceRecords.map((priceRecord) => {
          const enseigne = enseignes.data.find(
            (enseigne) => enseigne._id === priceRecord.enseigne,
          )
          return (
            <div className='priceRecordCard' key={priceRecord._id}>
              <p>Enseigne: <span>{enseigne ? enseigne.name : 'Inconnue'} </span> </p>
              <p>Prix : <span>{priceRecord.price} XPF</span> </p>
              <p>{priceRecord.promotion ? <p> <FaTag /> En promotion </p> : null}</p>
              <p>Date : <span> {new Date(priceRecord.dateRecorded).toLocaleDateString()}</span> </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductPriceRecords
