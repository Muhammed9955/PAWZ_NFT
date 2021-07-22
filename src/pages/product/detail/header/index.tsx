import InfoText from 'components/Text';
import './index.scss';
import { Button } from 'components/button/Button';
import { Card, Col, Form, Image, Nav, Row, Tab, Container } from 'react-bootstrap';
import ProfileImage from 'components/profile/ProfileImage';
import IconButton from 'components/button/icon';
import { useState, useEffect } from 'react';
import Input from 'components/Input';
import ProductHistory from '../history';
import { useHistory } from 'react-router';
import { buy, updateListingStatus, updatePrice } from 'utils/contracts';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const ProductDetailHeader = ({ creatorBackgroupUrl, creatorAvatarUrl, creatorName }) => {
  return (
    <div className="product-details-header">
      <Row className="banner">
        <Image src={creatorBackgroupUrl || '/img/c-bg-1.png'} />
      </Row>

      <div className="banner-bottom">
        <Container className="position-relative">
          <Row className="user-block">
            <Col xs="auto">
              <ProfileImage img={creatorAvatarUrl} />
            </Col>
            <Col>
              <Row>
                <Col xs="8" className="pr-0">
                  <h2 className="w-100 text-truncate">{creatorName}</h2>
                </Col>
                <Col xs="4">
                  <Image className="text-end-icon" src="/img/shield.png" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default ProductDetailHeader;
