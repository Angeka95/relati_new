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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function CardSearch({ datos }) {
  const { busqueda, verTodasDecisiones } = useContext(Context);
  const [isButtonInfoEnabled, setIsButtonInfoEnabled] = useState(true);

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

  const [value, setValue] = useState(0);

  const handleChangeTabCard = (event, newValue) => {
    setValue(newValue);
  };

  // Acordiones en card 

  const [isMagistradosExpanded, setIsMagistradosExpanded] = useState(false);
  const [isSujetosProcesalesExpanded, setIsSujetosProcesalesExpanded] = useState(false);
  const [isPalabrasClaveExpanded, setIsPalabrasClaveExpanded] = useState(false);
  const [isResuelveExpanded, setIsResuelveExpanded] = useState(false);
  const [isDocumentosAsociadosExpanded, setIsDocumentosAsociadosExpanded] = useState(false);
  const [isEnfoquesDiferencialesExpanded, setIsEnfoquesDiferencialesExpanded] = useState(false);
  const [isNotasExpanded, setIsNotasExpanded] = useState(false);
  const [isAnalisisJuridicoExpanded, setIsAnalisisJuridicoExpanded] = useState(false);

  const toggleMagistrados = () => {
    setIsMagistradosExpanded(prev => !prev);
  };

  const toggleSujetosProcesales = () => {
    setIsSujetosProcesalesExpanded(prev => !prev);
  };


  const togglePalabrasClave = () => {
    setIsPalabrasClaveExpanded(prev => !prev);
  };

  const toggleResuelve = () => {
    setIsResuelveExpanded(prev => !prev);
  };

  const toggleDocumentosAsociados = () => {
    setIsDocumentosAsociadosExpanded(prev => !prev);
  };


  const toggleEnfoquesDiferenciales = () => {
    setIsEnfoquesDiferencialesExpanded(prev => !prev);
  };

  const toggleNotas = () => {
    setIsNotasExpanded(prev => !prev);
  };

  const toggleAnalisisJuridico = () => {
    setIsAnalisisJuridicoExpanded(prev => !prev);
  };



  const [isButtonInfoSpecificEnabled, setIsButtonInfoSpecificEnabled] = useState(true);

  const toggleButtonInfoSpecific = () => {
    setIsButtonInfoSpecificEnabled(prev => !prev);
  };

  const card = (
    <React.Fragment>

      <CardContent className="card_container">
      {((typeof datos.nombreDecision === 'string' ) && (datos.nombreDecision.trim() !== '')) && (
        <p className="text_bolder justify_center text_space_min">{datos.nombreDecision}</p>  
      )}
      {((typeof datos.fecha === 'string' ) && (datos.fecha.trim() !== '')) && (
        <p className="text_uppercase justify_center text_spacing text_space_min">{datos.fecha}</p>
      )}
      <div className="card_tab"> 
   
      <Tabs value={value} onChange={handleChangeTabCard} className="d_flex ">

         
          <Tab className="text_nonecase text_bolder text_s" label="Datos generales" />
          <Tab className="text_nonecase text_bolder text_s" label="Datos específicos" />
            

      
            
      
        </Tabs>
        {((typeof datos.hipervinculoFichaJuris === 'string' ) && (datos.hipervinculoFichaJuris.trim() !== '')) && (
              <a href={datos.hipervinculoFichaJuris} target='_blank' rel="noreferrer">
                <Button className="button_secondary margin_xs card_size_small"  startIcon={<FileDownloadOutlinedIcon/>}>Descargar ficha</Button>
              </a> 
        )}
        
      </div> 
        {value === 0 && 
        <div className="margin_top_m ">
            {((typeof datos.salaOSeccion === 'string' ) && (datos.salaOSeccion.trim() !== '')) && (
              <p className="text_space_min">• Sala o Sección:  <span className="text_bolder"> {datos.salaOSeccion}</span> </p>
            )}
            {((typeof datos.procedimiento === 'string' ) && (datos.procedimiento.trim() !== '')) && (
              <p className="text_space_min">• Procedimiento:  <span className="text_bolder"> {datos.procedimiento}</span> </p>
            )}
            {((typeof datos.expediente === 'string' ) && (datos.expediente.trim() !== '')) && (
              <p className="text_space_min">• Expediente:  <span className="text_bolder"> {datos.expediente}</span> </p>
            )}
          </div>
          }
        {value === 1 && 
        
        <div className="margin_top_m ">
          <div className="width_100">
            <Button onClick={toggleMagistrados} className=" link_secondary text_capitalize"  startIcon={isMagistradosExpanded ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}>
              Magistrados 
              </Button>
              {isMagistradosExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.magistrado === 'string' ) && (datos.magistrado.trim() !== '')) && (
                   <p className="text_space_min">{/* Magistrado/a: */}  <span className="text_bolder"> {datos.magistrado}</span> </p>
                  )}
                </div>
              )}

          </div>
          <div className="width_100">
            <Button onClick={toggleSujetosProcesales} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
            Sujetos Procesales
            </Button>

            {isSujetosProcesalesExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.compareciente === 'string' ) && (datos.compareciente.trim() !== '')) && (
                    <p className="text_space_min">{/*• Accionante/Solicitante/Compareciente:  */}<span className="text_bolder"> {datos.compareciente}</span> </p>
                  )}
                  {((typeof datos.tipoSujeto === 'string' ) && (datos.tipoSujeto.trim() !== '')) && (
                    <p className="text_space_min">{/* Tipo de sujeto:  */}<span className="text_bolder"> {datos.tipoSujeto}</span> </p>
                  )}
                  {((typeof datos.accionadoVinculado === 'string' ) && (datos.accionadoVinculado.trim() !== '')) && (
                    <p className="text_space_min">{/* Accionado/Vinculado:  */}<span className="text_bolder"> {datos.accionadoVinculado}</span> </p>
                  )}
                </div>
              )}
           </div>
           <div className="width_100">
            <Button onClick={togglePalabrasClave} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
            Palabras Clave
            </Button>

            {isPalabrasClaveExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.palabrasClaves === 'string' ) && (datos.palabrasClaves.trim() !== '')) && (
                    <p className="text_space_min">{/* Palabras clave del documento: */} <span className="text_bolder"> {datos.palabrasClaves}</span> </p>
                  )}
                </div>
              )}
           </div>


        </div>
          }
        


        {/* <p className="text_uppercase justify_end_spacing text_spacing text_space_min">{datos.fecha}</p> */}




        {isButtonInfoEnabled && value === 0 &&(
          <Button className="link_primary text_lowercase" onClick={toggleButtonInfo}>ver más</Button>)}



        {!isButtonInfoEnabled && value === 0 && (
          <div className="width_100 ">
            {((typeof datos.departamento === 'string' ) && (datos.departamento.trim() !== '')) && (
              <p className="text_space_min">• Departamento:  <span className="text_bolder"> {datos.departamento}</span></p>
            )}
            {((typeof datos.municipio === 'string' ) && (datos.municipio.trim() !== '')) && (
              <p className="text_space_min">• Municipio: <span className="text_bolder"> {datos.municipio}</span></p>
            )}
            {((typeof datos.delito === 'string' ) && (datos.delito.trim() !== '')) && (
              <p className="text_space_min">• Delito: <span className="text_bolder">{datos.delito}</span></p>
            )}
            {((typeof datos.anioHechos === 'string' ) && (datos.anioHechos.trim() !== '')) && (
              <p className="text_space_min">• Año de los hechos: <span className="text_bolder">{datos.anioHechos}</span></p>
            )}
            {((typeof datos.organo === 'string' ) && (datos.organo.trim() !== '')) && (
              <p className="text_space_min">• Órgano: <span className="text_bolder">{datos.organo}</span></p>
            )}
            {((typeof datos.tipo === 'string' ) && (datos.tipo.trim() !== '')) && (
              <p className="text_space_min">• Tipo: <span className="text_bolder">{datos.tipo}</span></p>
            )}
            {((typeof datos.radicado === 'string' ) && (datos.radicado.trim() !== '')) && (
              <p className="text_space_min">• Radicado: <span className="text_bolder">{datos.radicado}</span></p>
            )}
      
            <Button
              className="link_primary text_lowercase"
              onClick={toggleButtonInfo}>
              {!isButtonInfoEnabled && 'ver menos'}
            </  Button>
          </div>
        )}

        
        {isButtonInfoSpecificEnabled && value === 1 &&(
          <Button className="link_primary text_lowercase margin_top_s" onClick={toggleButtonInfoSpecific}>ver más</Button>)}


      {!isButtonInfoSpecificEnabled  && value === 1 && (
        <div> 
          <div className="width_100">
            <Button onClick={toggleAnalisisJuridico} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
            Análisis Jurídico
            </Button>

            {isAnalisisJuridicoExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.hechos === 'string' ) && (datos.hechos.trim() !== '')) && (
                    <p className="text_space_min">• Hechos:  <span className="text_bolder"> {datos.hechos}</span> </p>
                  )}
                  {((typeof datos.problemasJuridicos === 'string' ) && (datos.problemasJuridicos.trim() !== '')) && (
                    <p className="text_space_min">• Problemas Jurídicos:  <span className="text_bolder"> {datos.problemasJuridicos}</span> </p>
                  )}
                  {((typeof datos.reglas === 'string' ) && (datos.reglas.trim() !== '')) && (
                    <p className="text_space_min">• Reglas:  <span className="text_bolder"> {datos.reglas}</span> </p>
                  )}
                  {((typeof datos.aplicacionCasoConcreto === 'string' ) && (datos.aplicacionCasoConcreto.trim() !== '')) && (
                    <p className="text_space_min">• Aplicación al Caso Concreto:  <span className="text_bolder"> {datos.aplicacionCasoConcreto}</span> </p>
                  )}
                </div>
              )}
           </div>

    
          <div className="width_100">
            <Button onClick={toggleResuelve} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
            Resuelve
            </Button>

            {isResuelveExpanded && (
                <div className="margin_top_s">
                  <p className="text_space_min">{/*• Resuelve: */}<span className="text_bolder"> {datos.resuelve}</span> </p>
                </div>
              )}
           </div>
           <div className="width_100">
            <Button onClick={toggleDocumentosAsociados} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
            Documentos Asociados
            </Button>

            {isDocumentosAsociadosExpanded && (
                <div className="margin_top_s">
                  <p className="text_space_min">{/*• Documentos asociados: */} <span className="text_bolder"><a href={`https://relatoria.jep.gov.co/${datos.documentosAsociados}`} target="_blank" rel="noreferrer">{datos.documentosAsociados}</a></span> </p>
                </div>
              )}
           </div>
           <div className="width_100">
            <Button onClick={toggleEnfoquesDiferenciales} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
           Enfoques diferenciales
            </Button>

            {isEnfoquesDiferencialesExpanded && (
                <div className="margin_top_s">
                  <p className="text_space_min">{/*• Enfoques diferenciales: */} <span className="text_bolder"> {datos.enfoquesDiferenciales}</span> </p>
                </div>
              )}
           </div>
           <div className="width_100">
            <Button onClick={toggleNotas} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
           Notas de la Relatoría
            </Button>

            {isNotasExpanded && (
                <div className="margin_top_s">
                  <p className="text_space_min">{/*• Notas de la Relatoría: */}  <span className="text_bolder"> {datos.notasRelatoria}</span> </p>
    
                </div>
              )}
           </div>
         
            <Button
              className="link_primary text_lowercase"
              onClick={toggleButtonInfoSpecific}>
              {!isButtonInfoSpecificEnabled && 'ver menos'}
            </  Button>

        </div>
          
        )}



      </CardContent>

      <CardActions className="no-spacing card_actions_container">
        <div className="card_search_button_spacing">


          <CustomGrid className="justify_center">
            {((typeof datos.hipervinculo === 'string' ) && (datos.hipervinculo.trim() !== '')) && (
              <a href={datos.hipervinculo} target='_blank' rel="noreferrer">
                <Button startIcon={<FileDownloadOutlinedIcon/>} className="button_primary margin_xs " >Descargar decisión</Button>
              </a> 
            )}
          </CustomGrid>
        </div>

        <div className="width_100">
          {!verTodasDecisiones && (
            <>
              <p className="text_center margin_top_s"
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
                  className="link_secondary justify_center text_lowercase" onClick={toggleButtonExtract}> ver menos del extracto
                </Button>
              )}
              {!isButtonExtractEnabled && (
                <Button
                  className="link_secondary justify_center text_lowercase" onClick={toggleButtonExtract}> ver más del extracto
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