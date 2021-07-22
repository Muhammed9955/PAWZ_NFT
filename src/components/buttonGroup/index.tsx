import { Button } from 'react-bootstrap';
import './index.scss';

interface PropsType {
  btn1Label: any;
  btn2Label: any;
  btn1Prefix?: string;
  onClick: (type: string) => void;
}

export default function ButtonGroup({ btn1Label, btn2Label, btn1Prefix, onClick }: PropsType) {
  return (
    <div className="button-group">
      <Button className="button-group__left" variant="dark" value="left" onClick={() => onClick && onClick('left')}>
        {btn1Prefix && <div>{btn1Prefix}</div>}
        {btn1Label}
      </Button>
      <Button className="button-group__right" variant="dark" value="right" onClick={() => onClick && onClick('right')}>
        {btn2Label}
      </Button>
    </div>
  );
}
