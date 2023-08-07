import React, { useEffect } from 'react'

import Spinner from '../../shared/spinner/Spinner'
import Ticket from '../../shared/ticket/Ticket';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getEnseignes } from '../../../features/enseigne/enseigneSlice';

function ProductPriceRecords({ product }) {


    const { enseignes, isLoading, isError, message } = useSelector(
        (state) => state.enseigne,
    )


    const dispatch = useDispatch()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getEnseignes())
    }, [dispatch, isError, message])

    const enseigneMap = enseignes.data ? enseignes.data.reduce((acc, enseigne) => {
        acc[enseigne._id] = enseigne.name
        return acc
    }, {}) : {};

    if (isLoading || !product || !enseignes.data) {
        return <Spinner />
    }

    return (

        <>
            <div className="ticket-headings">
                <div>Enseigne</div>
                <div>Prix enregistré</div>
                <div>date enregistrement</div>
                <div>identifiant de l'enregistrement</div>
            </div>

            {product.priceReccords ? product.priceReccords.map((record) => (
    <Ticket key={record._id}>
        <div>{enseigneMap[record.enseigne]}</div>
        <div> {record.price} XPF</div>
        <div> {new Date(record.dateRecorded).toLocaleDateString()}</div>
        <div> {record._id}</div>
    </Ticket>
)) : <div>Pas d'enregistrements de prix disponibles</div>}
        </>

    )
}

export default ProductPriceRecords
