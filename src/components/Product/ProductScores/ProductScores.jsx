import React, { useEffect, useState } from 'react'
import TitleSection from '../../shared/TitleSection/TitleSection'
import './productScores.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNutriScores } from '../../../features/nutriScore/nutriScoreSlice'
import { getNovaScores } from '../../../features/novaScore/novaScoreSlice'
import { getEcoScores } from '../../../features/ecoScore/ecoScoreSlice'
import { updateProduct } from '../../../features/product/productSlice'; // importer l'action pour mettre à jour un produit
import Spinner from '../../shared/spinner/Spinner'
import { toast } from 'react-toastify'
import Modal from '../../shared/modal/Modal'
function ProductScores({product}) {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


 // Vérifiez que les scores sont définis avant d'accéder à leurs propriétés
 const [selectedEcoScore, setSelectedEcoScore] = useState(product.ecoScore ? product.ecoScore.id : null);
 const [selectedNovaScore, setSelectedNovaScore] = useState(product.novaScore ? product.novaScore.id : null);
 const [selectedNutriScore, setSelectedNutriScore] = useState(product.nutriScore ? product.nutriScore.id : null);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
  
    const handleScoresUpdate = async (e) => {
        e.preventDefault();
        try {
          await dispatch(updateProduct({
            productId: product.id,
            updatedData: {
              ecoScore: selectedEcoScore,
              novaScore: selectedNovaScore,
              nutriScore: selectedNutriScore
            }
          })).unwrap(); // Utilisez unwrap pour capturer les erreurs potentielles
          
          toast.success("Les scores ont été mis à jour avec succès!");
          
          // Rechargez la page après 3 secondes
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } catch (error) {
          // Gérez les erreurs ici si nécessaire
          toast.error("Une erreur est survenue lors de la mise à jour des scores.");
        }
        
        closeEditModal();
      };

    const { ecoScores, isLoading, isError, message } = useSelector(
        (state) => state.ecoScore,
      )
      const { novaScores } = useSelector(
        (state) => state.novaScore,
      )
      const { nutriScores } = useSelector(
        (state) => state.nutriScore,
      )
    
      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getNutriScores())
        dispatch(getNovaScores())
        dispatch(getEcoScores())
      }, [dispatch, isError, message])
    
     
    
      if (isLoading || !ecoScores.data || !nutriScores.data || !novaScores.data) {
        return <Spinner />
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }
    
    
  return (
    <section>
        <TitleSection title={"Scores"}/>
        <button onClick={openEditModal} className="btn btn-danger">Modifier les scores</button>

        <div className="scores-container">
  <div className="score">
    {product.ecoScore ? (
      <img
        src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.ecoScore.photos}`}
        alt=""
      />
    ) : (
      <p>Score Eco non disponible</p>
    )}
  </div>
  <div className="score">
    {product.novaScore ? (
      <img
        src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.novaScore.photos}`}
        alt=""
      />
    ) : (
      <p>Score Nova non disponible</p>
    )}
  </div>
  <div className="score">
    {product.nutriScore ? (
      <img
        src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.nutriScore.photos}`}
        alt=""
      />
    ) : (
      <p>Score Nutri non disponible</p>
    )}
  </div>
</div>


      <Modal
        titleModal="Modifier les scores du produit"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <form onSubmit={handleScoresUpdate}>
          <div className="form-group">
            <label>EcoScore:</label>
            <select value={selectedEcoScore} onChange={(e) => setSelectedEcoScore(e.target.value)}>
              {ecoScores.data.map(score => <option key={score.id} value={score.id}>{score.score}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>NovaScore:</label>
            <select value={selectedNovaScore} onChange={(e) => setSelectedNovaScore(e.target.value)}>
              {novaScores.data.map(score => <option key={score.id} value={score.id}>{score.score}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>NutriScore:</label>
            <select value={selectedNutriScore} onChange={(e) => setSelectedNutriScore(e.target.value)}>
              {nutriScores.data.map(score => <option key={score.id} value={score.id}>{score.score}</option>)}
            </select>
          </div>
     
          <button type="submit" className="btn">Mettre à jour</button>
        </form>
      </Modal>
    </section>
  )
}

export default ProductScores