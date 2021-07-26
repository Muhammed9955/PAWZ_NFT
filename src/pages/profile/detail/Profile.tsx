import React, { useState } from 'react';
import './Profile.scss';
const ProfileDetail: React.FC = () => {
  const data = [1, 2, 3, 4, 5, 6];
  const [state, setstate] = useState('');

  const collectionSelect = (e: any): void => {
    setstate(e.target.value);
  };

  return (
    <div className="prfile-details">
      <div>
        <img className="profile-detail-img" src="" alt="" />
        <h3 className="profile-user-name">PawzPal2021</h3>
        <p>@PawzPal2021</p>
        <p>
          <strong>Joined </strong> July 2021
        </p>
      </div>
      <input placeholder="Bio" className="bio-input" type="text" />
      <input placeholder="Links" className="bio-input" type="text" />
      <div>
        <button
          value="created"
          onClick={collectionSelect}
          className={state === 'created' ? 'created-collected checked' : 'created-collected'}
        >
          Created
        </button>
        <button
          value="collected"
          onClick={collectionSelect}
          className={state === 'collected' ? 'created-collected checked' : 'created-collected'}
        >
          Collected
        </button>
      </div>
      <div className="created-cards-container">
        {data.map((item, indx) => (
          <div className="profile-cards">{item}</div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetail;
