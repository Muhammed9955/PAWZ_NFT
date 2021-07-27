import DragDrop from 'components/DragDrop';
import List from 'components/List/List';
import NFTDescription from 'components/NFTDescription/NFTDescription';
import Stepper from 'components/Stepper/Stepper';
import Upload from 'pages/upload';
import React, { useState } from 'react';
import './Mint.scss';
const Mint: React.FC = () => {
  const [state, setstate] = useState<string>('upload');
  return (
    <div className="mint-page">
      {/* <Stepper state={state} />
      {state === 'upload' ? (
        <DragDrop />
      ) : state === 'mint' ? (
        <NFTDescription setstate={setstate} />
      ) : (
        state === 'list' && <List setstate={setstate} />
      )} */}
    </div>
  );
};

export default Mint;
