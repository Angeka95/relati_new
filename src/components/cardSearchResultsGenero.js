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
import { useDownloadResource } from '../hooks/useDownloadResource';

export default function CardSearch({ datos, tipo }) {
  const { busqueda, verTodasDecisiones } = useContext(Context);
  const [isButtonInfoEnabled, setIsButtonInfoEnabled] = useState(false);

  // Estado del boton info 
  const toggleButtonInfo = () => {
    setIsButtonInfoEnabled(prev => !prev);
  };

  const [isButtonExtractEnabled, setIsButtonExtractEnabled] = useState(false);

  // Estado del boton extracto 
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

  // Funcion proveniente del hook personalizado useDownloadResource
  const countDownloadedBtn  = useDownloadResource();

  const card = (
    <React.Fragment>

      <CardContent className="card_container">
        {((typeof datos.fecha === 'string' ) && (datos.fecha.trim() !== '')) && (
          <p className="text_uppercase justify_end_spacing text_spacing text_space_min">{datos.fecha}</p>
        )}
        {((typeof datos.sala === 'string' ) && (datos.sala.trim() !== '')) && (
          <p className="text_bolder text_uppercase text_space_min">{datos.sala}</p>
        )}
        {((typeof datos.asuntoNombre === 'string' ) && (datos.asuntoNombre.trim() !== '')) && (
          <p className="text_bolder text_uppercase text_space_min">{datos.asuntoNombre}</p>
        )}
        {/*((typeof datos.asuntoCasoEllipsed === 'string' ) && (datos.asuntoCasoEllipsed.trim() !== '')) && (
          <p className="text_bolder text_uppercase text_space_min">{datos.asuntoCasoEllipsed}</p>
        )*/}
        {isButtonInfoEnabled && (
          <Button className="link_primary text_lowercase" onClick={toggleButtonInfo}>ver más</Button>)}

        {!isButtonInfoEnabled && (
          <div className="width_100 ">

            {/*((typeof datos.asuntoCaso === 'string' ) && (datos.asuntoCaso.trim() !== '')) && (
              <p className="text_space_min"><span className="text_bolder">• Asunto caso:</span> {datos.asuntoCaso}</p>
            )*/}
            {((typeof datos.departamentoNombre === 'string') && (datos.departamentoNombre.trim() !== '')) && (
              <p className="text_space_min"><span className="text_bolder">• Departamento:</span> {datos.departamentoNombre}</p>
            )}
            {((typeof datos.municipio === 'string') && (datos.municipio.trim() !== '')) && (
              <p className="text_space_min"><span className="text_bolder">• Municipio:</span> {datos.municipio}</p>
            )}
            {((typeof datos.procedimientos === 'string' ) && (datos.procedimientos.trim() !== '')) && (
                <p className="text_space_min"><span className="text_bolder">• Procedimientos:</span> {datos.procedimientos}</p>
            )}
            {/*((typeof datos.palabrasClaveFichaJuridica === 'string') && (datos.palabrasClaveFichaJuridica.trim() !== '')) && (
              <p className="text_space_min"><span className="text_bolder">• Palabras clave:</span> {datos.palabrasClaveFichaJuridica}</p>
            )*/}
            {((typeof datos.palabrasClave === 'string') && (datos.palabrasClave.trim() !== '')) && (
              <p className="text_space_min"><span className="text_bolder">• Palabras clave:</span> {datos.palabrasClave}</p>
            )}
            {/*{((typeof datos.actuacion === 'string' ) && datos.actuacion.trim() !== '') && (
            <p className="text_space_min"><span className="text_bolder">• Actuación:</span> <span className="text_capitalize"></span>{datos.actuacion}</p>
            )*/}
            {/*((typeof datos.caso === 'string' ) && (datos.caso.trim() !== '')) && (
                <p className="text_space_min"><span className="text_bolder">• Macrocaso:</span> {datos.caso}</p>
            )*/}
            {/*((typeof datos.sala === 'string' ) && (datos.sala.trim() !== '')) && (
                <p className="text_space_min"><span className="text_bolder">• Sala:</span> {datos.sala}</p>
            )*/}
            {/*((typeof datos.delitos === 'string' ) && (datos.delitos.trim() !== '')) && (
                <p className="text_space_min"><span className="text_bolder">• Delitos:</span> {datos.delitos}</p>
            )*/}
            {/*((typeof datos.comparecientes === 'string' ) && (datos.comparecientes.trim() !== '')) && (
                <p className="text_space_min"><span className="text_bolder">• Comparecientes:</span> {datos.comparecientes.toUpperCase()}</p>
            )*/}
            <Button
              className="link_primary text_lowercase"
              onClick={toggleButtonInfo}>
              {!isButtonInfoEnabled && 'ver menos'}
            </  Button>
          </div>
        )}



      </CardContent>

      <CardActions className="no-spacing card_actions_container">
        <div className="card_search_button_spacing">

          <CustomGrid>
            {((typeof datos.hipervinculo === 'string' ) && (datos.hipervinculo.trim() !== '')) && (
              <a href={datos.hipervinculo} target='_blank' rel="noreferrer" onClick={(event) => { countDownloadedBtn(event, datos.providencia_id, datos.hipervinculo)}}>
                <Button className="button_primary margin_xs" >Descargar Decisión</Button>
              </a> 
            )}
          </CustomGrid>
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