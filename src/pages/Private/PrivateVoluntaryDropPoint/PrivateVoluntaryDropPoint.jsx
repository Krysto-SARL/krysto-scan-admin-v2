import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVoluntaryDropPoint } from '../../../features/voluntaryDropPoint/voluntaryDropPointSlice'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function PrivateVoluntaryDropPoint() {
  const { voluntaryDropPoint, isLoading, isError, message } = useSelector(
    (state) => state.voluntaryDropPoint,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getVoluntaryDropPoint(params.id))
  }, [dispatch, isError, message, params.id])

  console.log(voluntaryDropPoint.data)
  if (isLoading || !voluntaryDropPoint.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }
  return (
    <section className="headings">
      <h1>{voluntaryDropPoint.data.organisme}</h1>
      <h1>{voluntaryDropPoint.data.adresse}</h1>
      <h3>Types de déchets:</h3>
      <div className="plasticTypeProduct-container">
        {voluntaryDropPoint.data.garbageTypes && voluntaryDropPoint.data.garbageTypes.length > 0 ? (
          voluntaryDropPoint.data.garbageTypes.map((garbage) => <div>{garbage.name}</div>)
        ) : (
          <div>Pas de données disponibles</div>
        )}
      </div>
  
      <section>
        <h3 className="title">Geolocalisation</h3>

        <div className="leaflet-container">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[
              voluntaryDropPoint.data.location.coordinates[1],
              voluntaryDropPoint.data.location.coordinates[0],
            ]}
            zoom={14}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                voluntaryDropPoint.data.location.coordinates[1],
                voluntaryDropPoint.data.location.coordinates[0],
              ]}
            >
              <Popup>
                {voluntaryDropPoint.data.location.formattedAddress} <br />
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </section>
  )
}

export default PrivateVoluntaryDropPoint
