import Carousel from 'react-bootstrap/Carousel';   
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function Carrusel({boletines})  {

const boletinesActuales = boletines.map(x => x).filter(boletin => new Date(boletin.fecha + 'T00:00:00Z').getUTCFullYear() === 2024);
// Agrupa en pares el carrusel
const pares = [];
// for (let i = 0; i < boletines.length; i += 2) {
//     pares.push(boletines.slice(i, i + 2)); 
// }
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
        <Carousel.Item>
          <div className="carousel_inner_wrapper">
            <div className="carousel_item_wrapper" style={{  }}>
              {par.map((boletin) => (
                <a href={boletin.pdf} target='_blank' className="width_100" >
                  <img
                    className="width_100" 
                    src={boletin.imagenPortada}
                    alt="Boletines Jurisprudenciales"
                    
                  />

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