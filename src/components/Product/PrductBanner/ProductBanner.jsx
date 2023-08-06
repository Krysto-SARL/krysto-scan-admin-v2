import { useEffect, useState } from 'react'
import './ProductBanner.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiCopy } from 'react-icons/fi'
function ProductBanner({ product }) {
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 3000) // réinitialiser après 3 secondes
    }
  }, [isCopied])
  return (
    <>
    <section className="productBanner">
      <div className="product-img-container">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.photo}`}
          alt=""
        />
      </div>
      <div className="product-banner-txt-container">
        <h1 className="product-title">{product.designation}</h1>
        <h2>
     
          code barre : {product.codeBarre} <span>

          <CopyToClipboard
            text={product.codeBarre}
            onCopy={() => setIsCopied(true)}
          >
            <button className="btn btn-sm">
              {isCopied ? 'Copié' : <FiCopy />}
            </button>
          </CopyToClipboard>
          </span>
        </h2>
       
   
      </div>
    </section>
 

    </>
  )
}

export default ProductBanner