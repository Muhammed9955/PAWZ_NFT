import React from 'react';
import './Stepper.css';

interface IProps {
  steps?: string;
  setSteps?: any;
}
const Stepper = ({ steps, setSteps }: IProps) => {
  // const uploadSet = (): void => {
  //   setSteps('upload');
  // };
  return (
    <div className="stepper-bar">
      <span
        className={
          steps === 'upload'
            ? 'stepper-roller'
            : steps === 'mint'
            ? 'stepper-roller mint'
            : steps === 'list' && 'stepper-roller list'
        }
      ></span>
      <div className="steps-names">
        <span
          onClick={() => setSteps('upload')}
          className={steps === 'upload' ? 'name-step upload_style' : 'name-step'}
        >
          Upload
        </span>
        <span onClick={() => setSteps('mint')} className={steps === 'mint' ? 'name-step mint' : 'name-step'}>
          Mint
        </span>
        <span onClick={() => setSteps('list')} className={steps === 'list' ? 'name-step list' : 'name-step'}>
          List
        </span>
      </div>
    </div>
  );
};

export default Stepper;
