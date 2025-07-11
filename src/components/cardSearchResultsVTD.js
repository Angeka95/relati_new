import React, { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css';
import { Container, Grid, Tooltip, Divider, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import Context from '../context/context';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import StringToHtml from './cardSearchResults/stringToHtml';
import LikeDislike from './cardSearchResults/likeDislike';
import { useDownloadResource } from '../hooks/useDownloadResource';

export default function CardSearch({ datos, hiddenAnalisisJuridico = false }) {
  const { busqueda } = useContext(Context);
  const [isButtonInfoEnabled, setIsButtonInfoEnabled] = useState(true);

  // Estado del boton info 
  const toggleButtonInfo = () => {
    setIsButtonInfoEnabled(prev => !prev);
  };

  const [isButtonExtractEnabled, setIsButtonExtractEnabled] = useState(false);
  const [isButtonHighlightEnabled, setIsButtonHighlightEnabled] = useState(false);

  // Estado del boton extracto 
  const toggleButtonExtract = () => {
    setIsButtonExtractEnabled(prev => !prev);
  };
  
  // Estado del boton extracto 
  const toggleButtonHighlight = () => {
    setIsButtonHighlightEnabled(prev => !prev);
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
  const [isAnalisisExpanded, setIsAnalisisExpanded] = useState(false);
  const [isDocumentosAsociadosExpanded, setIsDocumentosAsociadosExpanded] = useState(false);
  const [isEnfoquesDiferencialesExpanded, setIsEnfoquesDiferencialesExpanded] = useState(false);
  const [isNotasExpanded, setIsNotasExpanded] = useState(false);
  const [isAnalisisJuridicoExpanded, setIsAnalisisJuridicoExpanded] = useState(false);
  const [isConclusionResuelveExpanded, setIsConclusionResuelveExpanded] = useState(false);
  const [isAnexosExpanded, setIsAnexosExpanded] = useState(false);
  const [isRecursosExpanded, setIsRecursosExpanded] = useState(false);

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
  
  const toggleAnalisis = () => {
    setIsAnalisisExpanded(prev => !prev);
  };
  
  const toggleConclusionResuelve = () => {
    setIsConclusionResuelveExpanded(prev => !prev);
  };

  const toggleDocumentosAsociados = () => {
    setIsDocumentosAsociadosExpanded(prev => !prev);
  };
  
  const toggleAnexos = () => {
    setIsAnexosExpanded(prev => !prev);
  };
  
  const toggleRecursos = () => {
    setIsRecursosExpanded(prev => !prev);
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
  
  // Funcion que valida si tiene documentos o recursos asociados
  const validarAnexosRecursos = () => {
    if((datos.hasOwnProperty("recursos") && (datos["recursos"].length > 0 )) || (datos.hasOwnProperty("anexos") && (datos["anexos"].length > 0 ))){
      return true;
    } else {
      return false;
    }
  };

  // Funcion proveniente del hook personalizado useDownloadResource
  const countDownloadedBtn  = useDownloadResource();

  const card = (
    <React.Fragment>
      {/*<LikeDislike providenciaId={datos.providencia_id}/>*/}
      <CardContent className="card_container">
      {((typeof datos.nombreDecision === 'string' ) && (datos.nombreDecision.trim() !== '')) && (
        <p className="text_bolder justify_center text_space_min datos_nombre_decision_semaforo text_center">{datos.nombreDecision}
          {(datos.hasOwnProperty("recursos") && (datos["recursos"].length > 0 ) && (datos["recursos"][0].resuelve.length > 0 ) && (typeof datos["recursos"][0].resuelve[0].semaforo === 'string' ) && (datos["recursos"][0].resuelve[0].semaforo.trim() !== '')) && (
          <Tooltip title={`${datos["recursos"][0].providencia} - ${datos["recursos"][0].resuelve[0].nombre } | Ver más dellates en Documentos asociados`}>
            <span className="semaforo" style={{ backgroundImage: `url(${datos["recursos"][0].resuelve[0].semaforo})`}}> </span>
          </Tooltip>
          )}
        </p>
      )}
      {((typeof datos.fecha === 'string' ) && (datos.fecha.trim() !== '')) && (
        <p className="text_uppercase justify_center text_spacing text_space_min">{datos.fecha}</p>
      )}
      <div className="card_tab"> 
   
      <Tabs value={value} onChange={handleChangeTabCard} className="d_flex ">

          <Tab className="text_nonecase text_bolder text_s" label="Datos generales" />
          <Tab className="text_nonecase text_bolder text_s" label="Datos específicos" />
          {/* Validar si tiene anexos o recursos */}
          { ( validarAnexosRecursos() === true ) && (
            <Tab className="text_nonecase text_bolder text_s" label="Documentos asociados" />
          )}
          {/* Validar si tiene documentos o recursos */}
        </Tabs>
        {( validarAnexosRecursos() === true ) ?             
          <>
            {((typeof datos.hipervinculoFichaJuris === 'string' ) && (datos.hipervinculoFichaJuris.trim() !== '')) && (
              <Tooltip title="Descargar ficha" onClick={(event) => { countDownloadedBtn(event, datos.providencia_id, datos.hipervinculoFichaJuris)}}>
              <a href={datos.hipervinculoFichaJuris} target='_blank' rel="noreferrer">
                <Button className="button_secondary margin_xs card_size_small btn_xs_descargar"  startIcon={<FileDownloadOutlinedIcon/>}></Button>
              </a> 
              </Tooltip>
            )}
          </>
          :
          <>
            {((typeof datos.hipervinculoFichaJuris === 'string' ) && (datos.hipervinculoFichaJuris.trim() !== '')) && (
              <a href={datos.hipervinculoFichaJuris} target='_blank' rel="noreferrer" onClick={(event) => { countDownloadedBtn(event, datos.providencia_id, datos.hipervinculoFichaJuris)}}>
                <Button className="button_secondary margin_xs card_size_small" startIcon={<FileDownloadOutlinedIcon/>}>Descargar ficha</Button>
              </a> 
            )}
          </>
        }
      </div> 
        {value === 0 && (
          <>
            {((typeof datos.extractoBusqueda === 'string' ) && (datos.extractoBusqueda.trim() !== '')) && (
            <div className="width_100" style={{ marginTop: "1rem", marginBottom: "1rem", marginRight: "1rem", marginLeft: "0rem" }}>
                <>
                  <div className="text_center"
                    style={{
                      height: isButtonExtractEnabled ? 'auto' : '50px',
                      overflow: 'hidden'
                    }}>
                    <StringToHtml htmlString={datos.extractoBusqueda}/>
                  </div>
               
                  {isButtonExtractEnabled && (
                    <Button
                      className="link_secondary justify_center text_lowercase" onClick={toggleButtonExtract}> ver menos síntesis
                    </Button>
                  )}
                  {!isButtonExtractEnabled && (
                    <Button
                      className="link_secondary justify_center text_lowercase" onClick={toggleButtonExtract}> ver más síntesis
                    </Button>
                  )}
                </>
            </div>
            )}
            <div className="margin_top_m ">
                {((typeof datos.salaOSeccion === 'string' ) && (datos.salaOSeccion.trim() !== '')) && (
                  <p className="text_space_min">• Sala o Sección:  <span className="text_bolder"> {datos.salaOSeccion}</span> </p>
                )}
                {((typeof datos.caso === 'string' ) && (datos.caso.trim() !== '')) && (
                  <p className="text_space_min">• Macrocaso:  <span className="text_bolder"> {datos.caso}</span> </p>
                )}
                {((typeof datos.procedimiento === 'string' ) && (datos.procedimiento.trim() !== '')) && (
                  <p className="text_space_min">• Procedimiento:  <span className="text_bolder"> {datos.procedimiento}</span> </p>
                )}
            </div>
          </>
        )}
        {value === 1 && 
          <div className="margin_top_m ">
            {((typeof datos.palabrasClaves === 'string' ) && (datos.palabrasClaves.trim() !== '')) && (
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
             )}
             {/* Campo Análisis solo aplicable a Enfoque Genero */}
            {((hiddenAnalisisJuridico === true ) && (typeof datos.analisis === 'string' ) && (datos.analisis.trim() !== '')) && (
            <div className="width_100">
              <Button onClick={toggleAnalisis} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
              Análisis
              </Button>
  
              {isAnalisisExpanded && (
                  <div className="margin_top_s">
                    {((typeof datos.analisis === 'string' ) && (datos.analisis.trim() !== '')) && (
                    <p className="text_space_min text_justify">{/*• Análisis: */}<span className="text_bolder"> {datos.analisis}</span> </p>
                    )}
                  </div>
                )}
             </div>
            )}
            {/* Campo Análisis solo aplicable a Enfoque Genero */}
            {((hiddenAnalisisJuridico === false ) && (typeof datos.problemasJuridicos === 'string' ) && (datos.problemasJuridicos.trim() !== '')) && (
            <div className="width_100">
              <Button onClick={toggleAnalisisJuridico} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
              Análisis Jurídico
              </Button>
  
              {isAnalisisJuridicoExpanded && (
                  <div className="margin_top_s">
                    {((typeof datos.hechos === 'string' ) && (datos.hechos.trim() !== '') && (!datos.hechos.includes("null"))) && (
                      <p className="text_space_min text_justify">• Hechos:  <span className="text_bolder"> {datos.hechos}</span> </p>
                    )}
                    {((typeof datos.problemasJuridicos === 'string' ) && (datos.problemasJuridicos.trim() !== '') && (!datos.problemasJuridicos.includes("null"))) && (
                      <p className="text_space_min text_justify">• Problemas Jurídicos:  <span className="text_bolder"> {datos.problemasJuridicos}</span> </p>
                    )}
                    {((typeof datos.reglas === 'string' ) && (datos.reglas.trim() !== '') && (!datos.reglas.includes("null"))) && (
                      <p className="text_space_min text_justify">• Reglas:  <span className="text_bolder"> {datos.reglas}</span> </p>
                    )}
                    {((typeof datos.aplicacionCasoConcreto === 'string' ) && (datos.aplicacionCasoConcreto.trim() !== '') && (!datos.aplicacionCasoConcreto.includes("null"))) && (
                      <p className="text_space_min text_justify">• Aplicación al Caso Concreto:  <span className="text_bolder"> {datos.aplicacionCasoConcreto}</span> </p>
                    )}
                  </div>
                )}
             </div>
            )}
            {((typeof datos.conclusion_resuelve === 'string' ) && (datos.conclusion_resuelve.trim() !== '')) && (
            <div className="width_100">
              <Button onClick={toggleConclusionResuelve} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
              Conclusión 
              </Button>
              {isConclusionResuelveExpanded && (
                  <div className="margin_top_s">
                    {((typeof datos.conclusion_resuelve === 'string' ) && (datos.conclusion_resuelve.trim() !== '')) && (
                    <p className="text_space_min text_justify">{/*• Conclusión resuelve: */}<span className="text_bolder"> {datos.conclusion_resuelve}</span> </p>
                    )}
                  </div>
                )}
             </div>
            )}
            {((typeof datos.resuelve === 'string' ) && (datos.resuelve.trim() !== '')) && (
            <div className="width_100">
              <Button onClick={toggleResuelve} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
              Resuelve
              </Button>
  
              {isResuelveExpanded && (
                  <div className="margin_top_s">
                    {((typeof datos.resuelve === 'string' ) && (datos.resuelve.trim() !== '')) && (
                    <p className="text_space_min text_justify">{/*• Resuelve: */}<span className="text_bolder"> {datos.resuelve}</span> </p>
                    )}
                  </div>
                )}
             </div>
             )}
  
          </div>
        }
        {value === 2 && (
          <>
            <div className="width_100" style={{ marginTop: "1rem", marginBottom: "1rem", marginRight: "1rem", marginLeft: "0rem" }}> 
               {/* Recursos */}
              {datos.recursos.length > 0 && (
                <>
                <div className="width_100">
                 <Button onClick={toggleRecursos} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
                 Recursos
                 </Button>
                 {isRecursosExpanded && (
                     <div className="margin_top_s" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>                        
                       {(datos.recursos.map((recurso, index) => (
                         <div key={index}>
                           {(recurso.providencia !== 'No Aplica' ) && (
                           <p className="text_space_min text_justify">
                            • Providencia: &nbsp;
                            <span className="text_bolder">
                              <a href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/${recurso.enlace}`} target="_blank" rel="noreferrer">{recurso.providencia}</a>
                            </span>
                            {/*((typeof recurso.resuelve[0].semaforo === 'string' ) && (recurso.resuelve[0].semaforo.trim() !== '')) && (
                                     <span className="semaforo" style={{ backgroundImage: `url(${recurso.resuelve[0].semaforo})`}}> </span>
                            )*/}
                          </p>
                           )}
                           {((typeof recurso.tipo === 'string' ) && (recurso.tipo.trim() !== '')) && (
                             <p className="text_space_min">• Tipo: <span className="text_bolder"> {recurso.tipo}</span></p>
                           )}
                           {((typeof recurso.detalle === 'string' ) && (recurso.detalle.trim() !== '')) && (
                             <p className="text_space_min">• Detalle: <span className="text_bolder"> {recurso.detalle}</span></p>
                           )}
                           {((recurso.resuelve.length > 0 ) && (typeof recurso.resuelve[0].nombre === 'string' ) && (recurso.resuelve[0].nombre.trim() !== '')) && (
                             <p className="text_space_min">• Resuelve: <span className="text_bolder"> {recurso.resuelve[0].nombre}</span></p>
                           )}
                         </div>
                       )))}
                       {((datos["recursos"][0]["ficha_id"] !== null )) && (
                        <CustomGrid className="justify_center">
                        <a href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadfichaext/${datos["recursos"][0]["ficha_id"]}`} target='_blank' rel="noreferrer">
                          <Button startIcon={<FileDownloadOutlinedIcon/>} className="button_secondary margin_xs" >Ver más detalles</Button>
                        </a> 
                        </CustomGrid>
                        )}
                     </div>
                   )}
                </div>
             </>
              )}
              {/** Anexos */}
              {datos.anexos.length > 0 && (
                <>
                   <div className="width_100">
                    <Button onClick={toggleAnexos} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
                    Anexos
                    </Button>
                    {isAnexosExpanded && (
                        <div className="margin_top_s" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>                       
                          {(datos.anexos.map((anexo, index) => (
                            <div key={index}>
                              <p className="text_space_min text_justify">• Providencia: &nbsp;<span className="text_bolder"><a href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/${anexo.hipervinculo}`} target="_blank" rel="noreferrer">{anexo.nombre}</a></span></p>
                              {((typeof anexo.tipo_documento === 'string' ) && (anexo.tipo_documento.trim() !== '')) && (
                                <p className="text_space_min">• Tipo de documento: <span className="text_bolder"> {anexo.tipo_documento}</span></p>
                              )}
                              {((typeof anexo.descripcion === 'string' ) && (anexo.descripcion.trim() !== '')) && (
                                <p className="text_space_min">• Descripción: <span className="text_bolder"> {anexo.descripcion}</span></p>
                              )}
                              <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }}/>
                            </div>
                          )))}
                        </div>
                      )}
                   </div>
                </>
              )}
            </div>
          </>
        )}        


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
            {((typeof datos.expediente === 'string' ) && (datos.expediente.trim() !== '')) && (
              <p className="text_space_min">• Expediente:  <span className="text_bolder"> {datos.expediente}</span> </p>
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
            {((typeof datos.magistrado === 'string' ) && (datos.magistrado.trim() !== '')) && (
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
          )}
          {(((datos.compareciente.trim() !== '') || (datos.tipoSujeto.trim() !== '') || (datos.accionadoVinculado.trim() !== ''))) && (
          <div className="width_100">
            <Button onClick={toggleSujetosProcesales} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :       <ExpandMoreOutlinedIcon />}>
            Sujetos Procesales
            </Button>

            {isSujetosProcesalesExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.compareciente === 'string' ) && (datos.compareciente.trim() !== '')) && (
                    <p className="text_space_min">• Accionante/Solicitante/Compareciente: <span className="text_bolder"> {datos.compareciente}</span> </p>
                  )}
                  {((typeof datos.tipoSujeto === 'string' ) && (datos.tipoSujeto.trim() !== '')) && (
                    <p className="text_space_min">• Tipo de sujeto: <span className="text_bolder"> {datos.tipoSujeto}</span> </p>
                  )}
                  {((typeof datos.accionadoVinculado === 'string' ) && (datos.accionadoVinculado.trim() !== '')) && (
                    <p className="text_space_min">• Accionado/Vinculado: <span className="text_bolder"> {datos.accionadoVinculado}</span> </p>
                  )}
                </div>
              )}
           </div>
          )}
          {/* Documentos Asociados */}
          {/*((typeof datos.documentosAsociados === 'string' ) && (datos.documentosAsociados.trim() !== '')) && (
           <div className="width_100">
            <Button onClick={toggleDocumentosAsociados} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
            Documentos Asociados
            </Button>

            {isDocumentosAsociadosExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.documentosAsociados === 'string' ) && (datos.documentosAsociados.trim() !== '')) && (
                  <p className="text_space_min text_justify"> <span className="text_bolder"><a href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/${datos.documentosAsociadosLink}`} target="_blank" rel="noreferrer">{datos.documentosAsociados}</a></span> </p>
                  )}
                </div>
              )}
           </div>
           )*/}
          {/* Documentos Asociados */}
           {((typeof datos.enfoquesDiferenciales === 'string' ) && (datos.enfoquesDiferenciales.trim() !== '')) && (
           <div className="width_100">
            <Button onClick={toggleEnfoquesDiferenciales} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
           Enfoques diferenciales
            </Button>

            {isEnfoquesDiferencialesExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.enfoquesDiferenciales === 'string' ) && (datos.enfoquesDiferenciales.trim() !== '')) && (
                  <p className="text_space_min text_justify">{/*• Enfoques diferenciales: */} <span className="text_bolder"> {datos.enfoquesDiferenciales}</span> </p>
                  )}
                </div>
              )}
           </div>
           )}
           {((typeof datos.notasRelatoria === 'string' ) && (datos.notasRelatoria.trim() !== '')) && (
           <div className="width_100">
            <Button onClick={toggleNotas} className=" link_secondary text_capitalize"  startIcon={isSujetosProcesalesExpanded ?<ExpandLessOutlinedIcon /> :  <ExpandMoreOutlinedIcon />}>
           Notas de la Relatoría
            </Button>

            {isNotasExpanded && (
                <div className="margin_top_s">
                  {((typeof datos.notasRelatoria === 'string' ) && (datos.notasRelatoria.trim() !== '')) && (
                  <p className="text_space_min text_justify">{/*• Notas de la Relatoría: */}  <span className="text_bolder"> {datos.notasRelatoria}</span> </p>
                  )}
                </div>
              )}
           </div>
           )}
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
              <a href={datos.hipervinculo} target='_blank' rel="noreferrer" onClick={(event) => { countDownloadedBtn(event, datos.providencia_id, datos.hipervinculo)}}>
                <Button startIcon={<FileDownloadOutlinedIcon/>} className="button_primary margin_xs " >Descargar decisión</Button>
              </a> 
            )}
          </CustomGrid>
        </div>
        {((value === 0 ) && (typeof datos.highlight === 'string' ) && (datos.highlight.trim() !== '')) && (
          <div className="width_100" style={{ marginTop: "1rem", marginBottom: "1rem", marginRight: "1rem", marginLeft: "0rem" }}> 
              <>
                <div className="text_center"
                  style={{
                    height: isButtonHighlightEnabled ? 'auto' : '50px',
                    overflow: 'hidden'
                  }}>
                  <StringToHtml htmlString={datos.highlight}/>
                </div>
             
                {isButtonHighlightEnabled && (
                  <Button
                    className="link_secondary justify_center text_lowercase" onClick={toggleButtonHighlight}> ver menos del extracto
                  </Button>
                )}
                {!isButtonHighlightEnabled && (
                  <Button
                    className="link_secondary justify_center text_lowercase" onClick={toggleButtonHighlight}> ver más del extracto
                  </Button>
                )}
              </>
          </div>
          )}
      </CardActions>

     

    </React.Fragment>

  );


  return (

    <Box sx={{ minWidth: 275 }} className='width_100'>
      <Card className="card_search_results" variant="outlined">{card}</Card>
    </Box>
  );
}