import Carousel from 'react-bootstrap/Carousel';
import imagenPortadaPlaceHolder from '../assets/images/boletin_placeholder.png';
import { ordenarBoletinesActuales } from '../helpers/utils.js';

export default function Carrusel({ boletines , libros, filterByCurrentYear = false}) {

  //console.log('boletines', boletines);
  const boletinesActuales = ordenarBoletinesActuales(boletines, filterByCurrentYear);
  
  // Agrupa en pares el carrusel
  const pares = [];

  for (let i = 0; i < boletinesActuales.length; i += 2) {
    pares.push(boletinesActuales.slice(i, i + 2));
  } 
 
  return (
    <div>
      <Carousel
        indicators={false}
        controls={true}
        interval={5000}
        slide={true}
        className="double-carousel"
      >
        {pares.map((par, index) => (
          <Carousel.Item key={index}>
            <div className="carousel_inner_wrapper">
              <div className="carousel_item_wrapper" style={{}}>
                {par.map((boletin, index_par) => (
                  <a key={index_par} href={boletin.pdf} target='_blank' className="width_100" rel="noreferrer">
                    {(boletin.imagenPortada ) ?                                  
                      <img
                        className="width_100"
                        src={boletin.imagenPortada}
                        alt="Boletines Jurisprudenciales"

                      />
                      : 
                      <div className="carousel_image_placeholder">
                        <img
                          className="width_100"
                          src={imagenPortadaPlaceHolder}
                          alt="Boletines Jurisprudenciales"
                        />
                        <div className="carousel_image_placeholder_text">
                          <p className="text_black padding_s">{boletin.nombreWithExt}</p>
                        </div>
                      </div>
                    }
                  </a>
                ))}
                {par.length === 1 && <div className="width_100" />}
              </div>
            </div>
          </Carousel.Item>
        ))
        }
      </Carousel>

      {/* <div className="carousel-controls-wrapper">
        <button className="carousel-control-prev" onClick={() => document.querySelector('.carousel-control-prev').click()}>
          <IconButton aria-label="info" sx={{ color: 'primary.main' }}>
            <ArrowBackIosOutlinedIcon fontSize="large" />
          </IconButton>
        </button>
        <button className="carousel-control-next" onClick={() => document.querySelector('.carousel-control-next').click()}>
        <IconButton aria-label="info" sx={{ color: 'primary.main' }}>
            <ArrowForwardIosOutlinedIcon fontSize="large" />
          </IconButton>
        </button>
      </div> */}
    </div>

  );
}