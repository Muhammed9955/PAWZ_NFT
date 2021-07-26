import { Col, OverlayTrigger, Image, Popover, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserDropDownProps } from 'Type';
import './index.scss';
import InfoText from '../../Text/index';
import { Button } from '../../button/Button';
import { truncateWalletString } from 'utils';

export default function UserDropDown(props: UserDropDownProps) {
  const BtnLabel = function () {
    return (
      <span className="user-profile-icon">
        <div className="text-truncate text-left">
          {props.balance} BNB <br />
        </div>
        <Image src={props.userAvatar || '/img/default-profile.png'} />
      </span>
    );
  };
  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom-end"
      overlay={
        <Popover id="user-dropdown">
          <h4>{props.userName}</h4>
          <InfoText variant="secondary">{truncateWalletString(props.walletAddress)}</InfoText>
          <Row className="main-row">
            <Col>
              <Row className="balance-row">
                <Col xs="auto">
                  <Image className="user-avatar" src={props.userAvatar || '/img/default-profile.png'} />
                </Col>
                <Col>
                  <InfoText variant="primary" size="md">
                    Balance
                  </InfoText>
                  <p>
                    <strong>{props.balance}</strong>
                    <InfoText inline={true}>BNB</InfoText>
                  </p>
                </Col>
              </Row>
            </Col>
            {/* <Col className="visa-col">
              <p>Buy BNB</p>
              <Image className="visa-icon" src="/img/visa.png" />
            </Col> */}
          </Row>
          <Row className="msg-block">
            <a
              href="https://academy.binance.com/en/articles/how-to-get-started-with-binance-smart-chain-bsc"
              target="_blank"
              className="icon-links"
            >
              Learn how to top-up your BSC wallet with BNB
            </a>
          </Row>

          <Link to={`/creatorDetail/${props.walletAddress}`} className="icon-link">
            <Image src="/img/user-icon.svg" />
            MY PROFILE
          </Link>
          {/* <a href="#" className="icon-link">
            <Image src="/img/Icon ionic-md-headset.svg" />
            SUPPORT
          </a> */}
          {/* <a href="#dc" className="icon-link">
            <Image src="/img/Icon ionic-ios-log-out.svg" />
            DISCONNECT
          </a>
          <a href="#e" className="icon-link earth">
            <Image src="/img/earth.svg" />
            EN
          </a> */}
        </Popover>
      }
      rootClose
    >
      <button className="connect-header balance">{BtnLabel()}</button>
      {/* <Button label={BtnLabel()} gradientDir="left" variant="primary" /> */}
    </OverlayTrigger>
  );
}
