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
        <div className="carousel-inner-wrapper">
          <div className="carousel-item-wrapper">
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+1"
              alt="Slide 1"
            />
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+2"
              alt="Slide 2"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-inner-wrapper">
          <div className="carousel-item-wrapper">
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+3"
              alt="Slide 3"
            />
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+4"
              alt="Slide 4"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-inner-wrapper">
          <div className="carousel-item-wrapper">
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+5"
              alt="Slide 5"
            />
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+6"
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