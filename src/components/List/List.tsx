import { FileContext } from 'context';
import React, { useContext } from 'react';
import './List.css';

interface IProps {
  setstate?: any;
  onChangeNFTPrice?: any;
  submitAsset?: any;
  isLoading?: any;
  file?: any;
}
const List: React.FC<IProps> = ({ file, isLoading, submitAsset, setstate, onChangeNFTPrice }) => {
  const { files, setFiles } = useContext(FileContext);

  return (
    <div className="list">
      <div className="input-price-btn-container">
        <div className="set-reverse-price">
          <p>Set a Reserve price.</p>
          <div className="input-price">
            <label htmlFor="">$PAWZ</label>
            <input onChange={onChangeNFTPrice} placeholder="1000000" type="text" />
          </div>
          <span>$148.50</span>
        </div>
        <button isLoading-={isLoading} onClick={submitAsset} className="list-your-nft">
          LIST Your NFT!
        </button>
      </div>
      <div className="list-card">
        <img src={files[0]?.preview} alt="" />
      </div>
    </div>
  );
};

export default List;
