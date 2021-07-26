import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck, Container } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Footer } from './components/footer/Footer';

import Header from './components/header/Header';
import HomePage from 'pages/home';
import ProfileEdit from 'pages/profile/edit';

import Upload from 'pages/upload';
import ProductDetails from 'pages/product/detail';
import { useEagerConnect } from './hooks/useEagerConnect';
import { useFetchProfileList, useFetchProfile } from './state/hooks';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from 'utils/scrollToTop';
import ProfileDetail from 'pages/profile/detail/Profile';
import Mint from 'pages/Mint/Mint';

function App() {
  useEagerConnect();
  useFetchProfileList();
  useFetchProfile();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 }, error: { duration: 3000 } }} />
      <div className="app">
        {/* <div className="backdrop-image2"> */}
        <Router basename={process.env.PUBLIC_URL}>
          <ScrollToTop />
          <Header />
          <div className="body">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile/edit" component={ProfileEdit} />
              <Route exact path="/creatorDetail/:walletAddress" component={ProfileDetail} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/mint" component={Mint} />
              <Route exact path="/details/:id" component={ProductDetails} />
            </Switch>
          </div>
          <Footer />
        </Router>
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
