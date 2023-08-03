import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'

import { getMarque} from '../../../features/marque/marqueSlice'


function PrivateMarque() {
  const { marque, isLoading, isError, message } = useSelector(
    (state) => state.marque,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getMarque(params.id))
  }, [dispatch, isError, message, params.id])


   console.log(marque);
  console.log(marque.data)
  if (isLoading || !marque.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <section className="headings">
      <h1>{marque.data.name}</h1>
      <h2>{marque.data.subname}</h2>
     
    </section>
  )
}

export default PrivateMarque
