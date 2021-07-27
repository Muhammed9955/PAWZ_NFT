import React from 'react';
import './CreateNFTs.css';
import { ReactComponent as ImageUpload } from '../../assets/imageUpload.svg';
import { ReactComponent as VideoUpload } from '../../assets/videoUpload.svg';

interface IProps {
  setImageVideo?: any;
  setSteps?: any;
}
const CreateNFTs: React.FC<IProps> = ({ setImageVideo, setSteps }) => {
  return (
    <div className="create-nfts">
      <h1>Create an NFT!</h1>
      <div className="multi-media">
        <div
          onClick={() => {
            setImageVideo(true);
            setSteps('upload');
          }}
          className="image-upload"
        >
          <ImageUpload />
          <p>Image</p>
          <h3>PNG or JPG</h3>
        </div>
        <div
          onClick={() => {
            setImageVideo(true);
            setSteps('upload');
          }}
          className="video-upload"
        >
          <VideoUpload />
          <p>Video</p>
          <h3>MP4</h3>
        </div>
      </div>
    </div>
  );
};
export default CreateNFTs;
