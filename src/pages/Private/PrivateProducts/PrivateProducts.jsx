// Importation des différents modules nécessaires pour le composant
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../../components/shared/spinner/Spinner';
import Modal from '../../../components/shared/modal/Modal';
import { BackButton } from '../../../components/shared/BackButton';
import { getProducts, deleteProduct } from '../../../features/product/productSlice';
import { getProductFamilies } from '../../../features/productFamilly/productFamillySclice';
import Ticket from '../../../components/shared/ticket/Ticket';
import { useNavigate } from 'react-router-dom';
import './products.css';
import AddProductForm from '../../../components/Products/AddProductForm';
import SearchBar from '../../../components/shared/searchBar/SearchBar';
import { getProductCategories } from '../../../features/productCategory/productCategorySlice';
// Importation des icônes de redirection
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';

function PrivateProducts() {
  // On utilise useSelector pour récupérer des informations dans le store Redux
  const { products, isLoading, isError, message } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.productCategory);
  const { productFamilies } = useSelector((state) => state.productFamily);

  // Utilisation de useState pour gérer le state local
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noPhotoFilter, setNoPhotoFilter] = useState(false);

  const dispatch = useDispatch();  // Dispatch est utilisé pour envoyer des actions à Redux
  const navigate = useNavigate();  // useNavigate remplace useHistory pour la navigation

  const handleProductClick = (id, event) => {
    if (!event.defaultPrevented) {
      navigate(`/private/product/${id}`);  // Navigation vers la page du produit
    }
  };

  // Les useEffect sont utilisés pour lancer des actions au chargement du composant
  useEffect(() => {
    if (isError) {
      toast.error(message);  // Si une erreur est présente, on l'affiche
    }
    dispatch(getProducts());  // On charge les produits
    dispatch(getProductCategories());  // On charge les catégories de produits
    dispatch(getProductFamilies())
  }, [dispatch, isError, message]);

  // Ce useEffect filtre les produits en fonction des critères de recherche et du filtre "sans photo"
  useEffect(() => {
    if (products.data && productCategories.data) {
      let filtered = products.data;
      if (searchTerm) {
        filtered = filtered.filter((product) => {
          const productCategory = productCategories.data.find(category => category.id === product.productCategory);
          return (
            product.designation && product.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productFamilly && product.productFamilly.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.marque && product.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.codeBarre.includes(searchTerm) ||
            (productCategory && productCategory.name && productCategory.name.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        });
      }
  
      if (noPhotoFilter) {
        filtered = filtered.filter((product) => product.photo === 'no-photo.png' || product.photo === undefined || product.photo === '');
      }
      setFilteredProducts(filtered);  // On met à jour la liste filtrée des produits
    }
  }, [products, searchTerm, productCategories, noPhotoFilter]);

  const openNewProductModal = () => {
    setIsNewProductModalOpen(true);  // Ouverture de la modal pour la création d'un produit
  };

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false);  // Fermeture de la modal
  };

  const handleDelete = async (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await dispatch(deleteProduct(id));  // Suppression du produit
        toast.success('Produit supprimé avec succès !');
        dispatch(getProducts());  // On recharge les produits
      } catch (error) {
        toast.error('Erreur lors de la suppression du produit');
      }
    }
  };

  // Gestion de l'affichage en fonction du chargement, des erreurs et des données disponibles
  if (isLoading || !products.data || !productCategories.data || !productFamilies.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  // Affichage principal du composant
  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des produits</h1>
        <h2>Nombres de produits : <span>{products.data.length}</span></h2>
        <div className="formInput">
          <input type="checkbox" checked={noPhotoFilter} onChange={(e) => setNoPhotoFilter(e.target.checked)} /> Afficher uniquement les produits sans photo
        </div>
      </section>
      <button onClick={openNewProductModal} className="btn">
        Créer un nouveau produit
      </button>
      <SearchBar onSearch={setSearchTerm} />

      <div className="ticket-headings">
        <div>Image</div>
        <div>Désignation</div>
        <div>Catégorie</div>
        <div>Date création</div>
        <div>Actions</div>
      </div>

      {filteredProducts.map((product) => {

  const productCategory = productCategories.data.find(category => category.id === product.productCategory);


  return (
    <Ticket key={product.id}>
      <div className="ticket-image">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.photo}`}
          alt={product.designation}
        />
      </div>
      <div>{product.designation}</div>
      <div>{productCategory ? productCategory.name : 'Non spécifié'}</div>
      <div>{new Date(product.createdAt).toLocaleDateString()}</div>
      <div>
        <button onClick={(event) => handleProductClick(product.id, event)} style={{ background: 'none', border: 'none', color: 'green', marginRight:'20px' }}>
          <AiOutlineEye size={20} />
        </button>
        <button onClick={(event) => handleDelete(product.id, event)} style={{ background: 'none', border: 'none', color: 'red' }}>
          <AiOutlineDelete size={20} />
        </button>
      </div>
    </Ticket>
  );
})}

      <Modal
        titleModal="Créer un nouveau produit"
        btnTxt="Créer"
        isOpen={isNewProductModalOpen}
        onClose={closeNewProductModal}
      >
        <AddProductForm closeModal={closeNewProductModal} />
      </Modal>
    </>
  );
}

export default PrivateProducts;
