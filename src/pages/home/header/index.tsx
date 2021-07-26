import { Button } from 'components/button/Button';
import CheckButton from 'components/button/check';
import InfoText from 'components/Text';
import { Card, Col, Container, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import './index.scss';

interface VisualPropsType {
  svg: string;
  style: any;
}
const VisualSVG = (props: VisualPropsType) => {
  return <Image src={props.svg} style={props.style} />;
};

const HomeHeader = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="mb-10">
      <div className="home-header-card">
        <InfoText size="lg" className="home-header-text mb-5">
          Welcome To PAWZ Marketplace!
        </InfoText>
        <InfoText size="xl" className="sub-heading text-center">
          A market made for $PAWZ, by paws!
        </InfoText>
      </div>
    </div>
  );
};
export default HomeHeader;
