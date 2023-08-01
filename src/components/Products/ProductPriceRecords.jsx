import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRecords } from '../../features/priceRecord/priceRecordSlice'
import { getEnseignes } from '../../features/enseigne/enseigneSlice'
import Spinner from '../shared/spinner/Spinner'
import { FaTag } from 'react-icons/fa'

function ProductPriceRecords({ product }) {
  const { priceRecords, isLoading, isError } = useSelector(
    (state) => state.priceRecord,
  )
  const { enseignes } = useSelector(
    (state) => state.enseigne,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPriceRecords())
    dispatch(getEnseignes())
  }, [dispatch])

  if (isLoading || !priceRecords.data || !enseignes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  const productPriceRecords = priceRecords.data.filter(
    (priceRecord) => priceRecord.product === product._id,
  )

  let mostExpensiveRecord, leastExpensiveRecord;

  if (productPriceRecords.length > 0) {
    mostExpensiveRecord = productPriceRecords.reduce((prev, current) => {
      return (prev.price > current.price) ? prev : current
    });

    leastExpensiveRecord = productPriceRecords.reduce((prev, current) => {
      return (prev.price < current.price) ? prev : current
    });
  }

  let mostExpensiveEnseigne, leastExpensiveEnseigne;

  if (mostExpensiveRecord) {
    mostExpensiveEnseigne = enseignes.data.find(enseigne => enseigne._id === mostExpensiveRecord.enseigne);
  }

  if (leastExpensiveRecord) {
    leastExpensiveEnseigne = enseignes.data.find(enseigne => enseigne._id === leastExpensiveRecord.enseigne);
  }

  return (
    <div className='productPriceRecordsContainer'>
      <h2>Enregistrements de prix pour ce produit </h2>
      <h2>Enseigne la plus chère: <span> {mostExpensiveEnseigne ? mostExpensiveEnseigne.name : 'Inconnue'} - {mostExpensiveRecord ? mostExpensiveRecord.price : 'N/A'} XPF  </span></h2>
      <h2>Enseigne la moins chère: <span> {leastExpensiveEnseigne ? leastExpensiveEnseigne.name : 'Inconnue'} - {leastExpensiveRecord ? leastExpensiveRecord.price : 'N/A'} XPF</span> </h2>
      <div className="productPriceRecordContainer">

      {productPriceRecords.map((priceRecord) => {
          const enseigne = enseignes.data.find(
              (enseigne) => enseigne._id === priceRecord.enseigne,
              )
              return (
                  <div className='priceRecordCard' key={priceRecord._id}>
            <p>Enseigne: <span>{enseigne ? enseigne.name : 'Inconnue'} </span> </p>
            <p>Prix : <span>{priceRecord.price} XPF</span> </p>
            <p>{priceRecord.promotion ?    <p>  <FaTag /> En promotion </p>   : null}</p>
            <p>Date :  <span> { new Date(priceRecord.dateRecorded).toLocaleDateString()}</span> </p>
          </div>
        )
    })}
    </div>
    </div>
  )
}

export default ProductPriceRecords
