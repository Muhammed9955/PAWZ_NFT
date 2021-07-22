import InfoText from 'components/Text';
import { Card, Col, Image, Row } from 'react-bootstrap';
import './index.scss';
import ProfileImage from 'components/profile/ProfileImage';
import { Button } from '../../button/Button';
import ButtonGroup from 'components/buttonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export interface CreatorCardPropsType {
  image: string;
  userAvatar?: string;
  count?: string;
  userName?: string;
  userHandle?: string;
  info?: string;
  onClick?: () => void;
}

const CreatorCard = ({ image, userAvatar, count, userName, userHandle, info, onClick }: CreatorCardPropsType) => {
  function Btn2Label({ count }) {
    return (
      <div className="followers">
        <FontAwesomeIcon icon={faUser} />
        {count}
      </div>
    );
  }
  return (
    <Card className="creator-card">
      <div className="header click-effect" onClick={onClick}>
        <Card.Img variant="top" src={image} />
      </div>
      <div className="align-items-center my-2 mx-0 user-info">
        <div className="user-name">{userName}</div>
        <ProfileImage img={userAvatar} />
        <div className="handle">{userHandle}</div>
      </div>
      <div className="info">
        <InfoText className="m-0">{info}</InfoText>
      </div>
      <Card.Footer>
        <Row className="align-items-center m-0">
          <ButtonGroup btn1Label={<Btn2Label count={count} />} btn2Label={'Follow'} onClick={() => {}} />
        </Row>
      </Card.Footer>
    </Card>
  );
};
export default CreatorCard;
