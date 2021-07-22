import InfoText from 'components/Text';
import { Image, Container } from 'react-bootstrap';
import './index.scss';
import Category from '../category/index';
import { useGetNFTTopArtists, NFTTopArtist } from '../../../hooks/useApi';
import { useHistory } from 'react-router';
import ProfileImage from 'components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons/index';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArtistProfileCardPropsType {
  artist: NFTTopArtist;
  onSelect?: (artist: NFTTopArtist) => void;
}

function RenderArtist({ artist, onSelect }: ArtistProfileCardPropsType) {
  const history = useHistory();
  return (
    <div className="artist-wrapper" onClick={() => history.push(`/creatorDetail/${artist.user.walletAddress}`)}>
      <ProfileImage img={artist.user.userAvatarUrl || '/img/default-profile.png'} />
      <h4 className="w-100 text-truncate">{artist.user.username}</h4>
      <InfoText className="mb-1">{artist.soldAmount} BNB</InfoText>
      <SocialButtons fill="#00a0d2" profile={artist?.user} />
    </div>
  );
}

export default function Artist() {
  const topArtistList = useGetNFTTopArtists();

  const settings = {
    dots: true,
    infinite: false,
    // initialSlide: 1,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  };

  return (
    <div className="artists-wrapper">
      <Container>
        <Category title="Brands and Artists">
          <div className="artists">
            <Slider {...settings}>
              {topArtistList?.map((artist, i) => (
                <RenderArtist key={i} artist={artist} />
              ))}
            </Slider>
          </div>
        </Category>
      </Container>
    </div>
  );
}
