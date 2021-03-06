import React, { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DragDrop.scss';
import { ReactComponent as UploadArrow } from '../../assets/uploading-arrow.svg';
import { FileInputProps } from 'Type';
import { FileContext } from 'context';

interface IProps {
  dispalyImage?: boolean;
  defaultImage?: string;
  setNFTImage?: any;
  onChange?: Function;
  setSteps?: Function;
  nftImage?: any;
}

const DragDrop: React.FC<IProps> = ({ nftImage, setSteps, dispalyImage, defaultImage, onChange, setNFTImage }) => {
  const { files, setFiles } = useContext(FileContext);
  useEffect(() => {
    setNFTImage(files[0]);
    if (nftImage) {
      setSteps('mint');
    }
  }, [files, nftImage]);

  console.log(files);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const images = files.map(file => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: '200px' }} alt="preview" />
      </div>
    </div>
  ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="drag-drop" {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadArrow className="upload-arrow" />
        <p className="upload-slogan">Upload</p>
        <p className="upload-details">JPG, PNG, or MP4 files accepted.</p>
        <p className="upload-tag">Drag & Drop or click to browse.</p>
      </div>
      <div className="image-preview">{images}</div>
      {/* <button className="confirm-upload">Confirm Upload</button> */}
    </div>
  );
};

export default DragDrop;
