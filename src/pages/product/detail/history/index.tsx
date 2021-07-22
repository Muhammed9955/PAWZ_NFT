import { Card, Col, Form, Image, Nav, Row, Tab } from 'react-bootstrap';
import InfoText from '../../../../components/Text/index';
import './index.scss';
import { NFTEvent, useGetUserList } from '../../../../hooks/useApi';
import moment from 'moment';
import { truncateWalletString } from '../../../../utils/index';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

export default function ProductHistory({ historyEvents, contractAddress }) {
  const nft_user_list = useGetUserList();

  let sorted_nft_events = historyEvents.sort((evt1, evt2) => {
    if (evt1.doneOn > evt2.doneOn) return -1;
    if (evt1.doneOn < evt2.doneOn) return 1;
    return 0;
  });

  let event_list = [];
  const AvatarImg = '/img/default-profile.png';

  for (let i = 0; i < sorted_nft_events.length; i++) {
    let doneOn = sorted_nft_events[i].doneOn;
    let eventType = sorted_nft_events[i].eventType;

    let user_wallet = '';
    let user_image = '';
    let user_name = '';
    let user_verified = false;
    let event_content = '';
    let event_date = moment(doneOn * 1000).fromNow();

    if (eventType === 0) {
      let minter = sorted_nft_events[i].minter;

      let user = null;
      if (nft_user_list) user = nft_user_list.find(user => user.walletAddress === minter);

      user_wallet = minter;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : AvatarImg;
      user_name = user && user.username ? user.username : truncateWalletString(minter);
      user_verified = user && user.verified ? user.verified : false;
      event_content = 'The NFT was minted';
    } else if (eventType === 1) {
      // let seller = sorted_nft_events[i].seller;
      let buyer = sorted_nft_events[i].buyer;
      let nftSoldAtPrice = sorted_nft_events[i].nftSoldAtPrice;

      let user = null;
      if (nft_user_list) user = nft_user_list.find(user => user.walletAddress === buyer);

      user_wallet = buyer;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : AvatarImg;
      user_name = user && user.username ? user.username : truncateWalletString(buyer);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Bought at ${nftSoldAtPrice} BNB`;
    } else if (eventType === 2) {
      let priceUpdater = sorted_nft_events[i].priceUpdater;
      let newNftPrice = sorted_nft_events[i].newNftPrice;
      // let oldNftPrice = sorted_nft_events[i].oldNftPrice;

      let user = null;
      if (nft_user_list) user = nft_user_list.find(user => user.walletAddress === priceUpdater);

      user_wallet = priceUpdater;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : AvatarImg;
      user_name = user && user.username ? user.username : truncateWalletString(priceUpdater);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Put on sale for ${newNftPrice} BNB`;
    } else {
      continue;
    }

    event_list.push({
      user_wallet: user_wallet,
      user_image: user_image,
      user_name: user_name,
      user_verified: user_verified,
      event_content: event_content,
      event_date: event_date,
    });
  }

  function HistoryRow({ event }) {
    return (
      <Row className="sub-card m-0 content history-item">
        <Col xs="auto" className="avatar pl-4">
          <Image src={event.user_image} className="rounded" />
        </Col>
        <Col className="fixed-size-col">
          <InfoText className="mb-1 text-ellipsis user-name">{event.user_name}</InfoText>
          <InfoText size="sm" className="mb-1 text-ellipsis history-info">
            {event.event_content}
          </InfoText>
          <InfoText size="sm" className="mb-0 text-ellipsis">
            {event.event_date}
          </InfoText>
        </Col>
      </Row>
    );
  }

  return (
    <div className="product-history mt-5">
      <h3>History</h3>
      {event_list?.map(history => {
        return <HistoryRow event={history} />;
      })}
    </div>
  );
}
