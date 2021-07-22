import { CardDeck, Col, Container, Image, Row } from 'react-bootstrap';
import './index.scss';
import ProductDetailHeader from './header/index';
import ArtCard from 'components/cards/art';
import { Button } from 'components/button/Button';
import ProfileImage from 'components/profile/ProfileImage';
import InfoText from 'components/Text';
import IconButton from 'components/button/icon';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { useGetNFTDetail, NFTDetail } from '../../../hooks/useApi';
import ProductCard from '../../../components/cards/product/index';
import ProductActions from './productActions/index';
import ProductHistory from './history';
import { truncateWalletString } from '../../../utils/index';
import ExternalViewLink from '../../../components/ExternViewLink/index';
import { getNFTBscScanLink } from 'utils/contracts';
import PreviewImage from 'react-preview-image';
import { useState } from 'react';

const ProductDetails = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const nftDetail: NFTDetail = useGetNFTDetail(id);
  const history = useHistory();

  const [previewVisible, setPreviewVisible] = useState(false);

  if (!nftDetail) {
    return <></>;
  }

  function SoldLabel({ price }) {
    return (
      <>
        <h4 className="mb-2">Sold for</h4>
        {price}
      </>
    );
  }

  function OwnerBtnLabel({ userAvatarUrl, address }) {
    return (
      <div>
        <h4>Owned By</h4>
        <Row className="align-items-center m-0">
          <Col xs="4" className="p-0">
            <ProfileImage img={userAvatarUrl} />
          </Col>
          <Col xs="8" className="p-0 text-truncate">
            <span>{truncateWalletString(address)}</span>
          </Col>
        </Row>
      </div>
    );
  }

  function previewHandleTriggle() {
    setPreviewVisible(!previewVisible);
  }

  return (
    <div className="product-details">
      <ProductDetailHeader
        creatorBackgroupUrl={nftDetail.creator.userBackgroupUrl}
        creatorAvatarUrl={nftDetail.creator.userAvatarUrl}
        creatorName={nftDetail.creator.username || truncateWalletString(nftDetail.creator.walletAddress)}
      />
      <div className="mt-5">
        <Container>
          <Row>
            <Col lg="7" className="info">
              <h2>Artwork Information</h2>
              <h5>{nftDetail?.nft.name}</h5>
              {/* <h6>A moment to step back.</h6> */}
              <Row>
                <Col xl="7">
                  <InfoText variant="secondary" size="sm">
                    {nftDetail?.nft.description}
                  </InfoText>
                </Col>
                <Col xl="5" className="mt-3 mt-xl-0">
                  <ExternalViewLink
                    eitherLink={getNFTBscScanLink(nftDetail?.nft.tokenID)}
                    IPFSLink={nftDetail?.nft.image}
                    metadata=""
                  />
                </Col>
              </Row>
              <Image src={nftDetail?.nft.image} onClick={previewHandleTriggle} />
              <PreviewImage source={[nftDetail?.nft.image]} index={0} visible={previewVisible} onHide={previewHandleTriggle} />
            </Col>
            <Col lg="5" className="mt-5 mt-lg-0">
              <Row>
                <Col xs="4" sm="auto" className="pr-0">
                  <Button
                    className="product-btn"
                    label={<SoldLabel price={nftDetail?.nft.price} />}
                    variant="primary"
                  />
                </Col>
                <Col xs="8">
                  <Button
                    className="product-btn"
                    label={
                      <OwnerBtnLabel
                        userAvatarUrl={nftDetail?.owner.userAvatarUrl}
                        address={nftDetail?.owner.walletAddress}
                      />
                    }
                    variant="primary"
                  />
                </Col>
              </Row>

              <ProductActions
                name={nftDetail?.nft.name}
                description={nftDetail?.nft.description}
                image={nftDetail?.nft.image}
                price={nftDetail?.nft.price}
                ownerAddress={nftDetail?.nft.ownerAddress}
                tokenID={nftDetail?.nft.tokenID}
                listed={nftDetail?.nft.listed}
              />
              <ProductHistory historyEvents={nftDetail.historyEvents} contractAddress={nftDetail.nft.ownerAddress} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default ProductDetails;
