import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './index.scss';
export default function Logo() {
  return (
    <span className="logo">
      <Link to="/">
        <Image className="logo" src="/img/logo_new.png" fluid />
        PAWZ NFT
      </Link>
    </span>
  );
}
