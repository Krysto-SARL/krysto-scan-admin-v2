import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../features/product/productSlice";
import Modal from "../shared/modal/Modal";
import { toast } from "react-toastify";
import { AiOutlineClose } from 'react-icons/ai';
import TitleSection from "../shared/TitleSection/TitleSection";

function ProductAllergens({ product }) {
  const [isNewAllergenModalOpen, setIsNewAllergenModalOpen] = useState(false);
  const [newAllergenData, setNewAllergenData] = useState({
    allergen: "",
  });

  const dispatch = useDispatch();

  const openNewAllergenModal = () => {
    setIsNewAllergenModalOpen(true);
  };

  const closeNewAllergenModal = () => {
    setIsNewAllergenModalOpen(false);
  };

  const handleNewAllergenChange = (e) => {
    const { value } = e.target;
    setNewAllergenData({
      allergen: value,
    });
  };

  const handleNewAllergenSubmit = (e) => {
    e.preventDefault();
    const newAllergens = newAllergenData.allergen.split(","); // split allergens by comma
    const updatedAllergens = product.allergens.concat(newAllergens); // add new allergens to existing ones
    dispatch(
      updateProduct({
        productId: product.id,
        updatedData: { allergens: updatedAllergens },
      })
    )
      .then(() => {
        toast.success("Le produit a été mis à jour avec succès.");
        closeNewAllergenModal();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(`Une erreur est survenue, merci de réessayer.`);
      });
  };

  const handleAllergenDelete = (indexToDelete) => {
    const updatedAllergens = product.allergens.filter((allergen, index) => index !== indexToDelete);
  
    dispatch(
      updateProduct({
        productId: product.id,
        updatedData: { allergens: updatedAllergens },
      })
    )
      .then(() => {
        toast.success("L'allergène a été supprimé avec succès.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(`Une erreur est survenue, merci de réessayer.`);
      });
  };

  return (
    <>
      <section className="allergens-section">
      <TitleSection title={"Allergénes"}/>
        <div className="section-header">
      
          <button className="btn btn-danger" onClick={openNewAllergenModal}>
            Ajouter des allergènes pour ce produit
          </button>
        </div>
        <h2 className="nb-ingredient">Nombre d'allergènes :  <span> {product.allergens.length}</span>  </h2>
       <div className="ingredient-container">

        {product.allergens.map((allergen, index) => (
            <div className="additive-card ingredient" key={index}>
              {allergen}
              <AiOutlineClose
                className="delete-icon"
                onClick={() => handleAllergenDelete(index)}
              />
            </div>
        ))}
        </div>
      </section>
      <hr />
      <Modal
        titleModal="Ajouter un allergène"
        isOpen={isNewAllergenModalOpen}
        onClose={closeNewAllergenModal}
      >
        <form onSubmit={handleNewAllergenSubmit}>
          <div className="form-group">
            <label htmlFor="allergen">Allergènes (séparés par des virgules)</label>
            <textarea
              id="allergen"
              name="allergen"
              onChange={handleNewAllergenChange}
              value={newAllergenData.allergen || ""}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProductAllergens;
