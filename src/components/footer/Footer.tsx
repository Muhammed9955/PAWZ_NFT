import { Col, Container, Image, Row } from 'react-bootstrap';
import SocialButtons from '../socialButtons';
import './Footer.scss';
import ButtonGroup from '../buttonGroup/index';
import { Link } from 'react-router-dom';
import InfoText from 'components/Text';
import Logo from '../header/Logo/index';

export const Footer = () => {
  function CompanyLinks() {
    return (
      <ul>
        <li>
          <Link to="/">About us</Link>
        </li>
        <li>
          <Link to="/">Services</Link>
        </li>
        <li>
          <Link to="/">Team</Link>
        </li>
        <li>
          <Link to="/">Pricing</Link>
        </li>
        <li>
          <Link to="/">Project</Link>
        </li>
      </ul>
    );
  }
  function UsefullLinks() {
    return (
      <ul>
        <li>
          <Link to="/">Terms of Services</Link>
        </li>
        <li>
          <Link to="/">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/">Documentations</Link>
        </li>
        <li>
          <Link to="/">Changelog</Link>
        </li>
      </ul>
    );
  }
  function QuickLInks() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Our Story</Link>
        </li>
        <li>
          <Link to="/">Practice Areas</Link>
        </li>
        <li>
          <Link to="/">Team</Link>
        </li>
      </ul>
    );
  }
  return (
    <div className="main-footer">
      <Container>
        <Row className="mb-5">
          <Col lg="4" className="text-center text-sm-left">
            <Logo />
            <br />
            <InfoText>
              PAWZ NFT provides the best partnership support based on the latest technology. Become the market leader
              with the rapid launch Of the platform.
            </InfoText>
            <ButtonGroup
              btn1Label="Submit Artist profile"
              btn2Label="Submit Partnership profile"
              onClick={type => {
                // console.log(type);
              }}
            />
          </Col>
          <Col lg={{ span: 7, offset: 1 }}>
            <Row className="mt-3 mt-sm-0">
              <Col xs="6" sm="3">
                <h4>Company</h4>
                {CompanyLinks()}
              </Col>
              <Col xs="6" sm="3" className="text-right text-sm-left">
                <h4>Usefull Links</h4>
                {UsefullLinks()}
              </Col>
              <Col xs="6" sm="3">
                <h4>Quick Link</h4>
                {QuickLInks()}
              </Col>
              <Col xs="6" sm="3" className="text-right text-sm-left">
                <h4>Social Media</h4>
                <Row className="social-buttons">
                  <a href="https://twitter.com/pawznft" target="_blank">
                    <div className="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.721" height="14.12" viewBox="0 0 16.721 14.12">
                        <path
                          id="input-twitter"
                          d="M32.721,18.671a6.647,6.647,0,0,1-1.971.561,3.549,3.549,0,0,0,1.508-1.972,6.714,6.714,0,0,1-2.178.865A3.365,3.365,0,0,0,27.576,17a3.536,3.536,0,0,0-3.342,4.376,9.622,9.622,0,0,1-7.071-3.724,3.655,3.655,0,0,0,1.062,4.759,3.321,3.321,0,0,1-1.554-.446A3.538,3.538,0,0,0,19.423,25.5a3.31,3.31,0,0,1-1.549.061,3.453,3.453,0,0,0,3.2,2.476A6.717,6.717,0,0,1,16,29.518a9.453,9.453,0,0,0,5.258,1.6c6.369,0,9.968-5.59,9.75-10.6a7.131,7.131,0,0,0,1.712-1.845"
                          transform="translate(-16 -17)"
                          fill={"#ffffffbd"}
                        />
                      </svg>
                      <span className="social-label ml-2">Twitter</span>
                    </div>
                  </a>

                  <a href="https://github.com/pawznft" target="_blank">
                    <div className=" d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.72" height="16.72" viewBox="0 0 16.72 16.72">
                        <path
                          id="input-instagram"
                          d="M27.739,16a4.987,4.987,0,0,1,4.976,4.759l0,.222v6.758a4.987,4.987,0,0,1-4.759,4.976l-.222,0H20.981A4.987,4.987,0,0,1,16,27.961l0-.222V20.981A4.987,4.987,0,0,1,20.759,16l.222,0ZM24.36,20.644a3.716,3.716,0,0,0,0,7.431c2.049,0,3.716-3.716,3.716-3.716S26.409,20.644,24.36,20.644ZM29,17.765A1.034,1.034,0,1,0,30.039,18.8,1.034,1.034,0,0,0,29,17.765Z"
                          transform="translate(-16 -16)"
                          fill={"#ffffffbd"}
                        />
                      </svg>
                      <span className="social-label ml-2">GitHub</span>
                    </div>
                  </a>

                  <a href="https://www.youtube.com/channel/UCFe89XviEese7F5vEYlJ_fA" target="_blank">
                    <div className=" d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.72" height="12.92" viewBox="0 0 16.72 12.92">
                        <path
                          id="input-youtube"
                          d="M21.456,16c.579.006,3.649.046,5.756.2a2.193,2.193,0,0,1,1.672.763,4.368,4.368,0,0,1,.663,1.821,29.919,29.919,0,0,1,.173,3h0v1.38c0,1.468-.173,2.966-.173,2.966a4.368,4.368,0,0,1-.663,1.821,2.308,2.308,0,0,1-1.672.763c-1.993.175-4.848.2-5.641.2H21.29c-.29,0-1.438-.013-2.652-.041l-.385-.009c-1.027-.027-2.041-.067-2.572-.125a2.743,2.743,0,0,1-1.845-.793,4.368,4.368,0,0,1-.663-1.821A28.956,28.956,0,0,1,13,23.165V21.618c.012-1.44.172-2.829.172-2.829a3.971,3.971,0,0,1,.663-1.821,2.308,2.308,0,0,1,1.672-.763c2.107-.159,5.177-.2,5.756-.2Zm-2.114,3.493v6.372s5.477-1.52,5.477-3.113S19.342,19.494,19.342,19.494Z"
                          transform="translate(-13 -16.001)"
                          fill={"#ffffffbd"}
                        />
                      </svg>
                      <span className="social-label ml-2">You Tube</span>
                    </div>
                  </a>

                  <a href="https://t.me/pawznft" target="_blank">
                    <div className=" d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.72" height="13.933" viewBox="0 0 16.72 13.933">
                        <path
                          id="telegram"
                          d="M1.149,6q6.732-2.949,8.979-3.889C14.4.321,15.292.01,15.871,0a1.009,1.009,0,0,1,.6.18A.653.653,0,0,1,16.687.6a2.753,2.753,0,0,1,.026.609c-.232,2.448-1.234,8.389-1.744,11.13-.216,1.16-.641,1.549-1.052,1.587-.894.083-1.573-.594-2.439-1.165-1.355-.893-2.121-1.449-3.436-2.321-1.52-1.007-.535-1.561.332-2.466.227-.237,4.166-3.84,4.242-4.167a.318.318,0,0,0-.072-.274.353.353,0,0,0-.319-.031q-.2.047-6.494,4.316a2.913,2.913,0,0,1-1.67.62,10.937,10.937,0,0,1-2.393-.569C.7,7.555-.063,7.389,0,6.854Q.056,6.435,1.149,6Z"
                          fill={"#ffffffbd"}
                        />
                      </svg>
                      <span className="social-label ml-2">Telegram</span>
                    </div>
                  </a>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="copy-right">
        <Container>
          <Row>
            <Col>
              <p className="m-0 text-center text-sm-left">Copyright &copy; 2021 PAWZ-NFT</p>
            </Col>
            <Col className="text-center text-sm-right">
              <p className="m-0">Contact: info@pawznft.io</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
