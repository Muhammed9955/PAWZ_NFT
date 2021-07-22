import { useState, useEffect } from 'react';
import { useProfile, useProfileForWallet } from '../../../../state/hooks';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import toast from 'react-hot-toast';

import { baseApiUrl, truncateWalletString } from '../../../../utils/index';
import { updateListingStatus, updatePrice, buy } from 'utils/contracts';
import { Button } from '../../../../components/button/Button';
import Input from '../../../../components/Input/index';
import { Col, Row } from 'react-bootstrap';
import { ethers } from 'ethers';

export default function ProductActions({ name, description, price, image, ownerAddress, tokenID, listed }) {
  const [nftPrice, setNFTPrice] = useState(price);
  const { profile: currentUserProfile } = useProfile();
  const { profile: productOwnerProfile } = useProfileForWallet(ownerAddress);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  function isOwnsProduct() {
    return ownerAddress === currentUserProfile?.walletAddress;
  }

  const updateNFTListingStatus = async () => {
    if (!loginStatus) {
      toast('Please connect correctly!');
      return;
    }
    if (ownerAddress !== account.toLowerCase()) {
      toast('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await updateListingStatus(chainId, library.getSigner(), tokenID, !listed);
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Listing Updated Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Listing Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Listing Failed!');
    }
    setLoading(false);
  };

  const updateNFTPrice = async () => {
    if (!loginStatus) {
      toast('Please connect correctly!');
      return;
    }
    if (ownerAddress !== account.toLowerCase()) {
      toast('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await updatePrice(chainId, library.getSigner(), tokenID, nftPrice);

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Price is updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Price Update Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Price Update Failed!');
    }
    setLoading(false);
  };

  const purchaseNFT = async () => {
    if (!loginStatus) {
      toast.error('Please connect wallet correctly!');
      return;
    }
    if (ownerAddress === account.toLowerCase()) {
      toast.error('You are current owner of this asset!');
      return;
    }

    if (listed === false) {
      toast.error('Currently not open for sale 🔒');
      return;
    }

    const balance = parseFloat(ethers.utils.formatEther(await library.getBalance(account)));
    if (parseFloat(price) > balance) {
      toast.error('Your wallet balance is not enough to purchase this NFT');
      return;
    }

    console.log(balance);
    console.log(ethers.utils.parseEther(price));

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await buy(chainId, library.getSigner(), tokenID, price);
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.success('Purchased this Assets!');
        setTimeout(() => {
          window.location.href = `/creatorDetail/${account}`;
        }, 3000);
      }
    } catch (error) {
      toast.error('Asset purchase failed!');
      console.log(error);
    }
    toast.dismiss(load_toast_id);
    setLoading(false);
  };

  const priceChangeHandler = newPrice => {
    setNFTPrice(newPrice);
  };

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  function RenderHeaderCta() {
    if (loginStatus === false) {
      return <></>;
    } else if (isOwnsProduct()) {
      return (
        <Row className="m-0 mt-4">
          <Col xs="12" sm="4" className="pl-0 mb-3 mb-sm-0">
            <Input type="number" value={nftPrice} name="price" onChange={priceChangeHandler} />
          </Col>
          <Col xs="6" sm="auto">
            <Button label="Update Price" variant="primary" isLoading={loading} onClick={updateNFTPrice} />
          </Col>
          {loginStatus && (
            <Col xs="6" sm="auto">
              <Button
                label={listed ? 'Disable for sale' : 'Enable for sale'}
                isLoading={loading}
                variant="primary"
                onClick={updateNFTListingStatus}
              />
            </Col>
          )}
        </Row>
      );
    } else {
      return (
        <div className="mt-4">
          <Button className="buy-now-btn" label="Buy now" isLoading={loading} variant="primary" onClick={purchaseNFT} />
        </div>
      );
    }
  }

  return <div className="header-cta">{RenderHeaderCta()}</div>;
}
