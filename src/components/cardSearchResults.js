import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Context from '../context/context';


export default function CardSearch({ datos }) {
  const {busqueda, verTodasDecisiones} = useContext(Context);
  const [isButtonInfoEnabled, setIsButtonInfoEnabled] = useState(true);

  // Función para alternar el estado del botón
  const toggleButtonInfo = () => {
    setIsButtonInfoEnabled(prev => !prev);
  };

  const [isButtonExtractEnabled, setIsButtonExtractEnabled] = useState(false);

  // Función para alternar el estado del botón
  const toggleButtonExtract = () => {
    setIsButtonExtractEnabled(prev => !prev);
  };

  const CustomGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
  }));

  const card = (
    <React.Fragment>

      <CardContent className="card_container">
        <p className="text_uppercase justify_end_spacing text_spacing">{datos.fecha}</p>
        <p className="text_bolder text_uppercase">{datos.asunto}</p>
        <p className="text_bolder">{datos.nombreDecision}</p>
        <p>Pertenece a:  <span className="text_bolder"> {datos.grupoPertence}</span> </p>

        {isButtonInfoEnabled && (
          <Button className="link_primary" onClick={toggleButtonInfo}>ver más</Button>)}



        {!isButtonInfoEnabled && (
          <div className="width_100 ">
            <p>Lugar de los hechos: <span className="text_bolder"> {datos.lugarHechos}</span></p>
            <p>Magistrado: <span className="text_bolder">{datos.magistrado}</span></p>
            <p>Macrocaso: <span className="text_bolder">{datos.macrocaso}</span></p>
            <p>Conclusión de la decisión: <span className="text_bolder">{datos.conclusionDecision}</span></p>

            <Button
              className="link_primary"
              onClick={toggleButtonInfo}>
              {!isButtonInfoEnabled && 'ver menos'}
            </  Button>
          </div>
        )}



      </CardContent>

      <CardActions className="no-spacing card_actions_container">
        <div className="card_search_button_spacing">


          <CustomGrid>
            <Button className="button_secondary margin_xs" >ver ficha</Button>
            <Button className="button_primary margin_xs" >descargar decisión</Button>
          </CustomGrid>
        </div>

        <div className="width_100">
          {!verTodasDecisiones && (
            <>
          <p className="text_center"
            style={{
              height: isButtonExtractEnabled ? 'auto' : '50px',
              overflow: 'hidden'
            }}>
            {datos.extractoBusqueda.split('secuestro').map((extracto, index) => (
              <React.Fragment key={index}>
                {extracto}
                {index != datos.extractoBusqueda.split('secuestro').length - 1 ? (
                  <span className="text_bolder">{busqueda}</span>
                ) : (
                  <></>
                )}
              </React.Fragment>
            ))}
          </p>

          {isButtonExtractEnabled && (
            <Button
              className="link_secondary justify_center" onClick={toggleButtonExtract}> ver menos del extracto
            </Button>
          )}
          {!isButtonExtractEnabled && (
            <Button
              className="link_secondary justify_center" onClick={toggleButtonExtract}> ver más del extracto
            </Button>
          )}            
            </>
          )
          }
        </div>
      </CardActions>



    </React.Fragment>



  );


  return (

    <Box sx={{ minWidth: 275 }} className='width_100'>
      <Card className="card_search_results" variant="outlined">{card}</Card>
    </Box>
  );
}