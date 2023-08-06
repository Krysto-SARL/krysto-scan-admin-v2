import React, { useState } from 'react';
import Modal from '../../shared/modal/Modal';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../features/product/productSlice'; // Mettez à jour le chemin d'accès si nécessaire
import './productGeneralInformation.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import TitleSection from '../../shared/TitleSection/TitleSection';
import BigTitle from '../../shared/BigTitle/BigTitle';

function ProductGeneralInformation({ product }) {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [designation, setDesignation] = useState(product.designation);
  const [genericName, setGenericName] = useState(product.genericName);
  const [quantity, setQuantity] = useState(product.quantity);
  const [containsPalmOil, setContainsPalmOil] = useState(product.containsPalmOil);
  const [bio, setBio] = useState(product.bio);
  const [containsGluten, setContainsGluten] = useState(product.containsGluten);
  const [selectedProvenanceCountry, setSelectedProvenanceCountry] = useState(product.provenanceCountry || '');
  const [selectedTransportation, setSelectedTransportation] = useState(product.transportation || 'Inconnu');


  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    
    const updatedData = {
        designation,
        genericName,
        quantity,
        containsPalmOil,
        bio,
        containsGluten,
        provenanceCountry: selectedProvenanceCountry,
        transportation: selectedTransportation
      };

    // Appelez l'action avec l'ID du produit et les données mises à jour
    dispatch(updateProduct({ productId: product.id, updatedData }))
      .then(() => {
        closeEditModal();
      })
      .catch((error) => {
        // Gérez l'erreur ici si nécessaire
      });
  };

  return (
    <>
      <section className="general-info">
     
      
       
        <h2>Provenance : <span>{product.provenanceCountry ? product.provenanceCountry : 'non défini'}</span></h2>
        <h2>Transportation : <span>{product.transportation}</span></h2>

        <div className="genericName">
            <h3>Nom générique</h3>
            <h4>{product.genericName}</h4>
        </div>
        <div className="general-info-container">
          <div>
            <h3>Quantité</h3>
            <p>{quantity}</p>
          </div>
          <div>
            <h3>Fabrication</h3>
            <p>{product.transportation}</p>
          </div>
          <div>
            <h3>Gluten</h3>
            <p>{product.containsGluten ? <FaCheck className="icon-yes" /> : <FaTimes className="icon-no" />}</p>
          </div>
          <div>
            <h3>Huile de palme</h3>
            <p>{product.containsPalmOil ? <FaCheck className="icon-yes" /> : <FaTimes className="icon-no" />}</p>
          </div>
          <div>
            <h3>Bio</h3>
            <p>{product.bio ? <FaCheck className="icon-yes" /> : <FaTimes className="icon-no" />}</p>
          </div>
        </div>
      </section>
      <button onClick={openEditModal} className="btn btn-danger btn-block">
          Modifier les informations
        </button>
      <hr />
      <Modal
        titleModal="Modifier les informations générales"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>Designation:</label>
            <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </div>
          {/* Autres champs du formulaire */}
          <div className="form-group">
            <label>Nom générique:</label>
            <input type="text" value={genericName} onChange={(e) => setGenericName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Quantité:</label>
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Contient de l'huile de palme:</label>
            <input type="checkbox" checked={containsPalmOil} onChange={(e) => setContainsPalmOil(e.target.checked)} />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <input type="checkbox" checked={bio} onChange={(e) => setBio(e.target.checked)} />
          </div>
          <div className="form-group">
            <label>Contient du gluten:</label>
            <input type="checkbox" checked={containsGluten} onChange={(e) => setContainsGluten(e.target.checked)} />
          </div>
          <div className="form-group">
            <label>Provenance Country:</label>
            <input type="text" value={selectedProvenanceCountry} onChange={(e) => setSelectedProvenanceCountry(e.target.value)} />
          </div>

          {/* Ajout d'un champ pour transportation */}
          <div className="form-group">
            <label>Transportation:</label>
            <select value={selectedTransportation} onChange={(e) => setSelectedTransportation(e.target.value)}>
              <option value="Fabriquée en Nouvelle-Calédonie">Fabriquée en Nouvelle-Calédonie</option>
              <option value="Transformée en Nouvelle-Calédonie">Transformée en Nouvelle-Calédonie</option>
              <option value="Inconnu">Inconnu</option>
              <option value="Importée">Importée</option>
            </select>
          </div>
          <button type="submit" className="btn btn-block btn-danger">Enregistrer</button>
        </form>
      </Modal>
    </>
  );
}

export default ProductGeneralInformation;
