import FileInput from 'components/Input/file';
import { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Button } from 'components/button/Button';
import FileUpload from 'components/FileUpload';
import InfoText from 'components/Text';
import Input from 'components/Input';
import './index.scss';
import CategoryCard from './category';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity, faHistory, faTags, faRegistered, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from '../../state/hooks';
import { useForm } from 'react-hook-form';
import { readFileAsync, getImageIpfsHash } from '../../utils/ipfs';
import toast from 'react-hot-toast';
import API from 'utils/api';
import { mint } from 'utils/contracts';
import { ethers } from 'ethers';
import DragDrop from 'components/DragDrop';

function Upload() {
  const history = useHistory();

  const { library, chainId, account } = useWeb3React<Web3Provider>();
  const { profile } = useProfile();
  const [nftImage, setNFTImage] = useState(null);
  const [nftName, setNFTName] = useState('');
  const [nftDecription, setNFTDecription] = useState('');
  const [nftPrice, setNFTPrice] = useState('');
  const [isLoading, setLoadingStatus] = useState(false);
  const { register, handleSubmit } = useForm();

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setNFTImage(e.target.files[0]);
    }
  };

  const onChangeNFTName = value => {
    // console.log(value);
    setNFTName(value);
  };

  const onChangeNFTDescription = (e: any) => {
    setNFTDecription(e.target.value);
  };

  const onChangeNFTPrice = value => {
    setNFTPrice(value);
  };

  const submitAsset = async () => {
    if (!nftImage) {
      toast.error('Please select the Artist!');
      return;
    }

    if (!account || !library) {
      toast.error('Please connect your wallet correctly!');
      return;
    }

    if (!profile) {
      toast.error('Please login correctly!');
      return;
    }

    if (!nftDecription || !nftPrice || !nftName) {
      toast.error('Please Input All Details Correctly!');
      return;
    }

    setLoadingStatus(true);
    const load_toast_id = toast.loading('Please wait...');

    try {
      const buffer = await readFileAsync(nftImage);
      const hash = await getImageIpfsHash(buffer);
      const image_url = `https://ipfs.io/ipfs/${hash}`;

      var formdata = new FormData();

      formdata.append('nft_name', nftName);
      formdata.append('nft_description', nftDecription);
      formdata.append('nft_price', nftPrice);
      formdata.append('image_url', image_url);
      formdata.append('category', JSON.stringify([]));

      var response: any = await API.post('/add_nft_metadata', formdata);

      if (response.status === 'success') {
        const base_id = response.base_id;

        const tokenURI = `${API.apiUrl}/nfts/${base_id}`;
        const txhash = await mint(chainId, library.getSigner(), tokenURI, nftPrice);

        if (txhash !== false) {
          await API.get('/sync_block');
          toast.success('NFT Product is created successfully!');
          setTimeout(() => {
            history.push('/');
          }, 3000);
        } else {
          toast.error('NFT Mint Failed!');
        }
      } else {
        toast.error('NFT Artist Upload Failed!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingStatus(false);
      toast.dismiss(load_toast_id);
    }
  };

  return (
    <div className="upload">
      <Row>
        <Col className="text-center">
          <h2 className="page-heading">Create single Collectible</h2>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm={{ span: 8, offset: 2 }}>
          {/* <div className="file-container mt-2">
            <FileInput
              label="Upload File"
              dispalyImage
              info="PNG, GIF, JPEG, JPG (MAX 8 mb)"
              onChange={onBannerChange}
              defaultImage={nftImage && URL.createObjectURL(nftImage)}
            />
          </div> */}

          {/* this is the component for dragging and dropping the images in*/}
          <DragDrop />

          {/* <div className="fee">
            <Row>
              <Col sm="12" xl="6" lg="12" className="text-left">
                <InfoText size="md" variant="secondary">
                  Service Fee <strong>2.5%</strong>
                </InfoText>
                <InfoText size="md" variant="secondary">
                  You will receive
                </InfoText>
              </Col>
            </Row>
          </div> */}
          <form>
            <Input placeholder="NFT Name" label="" name="nft_name" onChange={onChangeNFTName} />
            <label>Description (Optional)</label>
            <textarea
              placeholder="NFT Description (max: 300 characters)"
              name="nft_description"
              onChange={onChangeNFTDescription}
            />
            <Input
              type="number"
              placeholder="NFT Price"
              label=""
              name="nft_price"
              postfix="BNB"
              onChange={onChangeNFTPrice}
            />
          </form>

          <div className="submit text-center text-sm-left">
            <Button label="Create item" variant="primary" isLoading={isLoading} onClick={submitAsset} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Upload;
