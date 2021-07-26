import './index.scss';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/cards/product';
import { CardDeck, Col, Container, Form, Image, Row } from 'react-bootstrap';
import HomeHeader from './header';
import Dialog from 'components/modal';
import { Button } from '../../components/button/Button';
import Creators from './creators.json';
import productList from './productList.json';
import InfoText from 'components/Text';
import Category from './category';
import CreatorCard from '../../components/cards/creator';
import { useHistory } from 'react-router';
import Artist from './artist';
import { Home_List } from './constant';
import { useGetNFTList, NFTObjectData } from '../../hooks/useApi';
import SearchBar from 'components/SearchBar/SearchBar';

const HomePage = () => {
  const [isFilterModal, setFilterModal] = useState(false);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const [NFTObjectList, setNFTObjectList] = useState<NFTObjectData[]>([]);

  const history = useHistory();

  function isAlreadyAdded(item: NFTObjectData) {
    return NFTObjectList?.find(list => list.baseID === item.baseID);
  }

  const items = useGetNFTList({
    start,
    count: Home_List.size,
    category: category,
    sort_field: sortField,
    sort_order: sortOrder,
  });

  // console.log(NFTObjectList);
  // console.log(items);

  useEffect(() => {
    setStart(0);
    setNFTObjectList([]);
  }, [category, sortField, sortOrder]);

  useEffect(() => {
    if (items?.nfts?.length) {
      const newNFTObjectList = [...NFTObjectList];
      if (!items?.nfts.find(item => isAlreadyAdded(item))) {
        newNFTObjectList.push(...items.nfts);
        setLoading(false);
      }
      setNFTObjectList(newNFTObjectList);
    }
  }, [items]);

  function loadMoreItem() {
    setLoading(true);
    setStart(start + Home_List.size);
  }

  function renderLoadMore() {
    if (items?.total_count > NFTObjectList.length) {
      return (
        <Col className="text-center load-more-action">
          <Button
            label="Load More"
            variant="primary"
            onClick={loadMoreItem}
            isLoading={loading}
            loadingMessage="Loading..."
          />
        </Col>
      );
    }
  }
  return (
    <div className="home-page">
      <HomeHeader />
      {/* <Container style={{ margin: '0', padding: '0' }}> */}
      {/* <Row className="category--item">
            {NFTObjectList.map(item => (
              <Col xl="4" md="4">
                <ProductCard product={item} onClick={() => console.log('card clicked !', item)} />
              </Col>
            ))}
          </Row> */}
      <div style={{ width: '90%', margin: '0 auto' }}>
        <li>TRENDING AUCTIONS</li>
        <div className="trending-auctions">
          {NFTObjectList.map(item => (
            <ProductCard product={item} onClick={() => console.log('card clicked !', item)} />
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div style={{ width: '90%', margin: '0 auto' }}>
        <h2>Explore</h2>
        <div className="trending-auctions">
          <SearchBar />
          {NFTObjectList.map(item => (
            <ProductCard product={item} onClick={() => console.log('card clicked !', item)} />
          ))}
        </div>
      </div>
      {/* </Container> */}
      {/* <div className="creators">
        <Container>
          <Category title="Feature creators">
            <Row className="category--item">
              {NFTObjectList.map(item => (
                <Col xl="4" md="4">
                  <CreatorCard
                    image={item.image}
                    // userAvatar={item?.userAvatar}
                    // count={item?.count}
                    // userName={item?.userName}
                    // userHandle={item?.userHandle}
                    // info={item?.info}
                    onClick={creatorClick}
                  />
                </Col>
              ))}
            </Row>
          </Category>
        </Container>
      </div> */}
      {renderLoadMore()}
      {/* <Artist /> */}
    </div>
  );
};
export default HomePage;
