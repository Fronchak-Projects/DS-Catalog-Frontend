import ButtonIcon from '../../components/ButtonIcon';
import Image from '../../assets/imgs/main-image.svg';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-content-container">
          <h1>Conheça o melhor catálogo de produtos</h1>
          <p>Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.</p>
          <div className="button-icon-container">
            <Link to="/products">
              <ButtonIcon label="Inicia agora a sua busca" />
            </Link>
          </div>
        </div>
        <div className="home-image-container">
          <img src={ Image } alt="Main banner" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Home;
