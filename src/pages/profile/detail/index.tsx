import { useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Button } from '../../../components/button/Button';
import HomeCard from '../../../components/cards/home/HomeCard';
import InfoText from '../../../components/Text';
import ProfileImage from '../../../components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons';
import './index.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import ProductCard from 'components/cards/product';
import IconButton from 'components/button/icon';
import Collections from './collection.json';
import { useGetNFTUserFullDetail } from '../../../hooks/useApi';
import { useProfile } from '../../../state/hooks';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { truncateWalletString } from '../../../utils/index';
import moment from 'moment';
import ExternalViewLink from 'components/ExternViewLink';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
const XProfileDetail = ({
  match: {
    params: { walletAddress },
  },
}: RouteComponentProps<{ walletAddress: string }>) => {
  const arr = [1, 2, 3, 4, 5, 6];
  const history = useHistory();
  let data = useLocation().state;
  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  const { profile } = useProfile();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const nftUserFullDetail = useGetNFTUserFullDetail(walletAddress);

  // console.log(nftUserFullDetail);

  if (!nftUserFullDetail || !nftUserFullDetail.user_profile) {
    return <></>;
  }

  return (
    <div className="profile-detail">
      <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div className="user-block">
          <ProfileImage img={nftUserFullDetail?.user_profile?.userAvatarUrl} />
          {profile?.walletAddress.toLowerCase() === walletAddress.toLowerCase() && (
            <Link to="/profile/edit" className="align-self-end">
              <InfoText size="md" variant="secondary" className="d-inline-block m-0 edit-profile-link">
                {/* <Image className="lang mb-2" src="/img/edit.svg" />  */}
                <Edit className="edit-icon-svg" fill="white" />
                Edit profile
              </InfoText>
            </Link>
          )}
        </div>
        <Row className="user-details">
          <div className="user-info">
            <div className="user-name-img">
              <h2 className="username">
                {nftUserFullDetail.user_profile.username || truncateWalletString(walletAddress)}
              </h2>
              {true && <Image src="/img/shield.png" />}
            </div>
            <p className="joined">
              Joined {moment(nftUserFullDetail.user_profile.accountCreatedAt).format('MMM yyyy')}
            </p>
            <h3>Bio</h3>
            <InfoText variant="secondary" size="md" className="m-0 bio-text-field">
              {nftUserFullDetail.user_profile.userBio}
            </InfoText>
            <br />
            <h3>Links</h3>
            <InfoText variant="secondary" size="md" className="m-0 bio-text-field">
              <SocialButtons profile={nftUserFullDetail.user_profile} />
            </InfoText>
            {/* <h3>Link</h3>
            <InfoText variant="secondary" size="md" className="m-0">
              {nftUserFullDetail.user_profile.socialUrl}
            </InfoText> */}

            {/* <ExternalViewLink eitherLink="" IPFSLink="" metadata="" /> */}
          </div>
          <div className="profile-nav-items">
            <Tab.Container defaultActiveKey="collection">
              <Nav className="nav-item-container">
                <Nav.Item>
                  <Nav.Link eventKey="collection" className="title-font">
                    Collection
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sold" className="title-font">
                    Sold
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="created" className="title-font">
                    Created
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bought" className="title-font">
                    Bought
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="collection">
                  <Row>
                    {nftUserFullDetail.userNfts.currentNfts?.map(collection => (
                      <Col sm="4" className="mb-5">
                        <ProductCard hidePrice={true} product={collection} />
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="sold">
                  <Row>
                    {nftUserFullDetail.userNfts.soldNfts?.map(collection => (
                      <Col sm="4" className="mb-5">
                        <ProductCard hidePrice={true} product={collection} />
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="created">
                  <Row>
                    {nftUserFullDetail.userNfts.createdNfts?.map(collection => (
                      <Col sm="4" className="mb-5">
                        <ProductCard hidePrice={true} product={collection} />
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="bought">
                  <Row>
                    {nftUserFullDetail.userNfts.boughtNfts?.map(collection => (
                      <Col sm="4" className="mb-5">
                        <ProductCard hidePrice={true} product={collection} />
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            <div className="created-cards-container">
              {arr.map((item, indx) => (
                <div className="profile-cards">{item}</div>
              ))}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default XProfileDetail;
