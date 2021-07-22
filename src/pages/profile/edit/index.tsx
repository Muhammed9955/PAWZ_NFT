import { useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Button } from '../../../components/button/Button';
import ProfileImage from '../../../components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons';
import { CreatorObj, CreatorObj2 } from '../../../Type';
import './index.scss';
import InfoText from '../../../components/Text/index';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import FileInput from 'components/Input/file';
import IconButton from 'components/button/icon';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from '../../../state/hooks';
import toast from 'react-hot-toast';
import { readFileAsync, getImageIpfsHash } from '../../../utils/ipfs';
import API from 'utils/api';
import { truncateWalletString } from '../../../utils/index';

export default function ProfileEdit() {
  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();
  const { profile } = useProfile();
  const [avatarImage, setAvatarImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const Socials = [
    // { label: 'Website', icon: '/img/earth.svg', value: profile && profile.websiteUrl },
    { label: 'Twitter', icon: '/img/social/twitter.svg', value: profile && profile.twitterUrl },
    { label: 'Instagram', icon: '/img/social/instagram.svg', value: profile && profile.instagramUrl },
    { label: 'Telegram', icon: '/img/social/telegram.svg', value: profile && profile.telegramUrl },

    // { label: 'Discord', icon: '/img/social/discord.svg', value: profile && profile.discordUrl },
    { label: 'Youtube', icon: '/img/social/youtube.svg', value: profile && profile.youtubeUrl },
    // { label: 'Facebook', icon: '/img/social/facebook.svg', value: profile && profile.facebookUrl },
    // { label: 'TikTok', icon: '/img/social/tiktok.svg', value: profile && profile.tiktokUrl },
    // { label: 'Dribbble', icon: '/img/social/dribbble.svg', value: profile && profile.dribbleUrl },
    // { label: 'Behance', icon: '/img/social/behance.svg', value: profile && profile.behanceUrl },
  ];

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const onSubmit = async data => {
    // console.log(data);
    if (!profile) {
      toast.error('Profile Update Failed!');
      return;
    }

    if (!loginStatus) {
      toast.error('Please connect Metamask Correctly!');
      return;
    }

    if (!data.username || !data.user_bio) {
      toast.error('Please Input Profile Details Correctly!');
      return;
    }

    try {
      setLoading(true);

      var user_avatar_url = profile.userAvatarUrl;
      var user_background_url = profile.userBackgroupUrl;

      if (avatarImage) {
        const buffer = await readFileAsync(avatarImage);
        const hash = await getImageIpfsHash(buffer);
        user_avatar_url = `https://ipfs.io/ipfs/${hash}`;
      }

      if (backgroundImage) {
        const buffer = await readFileAsync(backgroundImage);
        const hash = await getImageIpfsHash(buffer);
        user_background_url = `https://ipfs.io/ipfs/${hash}`;
      }

      data.wallet_address = profile.walletAddress;
      data.social_url = '';
      data.user_avatar_url = user_avatar_url;
      data.user_background_url = user_background_url;

      // console.log(data);
      API.post('/update_nft_user_profile', data)
        .then(res => {
          toast.success('Your Profile Updated!');
        })
        .catch(error => {
          toast.error('Profile Update Failed!');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error('Profile Update Failed!');
    }
  };

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setBackgroundImage(e.target.files[0]);
    }
  };

  const onUserAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setAvatarImage(e.target.files[0]);
    }
  };

  return (
    <div className="user-edit">
      <Row className="banner">
        <FileInput
          label="Edit"
          defaultImage={profile && profile.userBackgroupUrl}
          dispalyImage={true}
          info="We recommend to upload images in 1920 x 300 resolution"
          onChange={onBannerChange}
        />
      </Row>
      <Container>
        <div className="user-block">
          <ProfileImage img={profile && profile.userAvatarUrl} edit onChange={onUserAvatarChange} />
          <InfoText variant="secondary" size="sm" className="mt-1">
            We recommend an image at least 120 X 120 resolution
          </InfoText>

          <Row>
            <Col sm="4">
              <InfoText size="lg" className="m-0 text-truncate">
                {profile && (profile.username || truncateWalletString(profile.walletAddress))}
              </InfoText>
              <Row>
                <Col xs="auto" className="pr-0">
                  <InfoText variant="secondary" size="md" className="mb-2">
                    {profile && profile.userBio}
                  </InfoText>
                </Col>
                {/* <Col xs="auto" className="pl-0">
                  <IconButton icon="/img/copy.svg" rounded />
                </Col> */}
              </Row>
              {/* <SocialButtons /> */}
            </Col>
          </Row>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 pt-3 pb-3">
          <Row>
            <Col sm="5" className="text-center">
              <InfoText size="md" className="mb-1 mt-3 text-left">
                Display Name
              </InfoText>
              <Input name="username" placeholder={profile?.username} register={register} />
              <InfoText size="md" className="mb-1 mt-3 text-left">
                Add Bio
              </InfoText>
              <textarea placeholder={profile?.userBio} {...register('user_bio', { required: false })} />
              <Button
                className="mt-3 d-none d-sm-block"
                isLoading={loading}
                type="submit"
                variant="primary"
                label="Save Changes"
              />
            </Col>
            <Col xs="1"></Col>
            <Col sm="6" className="socials text-center mt-5 mt-sm-0">
              <InfoText className="details text-left">
                Add links to your <br />
                social media profile
              </InfoText>
              {Socials.map((social, index) => (
                <Row key={index} className="align-items-end mb-3">
                  <Col xs="auto" sm="auto" className="mb-0">
                    <img className="svg-img" src={social.icon} />
                  </Col>
                  <Col xs="auto" sm="2" className="pl-0 mb-0">
                    <InfoText size="md" className="m-0">
                      {social.label}
                    </InfoText>
                  </Col>
                  <Col xs="12" sm="8">
                    <Input name={social.label} placeholder={social.value} register={register} />
                  </Col>
                </Row>
              ))}
              <Button
                className="mt-3 d-sm-none"
                isLoading={loading}
                type="submit"
                variant="primary"
                label="Save Changes"
              />
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}
function success(res: any): Function {
  throw new Error('Function not implemented.');
}
