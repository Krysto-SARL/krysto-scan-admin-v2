import React, { useState } from 'react';
import TitleSection from '../../shared/TitleSection/TitleSection';
import Modal from '../../shared/modal/Modal';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../features/product/productSlice';

function ProductNutritionFacts({ product }) {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [nutritionFacts, setNutritionFacts] = useState(product.nutritionFacts || {});

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ productId: product.id, updatedData: { nutritionFacts } }))
      .then(() => {
        closeEditModal();
      })
      .catch((error) => {
        // Handle error here if necessary
      });
  };

  return (
    <>
      <section className="nutrition-facts">
        <TitleSection title={"Apport nutritionel"} />
        {/* Display Nutrition Facts */}
        {/* You can modify the display to suit your application's styling */}
        <div>
          <h3>Énergie: {nutritionFacts.energy?.per100g} per 100g, {nutritionFacts.energy?.perPortion} per Portion</h3>
          <h3>Graisses: {nutritionFacts.fats?.per100g} per 100g, {nutritionFacts.fats?.perPortion} per Portion</h3>
          {/* ... Add other nutrition facts here ... */}
        </div>
        <button onClick={openEditModal} className="btn btn-danger">Modifier les faits nutritionnels</button>
      </section>

      <Modal
        titleModal="Modifier les faits nutritionnels"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
<form onSubmit={handleEditSubmit}>
<div className="form-group">
    <label>Taille de Portion:</label>
    <input type="text" value={nutritionFacts.portionSize} onChange={(e) => setNutritionFacts({ ...nutritionFacts, portionSize: e.target.value })} />
  </div>
  <h3>Énergie</h3>
  <div className="form-group-container">

  <div className="form-group">
    <label>Énergie par 100g:</label>
    <input type="number" value={nutritionFacts.energy?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, energy: { ...nutritionFacts.energy, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Énergie par Portion:</label>
    <input type="number" value={nutritionFacts.energy?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, energy: { ...nutritionFacts.energy, perPortion: e.target.value } })} />
  </div>

  </div>
  <h3>Graisses</h3>
  <div className="form-group-container">

  <div className="form-group">
    <label>Graisses par 100g:</label>
    <input type="number" value={nutritionFacts.fats?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, fats: { ...nutritionFacts.fats, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses par Portion:</label>
    <input type="number" value={nutritionFacts.fats?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, fats: { ...nutritionFacts.fats, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses saturées par 100g:</label>
    <input type="number" value={nutritionFacts.saturatedFats?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, saturatedFats: { ...nutritionFacts.saturatedFats, per100g: e.target.value } })} />
  </div>
  </div>
  <div className="form-group-container">

  <div className="form-group">
    <label>Graisses saturées par Portion:</label>
    <input type="number" value={nutritionFacts.saturatedFats?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, saturatedFats: { ...nutritionFacts.saturatedFats, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses mono-insaturées par 100g:</label>
    <input type="number" value={nutritionFacts.monoUnsaturatedFats?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, monoUnsaturatedFats: { ...nutritionFacts.monoUnsaturatedFats, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses mono-insaturées par Portion:</label>
    <input type="number" value={nutritionFacts.monoUnsaturatedFats?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, monoUnsaturatedFats: { ...nutritionFacts.monoUnsaturatedFats, perPortion: e.target.value } })} />
  </div>
  </div>
  <div className="form-group-container">

  <div className="form-group">
    <label>Graisses polyinsaturées par 100g:</label>
    <input type="number" value={nutritionFacts.polyUnsaturatedFats?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, polyUnsaturatedFats: { ...nutritionFacts.polyUnsaturatedFats, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses polyinsaturées par Portion:</label>
    <input type="number" value={nutritionFacts.polyUnsaturatedFats?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, polyUnsaturatedFats: { ...nutritionFacts.polyUnsaturatedFats, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses trans par 100g:</label>
    <input type="number" value={nutritionFacts.transFats?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, transFats: { ...nutritionFacts.transFats, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Graisses trans par Portion:</label>
    <input type="number" value={nutritionFacts.transFats?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, transFats: { ...nutritionFacts.transFats, perPortion: e.target.value } })} />
  </div>
  </div>

  <h3>Cholestérol et Sodium</h3>
  <div className="form-group-container">

  <div className="form-group">
    <label>Cholestérol par 100g:</label>
    <input type="number" value={nutritionFacts.cholesterol?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, cholesterol: { ...nutritionFacts.cholesterol, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Cholestérol par Portion:</label>
    <input type="number" value={nutritionFacts.cholesterol?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, cholesterol: { ...nutritionFacts.cholesterol, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Sodium par 100g:</label>
    <input type="number" value={nutritionFacts.sodium?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, sodium: { ...nutritionFacts.sodium, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Sodium par Portion:</label>
    <input type="number" value={nutritionFacts.sodium?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, sodium: { ...nutritionFacts.sodium, perPortion: e.target.value } })} />
  </div>
  </div>

  <h3>Minéraux</h3>

  <div className="form-group-container">

  <div className="form-group">
    <label>Potassium par 100g:</label>
    <input type="number" value={nutritionFacts.potassium?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, potassium: { ...nutritionFacts.potassium, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Potassium par Portion:</label>
    <input type="number" value={nutritionFacts.potassium?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, potassium: { ...nutritionFacts.potassium, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Calcium par 100g:</label>
    <input type="number" value={nutritionFacts.calcium?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, calcium: { ...nutritionFacts.calcium, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Calcium par Portion:</label>
    <input type="number" value={nutritionFacts.calcium?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, calcium: { ...nutritionFacts.calcium, perPortion: e.target.value } })} />
  </div>
  </div>

  <div className="form-group-container">

  <div className="form-group">
    <label>Fer par 100g:</label>
    <input type="number" value={nutritionFacts.iron?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, iron: { ...nutritionFacts.iron, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Fer par Portion:</label>
    <input type="number" value={nutritionFacts.iron?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, iron: { ...nutritionFacts.iron, perPortion: e.target.value } })} />
  </div>

  </div>
  <h3>Vitamines</h3>

  <div className="form-group-container">

  <div className="form-group">
    <label>Vitamine A par 100g:</label>
    <input type="number" value={nutritionFacts.vitaminA?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, vitaminA: { ...nutritionFacts.vitaminA, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Vitamine A par Portion:</label>
    <input type="number" value={nutritionFacts.vitaminA?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, vitaminA: { ...nutritionFacts.vitaminA, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Vitamine C par 100g:</label>
    <input type="number" value={nutritionFacts.vitaminC?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, vitaminC: { ...nutritionFacts.vitaminC, per100g: e.target.value } })} />
  </div>
  </div>
  <div className="form-group">
    <label>Vitamine C par Portion:</label>
    <input type="number" value={nutritionFacts.vitaminC?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, vitaminC: { ...nutritionFacts.vitaminC, perPortion: e.target.value } })} />
  </div>

  <h3>Macronutriments</h3>
  <div className="form-group-container">

  <div className="form-group">
    <label>Protéines par 100g:</label>
    <input type="number" value={nutritionFacts.proteins?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, proteins: { ...nutritionFacts.proteins, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Protéines par Portion:</label>
    <input type="number" value={nutritionFacts.proteins?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, proteins: { ...nutritionFacts.proteins, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Glucides par 100g:</label>
    <input type="number" value={nutritionFacts.carbohydrates?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, carbohydrates: { ...nutritionFacts.carbohydrates, per100g: e.target.value } })} />
  </div>
  </div>

  <div className="form-group-container">

  <div className="form-group">
    <label>Glucides par Portion:</label>
    <input type="number" value={nutritionFacts.carbohydrates?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, carbohydrates: { ...nutritionFacts.carbohydrates, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Sucres par 100g:</label>
    <input type="number" value={nutritionFacts.sugars?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, sugars: { ...nutritionFacts.sugars, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Sucres par Portion:</label>
    <input type="number" value={nutritionFacts.sugars?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, sugars: { ...nutritionFacts.sugars, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Fibres alimentaires par 100g:</label>
    <input type="number" value={nutritionFacts.dietaryFibers?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, dietaryFibers: { ...nutritionFacts.dietaryFibers, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Fibres alimentaires par Portion:</label>
    <input type="number" value={nutritionFacts.dietaryFibers?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, dietaryFibers: { ...nutritionFacts.dietaryFibers, perPortion: e.target.value } })} />
  </div>
  </div>

  <h3>Autres</h3>

  <div className="form-group-container">

  <div className="form-group">
    <label>Sel par 100g:</label>
    <input type="number" value={nutritionFacts.salt?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, salt: { ...nutritionFacts.salt, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Sel par Portion:</label>
    <input type="number" value={nutritionFacts.salt?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, salt: { ...nutritionFacts.salt, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Alcool par 100g:</label>
    <input type="number" value={nutritionFacts.alcohol?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, alcohol: { ...nutritionFacts.alcohol, per100g: e.target.value } })} />
  </div>
  </div>
  <div className="form-group-container">

  <div className="form-group">
    <label>Alcool par Portion:</label>
    <input type="number" value={nutritionFacts.alcohol?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, alcohol: { ...nutritionFacts.alcohol, perPortion: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Fruits, légumes, noix et huiles de colza, noix et olive par 100g:</label>
    <input type="number" value={nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils?.per100g} onChange={(e) => setNutritionFacts({ ...nutritionFacts, fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils: { ...nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils, per100g: e.target.value } })} />
  </div>
  <div className="form-group">
    <label>Fruits, légumes, noix et huiles de colza, noix et olive par Portion:</label>
    <input type="number" value={nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils?.perPortion} onChange={(e) => setNutritionFacts({ ...nutritionFacts, fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils: { ...nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils, perPortion: e.target.value } })} />
  </div>
  </div>

  <h3>Informations Générales</h3>
  <div className="form-group">
    <label>Taille de la portion:</label>
    <input type="text" value={nutritionFacts.portionSize} onChange={(e) => setNutritionFacts({ ...nutritionFacts, portionSize: e.target.value })} />
  </div>
 

  <button type="submit" className="btn btn-danger">Enregistrer</button>
</form>



      </Modal>
    </>
  );
}

export default ProductNutritionFacts;
