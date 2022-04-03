import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: 'https://picsum.photos/500/300?1',
    link: 'https://www.pucpr.br/',
  },
  {
    url: 'https://picsum.photos/500/300/?2',
    link: '',
  },
  {
    url: 'https://picsum.photos/500/300?3',
    link: '',
  },
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
};

export const Banner = () => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div className="banner">
              <a href={slideImage.link}>
                <div style={{ backgroundImage: `url(${slideImage.url})` }} />
              </a>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
