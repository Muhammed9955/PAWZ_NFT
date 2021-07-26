import React from 'react';
import './Stepper.css';

interface IProps {
  state?: string;
}
const Stepper = ({ state }: IProps) => {
  return (
    <div className="stepper-bar">
      <span
        className={
          state === 'upload'
            ? 'stepper-roller'
            : state === 'mint'
            ? 'stepper-roller mint'
            : state === 'list' && 'stepper-roller list'
        }
      ></span>
      <div className="steps-names">
        <span className={state === 'upload' ? 'name-step upload_style' : 'name-step'}>Upload</span>
        <span className={state === 'mint' ? 'name-step mint' : 'name-step'}>Mint</span>
        <span className={state === 'list' ? 'name-step list' : 'name-step'}>List</span>
      </div>
    </div>
  );
};

export default Stepper;
