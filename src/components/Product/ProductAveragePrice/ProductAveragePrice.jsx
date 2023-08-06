import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAveragePrice, reset } from '../../../features/product/productSlice'
import './procductAveragePrice.css'

function ProductAveragePrice({ product  }) {
  const { averagePriceInfo } = useSelector((state) => state.product)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1) // Months are zero-based
  const [productId, setProductId] = useState(product._id) // Set initial productId state

  const dispatch = useDispatch()

  // Reset averagePriceInfo when product id changes
  useEffect(() => {
    if (productId !== product._id) {
      // Check if productId has changed
      setProductId(product._id) // Update productId state
      dispatch(reset()) // Reset averagePriceInfo
    }
  }, [product._id, dispatch, productId])


  
  const handleSearchClick = () => {
    if (product._id) {
      dispatch(getAveragePrice({ productId: product._id, year, month }))
    } else {
      console.error('Product ID is undefined')
    }
  }

  const handleYearChange = (e) => {
    setYear(Number(e.target.value))
  }

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value))
  }

  return (
    <>
      <div className="productPriceRecordsContainer">

          <h2>Enregistrements de prix pour ce produit</h2>
            <div className="form-group-container">
        <div className="form-group">
          <label>
            Année:
            <input type="number" value={year} onChange={handleYearChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Mois:
            <input type="number" value={month} onChange={handleMonthChange} />
          </label>
        </div>
            <div className="form-group"></div>
        <button className="btn btn-block" onClick={handleSearchClick}>
          Chercher
        </button>
            </div>
      </div>
      <div>
        {averagePriceInfo?.data ? (
          <div className="averagePriceInfoContainer">
            <div className="price-info">
              <div className="card-info moins">
                <p> Le moins cher</p>
                <p>{averagePriceInfo.data.minPrice} XPF</p>
                <p>{averagePriceInfo.data.minPriceEnseigne.name}</p>
              </div>

              <div className="card-info moyen">
                <p> Prix moyen</p>
                <p>{averagePriceInfo.data.avgPrice} XPF</p>
              </div>
              <div className="card-info plus">
                <p> Le plus cher</p>
                <p>{averagePriceInfo.data.maxPrice} XPF</p>

                <p>  {averagePriceInfo.data.maxPriceEnseigne.name}</p>
              </div>
            </div>
            <div className="enseigne-info">
              <div>
              
                
              </div>
            
            </div>
          </div>
        ) : (
          <p className="noData">Aucune donnée disponible !</p>
        )}
      </div>
    </>
  )
}

export default ProductAveragePrice
