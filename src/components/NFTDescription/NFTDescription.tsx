import { FileContext } from 'context';
import { AnyARecord } from 'dns';
import React, { useContext } from 'react';
import './NFTDescription.css';

interface IProps {
  setSteps?: any;
  onChangeNFTName?: any;
  onChangeNFTDescription?: any;
  file?: any;
}
const NFTDescription: React.FC<IProps> = ({ onChangeNFTDescription, onChangeNFTName, setSteps, file }) => {
  const stateHandler = () => {
    setSteps('list');
  };
  const { files, setFiles } = useContext(FileContext);

  return (
    <div className="nft-description">
      <div className="nft-container">
        <div className="nft-mint-details">
          <p>Give your NFT a Title & Description.</p>
          <input placeholder="Title." onChange={onChangeNFTName} type="text" />
          <textarea placeholder="Description" onChange={onChangeNFTDescription} name=""></textarea>
        </div>
        <button onClick={stateHandler} className="add-nft-details">
          Mint Your NFT!
        </button>
      </div>
      <div className="nft-card">
        <img src={files[0]?.preview} alt="" />
      </div>
    </div>
  );
};

export default NFTDescription;
