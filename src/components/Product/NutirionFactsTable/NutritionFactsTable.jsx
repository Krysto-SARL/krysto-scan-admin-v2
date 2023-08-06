import Spinner from '../../shared/spinner/Spinner';
import  './nutritionFactsTable.css'

function NutritionFactsTable({ nutritionFacts }) {


    if (!nutritionFacts) {
        return <div>Aucune donnée disponible</div>;
      }

  return (
    <table className='nutrition-table '>
      <thead>
        <tr>
          <th>Fait Nutritionnel</th>
          <th>Pour 100g</th>
          <th>Par Portion</th>
        </tr>
      </thead>
      <tbody>
        {nutritionFacts.energy && (
          <tr>
            <td>Énergie</td>
            <td>{nutritionFacts.energy.per100g} kj</td>
            <td>{nutritionFacts.energy.perPortion} kj</td>
          </tr>
        )}
        {nutritionFacts.fats && (
          <tr>
            <td>Graisses</td>
            <td>{nutritionFacts.fats.per100g} gr</td>
            <td>{nutritionFacts.fats.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.monoUnsaturatedFats && (
          <tr>
            <td>Graisses mono-insaturées</td>
            <td>{nutritionFacts.monoUnsaturatedFats.per100g}</td>
            <td>{nutritionFacts.monoUnsaturatedFats.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.polyUnsaturatedFats && (
          <tr>
            <td>Graisses polyinsaturées</td>
            <td>{nutritionFacts.polyUnsaturatedFats.per100g}</td>
            <td>{nutritionFacts.polyUnsaturatedFats.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.transFats && (
          <tr>
            <td>Graisses trans</td>
            <td>{nutritionFacts.transFats.per100g}</td>
            <td>{nutritionFacts.transFats.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.cholesterol && (
          <tr>
            <td>Cholestérol</td>
            <td>{nutritionFacts.cholesterol.per100g}</td>
            <td>{nutritionFacts.cholesterol.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.sodium && (
          <tr>
            <td>Sodium</td>
            <td>{nutritionFacts.sodium.per100g}</td>
            <td>{nutritionFacts.sodium.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.potassium && (
          <tr>
            <td>Potassium</td>
            <td>{nutritionFacts.potassium.per100g} mg</td>
            <td>{nutritionFacts.potassium.perPortion} mg</td>
          </tr>
        )}
        {nutritionFacts.calcium && (
          <tr>
            <td>Calcium</td>
            <td>{nutritionFacts.calcium.per100g} mg</td>
            <td>{nutritionFacts.calcium.perPortion} mg</td>
          </tr>
        )}
        {nutritionFacts.iron && (
          <tr>
            <td>Fer</td>
            <td>{nutritionFacts.iron.per100g}</td>
            <td>{nutritionFacts.iron.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.vitaminA && (
          <tr>
            <td>Vitamine A</td>
            <td>{nutritionFacts.vitaminA.per100g}</td>
            <td>{nutritionFacts.vitaminA.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.vitaminC && (
          <tr>
            <td>Vitamine C</td>
            <td>{nutritionFacts.vitaminC.per100g}</td>
            <td>{nutritionFacts.vitaminC.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.saturatedFats && (
          <tr>
            <td>Graisses saturées</td>
            <td>{nutritionFacts.saturatedFats.per100g} gr</td>
            <td>{nutritionFacts.saturatedFats.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.carbohydrates && (
          <tr>
            <td>Glucides</td>
            <td>{nutritionFacts.carbohydrates.per100g} gr</td>
            <td>{nutritionFacts.carbohydrates.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.sugars && (
          <tr>
            <td>Sucres</td>
            <td>{nutritionFacts.sugars.per100g} gr</td>
            <td>{nutritionFacts.sugars.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.dietaryFibers && (
          <tr>
            <td>Fibres alimentaires</td>
            <td>{nutritionFacts.dietaryFibers.per100g} gr</td>
            <td>{nutritionFacts.dietaryFibers.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.proteins && (
          <tr>
            <td>Protéines</td>
            <td>{nutritionFacts.proteins.per100g} gr</td>
            <td>{nutritionFacts.proteins.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.salt && (
          <tr>
            <td>Sel</td>
            <td>{nutritionFacts.salt.per100g} gr</td>
            <td>{nutritionFacts.salt.perPortion} gr</td>
          </tr>
        )}
        {nutritionFacts.alcohol && (
          <tr>
            <td>Alcool</td>
            <td>{nutritionFacts.alcohol.per100g}</td>
            <td>{nutritionFacts.alcohol.perPortion}</td>
          </tr>
        )}
        {nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils && (
          <tr>
            <td>Fruits, légumes, noix et huiles de colza, noix et olive</td>
            <td>{nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils.per100g} %</td>
            <td>{nutritionFacts.fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils.perPortion} %</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default NutritionFactsTable;
