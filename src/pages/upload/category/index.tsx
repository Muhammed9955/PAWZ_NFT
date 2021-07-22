import CheckButton from 'components/button/check';
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import './index.scss';

const CategoryCard = () => {
  return (
    <Card className="cat-card">
      <Card.Body>
        <CheckButton id="cb1" img="/img/games.png" label="Games" className="mb-3" checked />
        <CheckButton id="cb2" img="/img/rainbow.png" label="Art" />
        <CheckButton id="cb3" img="/img/photo.png" label="Photo" />
        <CheckButton id="cb4" img="/img/punks.png" label="Punks" />
        <CheckButton id="cb5" img="/img/music.png" label="Music" />
        <CheckButton id="cb6" img="/img/memes.png" label="Memes" />
        <CheckButton id="cb7" img="/img/meta.png" label="Meta" />
      </Card.Body>
    </Card>
  );
};
export default CategoryCard;
