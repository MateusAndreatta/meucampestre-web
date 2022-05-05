import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import reuniaoCondominio from '../../resources/reuniao-de-condo.jpg';

const slideImages = [
  {
    url: reuniaoCondominio,
    link: 'https://www.pucpr.br/',
  },
  {
    url: 'https://uninta.edu.br/site/conteudo/arquivos/2016/07/banner-aviso-manutencao.jpg',
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
