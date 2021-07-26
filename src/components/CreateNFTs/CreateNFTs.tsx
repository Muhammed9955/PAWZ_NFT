import React from 'react';
import './CreateNFTs.css';
import { ReactComponent as ImageUpload } from '../../assets/imageUpload.svg';
import { ReactComponent as VideoUpload } from '../../assets/videoUpload.svg';
const CreateNFTs: React.FC = () => {
  return (
    <div className="create-nfts">
      <h1>Create an NFT!</h1>
      <div className="multi-media">
        <div className="image-upload">
          <ImageUpload />
          <h2>Image</h2>
          <h3>PNG or JPG</h3>
        </div>
        <div className="video-upload">
          <VideoUpload />
          <h2>Video</h2>
          <h3>MP4</h3>
        </div>
      </div>
    </div>
  );
};
export default CreateNFTs;
