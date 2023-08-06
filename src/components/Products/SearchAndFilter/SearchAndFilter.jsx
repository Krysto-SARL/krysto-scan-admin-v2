import React from 'react'
import SearchBar from '../../../components/shared/searchBar/SearchBar'
import './searchAndFilter.css'

function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  noPhotoFilter,
  setNoPhotoFilter,
  selectedFamily,
  setSelectedFamily,
  productFamilies, // Nous devons également passer les familles de produits pour les afficher dans le sélecteur
}) {
  return (
    <div className="search-and-filter">
      <div className="formInput filterPhoto">
        <label htmlFor="">Afficher uniquement les produits sans photo</label>
        <input
          type="checkbox"
          checked={noPhotoFilter}
          onChange={(e) => setNoPhotoFilter(e.target.checked)}
        />
      </div>
      <div className="form-group">

      <div className="formInput filterFamily">
        <label htmlFor="familySelect">Filtrer par famille de produits</label>
        <select
          id="familySelect"
          value={selectedFamily}
          onChange={(e) => setSelectedFamily(e.target.value)}
          >
          <option value="">Sélectionner une famille de produits</option>
          {productFamilies &&
            productFamilies.data &&
            productFamilies.data.map((family) => (
                <option key={family.id} value={family.id}>
                {family.name}
              </option>
            ))}
        </select>
      </div>
            </div>
      <SearchBar onSearch={setSearchTerm} />
    </div>
  )
}

export default SearchAndFilter
