import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import './Header.scss';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserDropDown from './UserDropDown';
import useAuth from '../../hooks/useAuth';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from '../../state/hooks';
import { truncateWalletString } from '../../utils/index';
import { ethers } from 'ethers';
import Logo from './Logo';

const Header = () => {
  const { login } = useAuth();
  const [loginStatus, setLoginStatus] = useState(false);
  const history = useHistory();

  function goToUpload() {
    history.push('/upload');
  }
  let userName = '';
  let userAvatar = '/img/user-icon.svg';

  const context = useWeb3React<Web3Provider>();
  const { connector, library, chainId, account, active } = context;

  const { profile } = useProfile();

  let [etherBalance, setEtherBalance] = useState('0.00');
  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    if (isLoggedin) {
      library.getBalance(account).then(balance => {
        const etherVal = parseFloat(ethers.utils.formatEther(balance));
        setEtherBalance(etherVal.toFixed(4));
      });
    }
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId, profile]);

  if (profile) {
    userName = profile.username ? profile.username : truncateWalletString(profile.walletAddress);
    userAvatar = profile.userAvatarUrl ? profile.userAvatarUrl : '/img/user-icon.svg';
  }

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" className="header-nav">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end mb-2 mb-sm-0">
          <Nav>
            {/* <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/upload" className="nav-link">
              MarketPlaces
            </Link>
            <Link to="/profile/detail" className="nav-link">
              Artist
            </Link>
            <Link to="/profile/detail" className="nav-link">
              Edition
            </Link> */}
            <Nav.Item>
              <div className="connection-action">
                {!(loginStatus && profile) && (
                  <Button label="Connect Wallet" variant="outline-primary" onClick={login} />
                )}
                {loginStatus && profile && (
                  <div className="connect-action">
                    <Button label="CREATE" gradientDir="right" variant="primary" onClick={goToUpload} />
                    <UserDropDown
                      userName={userName}
                      userAvatar={userAvatar}
                      balance={etherBalance}
                      walletAddress={account}
                    />
                  </div>
                )}
              </div>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
