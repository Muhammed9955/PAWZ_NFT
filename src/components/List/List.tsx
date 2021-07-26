import React from 'react';
import './List.css';

interface IProps {
  setstate?: any;
}
const List: React.FC<IProps> = ({ setstate }) => {
  return (
    <div className="list">
      <div className="input-price-btn-container">
        <div className="set-reverse-price">
          <p>Set a Reserve price.</p>
          <div className="input-price">
            <label htmlFor="">$PAWZ</label>
            <input placeholder="1000000" type="text" />
          </div>
          <span>$148.50</span>
        </div>
        <button className="list-your-nft">LIST Your NFT!</button>
      </div>
      <div className="list-card"></div>
    </div>
  );
};

export default List;
