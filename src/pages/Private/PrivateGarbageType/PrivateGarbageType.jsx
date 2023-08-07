import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGarbageType } from '../../../features/garbageType/garbageTypeSlice';
import Spinner from '../../../components/shared/spinner/Spinner';

function PrivateGarbageType() {

    const { garbageType, isLoading, isError, message } = useSelector(
        (state) => state.garbageType
      );
      const params = useParams();
      const dispatch = useDispatch();



      useEffect(() => {
        if (isError) {
          toast.error(message);
        }
        dispatch(getGarbageType(params.id));
      }, [dispatch, isError, message, params.id]);


      console.log(garbageType.data);
      if (isLoading || !garbageType.data) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>;
      }


  return (
    <div>
        <h1>{garbageType.data.name}</h1>
    </div>
  )
}

export default PrivateGarbageType