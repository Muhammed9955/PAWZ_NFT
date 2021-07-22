import InfoText from 'components/Text';
import ProfileImage from 'components/profile/ProfileImage';
import { Card, Col, Image, Row, Button } from 'react-bootstrap';
import './index.scss';
import IconButton from 'components/button/icon';
import { Product } from './Product';
import ButtonGroup from '../../buttonGroup/index';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { useProfileForWallet } from '../../../state/hooks';
import { NFTObjectData } from '../../../hooks/useApi';
import { useHistory } from 'react-router';

export interface ProductCardPropsType {
  product: NFTObjectData;
  title?: string;
  onClick?: () => void;
  hidePrice?: boolean;
}

const ProductCard = ({ product, onClick, hidePrice }: ProductCardPropsType) => {
  const { profile } = useProfileForWallet(product.initialCreatorAddress);

  const history = useHistory();

  function ItemRating({ rating }) {
    return (
      <div className="rating">
        {rating}
        <Rating emptySymbol={<FontAwesomeIcon icon={faStarHalfAlt} />} fullSymbol={<FontAwesomeIcon icon={faStar} />} />
      </div>
    );
  }

  function goToProductDetails() {
    history.push(`/details/${product.baseID}`);
  }

  function ItemPrice({ price }) {
    return <div className="product-price">{price} BNB</div>;
  }
  return (
    <Card className="product-card">
      <div className="click-effect" onClick={goToProductDetails}>
        <div className="header click-effect" onClick={onClick}>
          <Card.Img variant="top" src={product.image} />
        </div>
        <Row className="user-area align-items-center my-2 mx-0">
          <Col xs="auto">
            <ProfileImage img={profile && (profile.userAvatarUrl || '/img/default-profile.png')} />
          </Col>
          <Col className="pl-0">
            <InfoText className="name m-0 text-truncate">{product.name}</InfoText>
          </Col>
        </Row>
      </div>
      {product.price && !hidePrice && (
        <Card.Footer>
          <Row className="action-area align-items-center m-0">
            <Col xl="12" md="12">
              <ButtonGroup
                btn1Label={<ItemPrice price={product.price} />}
                btn2Label={'Buy Now'}
                btn1Prefix="Price"
                onClick={goToProductDetails}
              />
            </Col>
          </Row>
        </Card.Footer>
      )}
    </Card>
  );
};
export default ProductCard;
