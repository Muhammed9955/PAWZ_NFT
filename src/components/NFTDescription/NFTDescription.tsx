import { AnyARecord } from 'dns';
import React from 'react';
import './NFTDescription.css';

interface IProps {
  setstate?: any;
}
const NFTDescription: React.FC<IProps> = ({ setstate }) => {
  const stateHandler = () => {
    setstate('list');
  };
  return (
    <div className="nft-description">
      <div className="nft-container">
        <div className="nft-mint-details">
          <p>Give your NFT a Title & Description.</p>
          <input placeholder="Title." type="text" />
          <textarea placeholder="Description" name=""></textarea>
        </div>
        <button onClick={stateHandler} className="add-nft-details">
          Mint Your NFT!
        </button>
      </div>
      <div className="nft-card"></div>
    </div>
  );
};

export default NFTDescription;
