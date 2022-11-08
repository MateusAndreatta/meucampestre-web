import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useEffect, useState } from 'react';
import BannerRepository from '../../repository/BannerRepository';
import { useNavigate } from 'react-router-dom';

export default function Banner() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BannerRepository.findAll().then((response) => {
      setData(response);
    });
  }, []);

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
  };

  const handleClick = (banner) => {
    if (banner.link) {
      console.log(banner.link.startsWith('/'));
      if (banner.link.startsWith('/')) {
        navigate(banner.link);
      } else {
        window.open(banner.link, '_blank');
      }
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="slide-container">
      <Slide {...properties}>
        {data.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div
              className={`banner ${slideImage.link ? 'cursor-pointer' : ''}`}
              onClick={() => handleClick(slideImage)}>
              <div
                style={{ backgroundImage: `url(${slideImage.urlBanner})` }}
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
