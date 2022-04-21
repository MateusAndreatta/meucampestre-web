import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: 'https://s3-alpha-sig.figma.com/img/60ed/e329/29d189a15ee2b064035b1976d90da0c5?Expires=1651449600&Signature=WJDzG~r0l1iHDjwWhRSGH9SNozItbIV37Jels7lD~AbNKRmwMpWyC47DK4wB9Q1wAyT77r7yIDIIV1ua33mTpuMGiriAA7JhDCzeif-7tzLwLL1sTDgEpz9jZluW-zdEW1lU0KXXbcI-ECm7ZPM6nhMRfAtwSuzo4-4Glu0rhZnfjIiIz1wHL7Ib6E~lJh-STYailCWfBQQjmFPURJpik6EjvwQKBZnvOW9Enh92NXSx5gqJMubej549FiiV5MRmRh9oxYkc-1Nh8jMZa-SHqJvo4V86dLmzWCwr9fpo6Gc3DdNlltK08Pi7wRBhgoKfjdeU7HtSC8J8a33pUPdReA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
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
