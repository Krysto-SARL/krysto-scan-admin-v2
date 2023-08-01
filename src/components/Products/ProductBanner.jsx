import React from 'react';
import nova1 from '../../assets/scoresIcon/nova/nova-group-1.png';
import nova2 from '../../assets/scoresIcon/nova/nova-group-2.png';
import nova3 from '../../assets/scoresIcon/nova/nova-group-3.png';
import nova4 from '../../assets/scoresIcon/nova/nova-group-4.png';
import nova_udef from '../../assets/scoresIcon/nova/nova-undef.png';

function ProductBanner({ product }) {
  // Create an object that maps Nova scores to images
  const novaScoreImages = {
    1: nova1,
    2: nova2,
    3: nova3,
    4: nova4,
    'Non défini': nova_udef,
  };

  // Get the image for the current Nova score. If it's undefined, use the undefined image
  const novaImg = novaScoreImages[product.novaScore.score] || nova_udef;

  return (
    <section className="productBanner">
      <div className="img-container">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.photo}`}
          alt=""
        />
      </div>
      <div className="score-container">
        <div className="score">
          <img
            src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.nutriScore.photos}`}
            alt=""
          />
        </div>
        <div className="score">
          <img
            src={novaImg}
            alt=""
          />
        </div>
        <div className="score">
          <img
            src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.ecoScore.photos}`}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default ProductBanner;
