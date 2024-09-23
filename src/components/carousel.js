import Carousel from 'react-bootstrap/Carousel';   
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function Carrusel()  {

return (    
    <div> 
    <Carousel 
      indicators={false} 
      controls={true}
      interval={5000} 
      slide={true}
      className="double-carousel"
    >
      <Carousel.Item>
        <div className="carousel_inner_wrapper">
          <div className="carousel_item_wrapper">
            <img
              className="d-block w-100"
              src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8"
              alt="Slide 1"
              
            />
            
            <img
              className="d-block w-100"
              src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_02_febrero_2024.png?ver=2.8"
              alt="Slide 4"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel_inner_wrapper">
          <div className="carousel_item_wrapper">
            <img
              className="d-block w-100"
              src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_03_marzo_2024.png?ver=2.8"
              alt="Slide 3"
            />
            <img
              className="d-block w-100"
              src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_02_febrero_2024.png?ver=2.8"
              alt="Slide 4"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel_inner_wrapper">
          <div className="carousel_item_wrapper">
            <img
              className="d-block w-100"
              src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_02_febrero_2024.png?ver=2.8"
              alt="Slide 5"
            />
            <img
              className="d-block w-100"
              src="https://relatoria.jep.gov.co/img/boletines/2024/boletin_02_febrero_2024.png?ver=2.8"
              alt="Slide 6"
            />
          </div>
        </div>
      </Carousel.Item>
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