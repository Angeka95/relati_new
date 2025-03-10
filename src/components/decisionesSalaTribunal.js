import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, AppBar, Tabs, Tab, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import DOMPurify from 'dompurify';
import ListCardSearch from '../components/listCardSearchMacrocasoResults.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import macrocasoService from '../services/macrocaso.js';
import { obtenerPalabrasFromArrayObject, convertirStringAHtml } from '../helpers/utils.js';

export default function DecisionesSalaTribunal({caso}) {

    //const tipoDecision = ['Apertura', 'Determinación de hechos y conductas', 'Resolución de conclusiones', 'Acreditación de víctimas individuales y colectivas', 'Auto que fija fecha de audiencia y/o diligencia', 'Régimen de condicionalidad', 'Otras decisiones'];
    
    const tipoDecisionSala = [
        'Acreditación de víctimas individuales y colectivas',
        'Apertura',
        'Auto que fija fecha de audiencia y/o diligencia',
        'Determinación de hechos y conductas',
        'Otras decisiones',
        'Resolución de conclusiones'
    ];
    
    const tipoDecisionTribunal = [
        'Asume competencia',
        'Audiencias de observaciones a la resolución de conclusiones',
        'Auto de Correspondencia',
        'Auto que fija fecha de audiencia y/o diligencia',
        'Medidas cautelares',
        'Otras decisiones',
        'Sentencia'
    ];

    const subcasos = ['Caso 001', 'Caso 002', 'Caso 003', 'Caso 004', 'Caso 005', 'Caso 006', 'Caso 007', 'Caso 008', 'Caso 009', 'Caso 010', 'Caso 011'];
    //const subcasos = ['Subcaso 01', 'Subcaso 02', 'Subcaso 03', 'Subcaso 04'];
    
    const [value, setValue] = React.useState(0); // Inicializa el tab en trámites Sala
    const [value2, setValue2] = React.useState(0);
    const [datosSala, setDatosSala] = useState([]);
    const [datosTribunal, setDatosTribunal] = useState([]);
    const [datos, setDatos] = useState([]);
    const [message, setMessage] = useState({ message: "", classname: "" });
    const [selectedtipoDecision, setSelectedtipoDecision] = useState([]);
    const [selectedSubcasos, setSelectedSubcasos] = useState([]);

    const setArrayDatosCasos = (arrData) => {
        const newArray = arrData.map(item => {
          let newItem = {
              id: item.id,
              fecha: item.fecha_providencia,
              asunto: item.asuntocaso,
              salaOSeccion: item.despacho.nombre,
              nombreDecision: item.nombre,
              procedimiento: (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, true) : "",
              expediente: (item.orfeo !== null ) ? item.orfeo : "",
              departamento: (item.departamento_ext.length > 0 )? obtenerPalabrasFromArrayObject(item.departamento_ext, "nombre_dpto") : "",
              magistrado: (item.magistrado.length > 0 )? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "", 
              municipio: (item.municipio_ext.length > 0 )? obtenerPalabrasFromArrayObject(item.municipio_ext, "nombre_muni", null, false) : "", 
              delito: (item.delitos.length > 0 )?  obtenerPalabrasFromArrayObject(item.delitos, "delito") : "", 
              anioHechos: (item.anio_hechos.length > 0 )? obtenerPalabrasFromArrayObject(item.anio_hechos, "anio") : "", 
              tipo: (item.documento !== null ) ?  `${item.documento.nombre}` : "",
              radicado: (item.radicado.length !== null ) ? item.radicado : "",
              compareciente: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas, "compareciente", null, false) : "", 
              tipoSujeto: (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "",
              accionadoVinculado: (item.accionado.length > 0 )? obtenerPalabrasFromArrayObject(item.accionado, "accionado", null, false): "",  
              palabrasClaves:  (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "",
              hechos: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "hechos", null, false) : "",
              problemasJuridicos: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "", 
              reglas: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "reglas", null, false) : "",
              aplicacionCasoConcreto: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "tesisjurisprudencial", null, false) : "",
              resuelve: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].resuelve, "descripcion", null, false) : "",
              documentosAsociados:  (item.providencia_votos.length > 0 )? obtenerPalabrasFromArrayObject(item.providencia_votos, "nombre", null, false): "", 
              enfoquesDiferenciales: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].enfoques_diferenciales, "nombre_enfoque", null, false): "", 
              notasRelatoria: ((item.getfichas.length > 0 ) && (item.getfichas[0].hasOwnProperty("notas"))) ? item.getfichas[0].notas : "", 
              hipervinculo:  (item.hipervinculo !== "" ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "", 
              hipervinculoFichaJuris: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id === 14)) ? `https://relatoria.jep.gov.co/downloadfichaext/${item.getfichas[0].id}` : "",
              estadoFichaJuris: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id !== null))  ?  item.getfichas[0].estado_id : "",
              tipoDecision: (item.detalle_caso !== null ) ? `${item.detalle_caso}` : "",
              caso: (item.caso !== null ) ? item.caso : "",
              subcaso: (item.casopro.length > 0 ) ? obtenerPalabrasFromArrayObject(item.casopro, "caso", null, false) : "",
              extractoBusqueda: ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_descripcion !== null))  ?  convertirStringAHtml(item.getfichas[0].sintesis_descripcion) : "",
              conclusion_resuelve: ((item.conclusion_resuelve !== null) && (item.hasOwnProperty("conclusion_resuelve"))) ? item.conclusion_resuelve : ""
          };
          newItem["hechos"] =  DOMPurify.sanitize(newItem.hechos, { ALLOWED_TAGS: [] });
          newItem["extractoBusqueda"] =  DOMPurify.sanitize(newItem.extractoBusqueda, { ALLOWED_TAGS: [] });
          newItem["comparecientes"] = newItem.tipoSujeto;
          newItem["problemasJuridicos"] =  DOMPurify.sanitize(newItem.problemasJuridicos, { ALLOWED_TAGS: [] });
          newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.salaOSeccion} ${newItem.delito} ${newItem.procedimiento} ${newItem.compareciente} ${newItem.tipoSujeto} ${newItem.departamento} ${newItem.nombreDecision} ${newItem.magistrado}  ${newItem.palabrasClaves}`}; 
          return newItem;
        });
        return newArray;
      }
      
    
    // Obtiene decisiones por sala y tribunal
    const getCasos = (caso) => {
        let newMessage = { message: "", classname: "" };
        macrocasoService
            .getCasosXTramite(caso)
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const dataSala = setArrayDatosCasos(response.data[0].casosSala);
                    const dataTribunal = setArrayDatosCasos(response.data[0].casosTribunal);
                    setDatosSala(dataSala);
                    setDatosTribunal(dataTribunal);
                    newMessage = { message: `${response.status_info.reason}`, classname: "success" };
                } else {
                    newMessage = { message: `${response.status_info.reason}`, classname: "error" };
                }
                setMessage(newMessage);
            }
            )
            .catch(error => {
                newMessage = { message: `${error}`, classname: "error" };
                setMessage(newMessage); 
            });
      };
      
    
    useEffect(() => {
        if((datosSala.length === 0) && (value === 0) && (caso !== null)) {
            getCasos(caso.nombre);
        } 
    }, [value, caso]);
    
    useEffect(() => {
            if(value === 0) {
                setDatos(datosSala);
            } else {
                setDatos(datosTribunal);
            }    
    }, [value]);
    
    const handleChangeTabCaso = (event, newValue) => {
        setSelectedtipoDecision([]);
        setSelectedSubcasos([]);
        switch(newValue){
            case 0:
                setDatos(datosSala);
                break;
            case 1:
                setDatos(datosTribunal);
                break;
            default:
                setDatos([]);
                break;
        }
        setValue(newValue);
    };
    
    const handleSelectChange = (event) => {
        if(value === 0){
            setDatos(datosSala);
        } else {
            setDatos(datosTribunal);
        }
        setSelectedtipoDecision(event.target.value);
    };

    const handleSelectSubcasos = (event2) => {
        if(value === 0){
            setDatos(datosSala);
        } else {
            setDatos(datosTribunal);
        }
        setSelectedSubcasos(event2.target.value);
    };
      
    useEffect(() => {
        let datosFiltrados = datos;
        if(selectedtipoDecision.length > 0){
            datosFiltrados = datosFiltrados.filter( item => { 
                return selectedtipoDecision.includes(item.tipoDecision);
            }); 
            setDatos(datosFiltrados);
        } 
        if(selectedSubcasos.length > 0){
            datosFiltrados = datosFiltrados.filter( item => { 
                return selectedSubcasos.includes(item.subcaso);
            }); 
            setDatos(datosFiltrados);
        } 
    }, [ selectedtipoDecision, selectedSubcasos]);
     
    return (
        <>
        <Container >
            {((datosSala.length === 0) && (datosTribunal.length === 0)) ? 
                <div style={{ "marginTop": "3rem" }}><LinearWithValueLabel></LinearWithValueLabel></div>
            : <>
            <div className="margin_top_xl">
                <h2 className="text_bolder width_100 text_center ">Decisiones relacionadas al Caso</h2>
                <div className="margin_top_m text_center margin_bottom_l"></div>
            </div>
            <Container className="shadow_smooth tab_container">
                <AppBar position="static" className="noshadow ">
                <Tabs value={value} onChange={handleChangeTabCaso} className='light_white ' classes={{ indicator: 'custom_indicator' }}>
                    <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Sala"/>
                    <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Tribunal"/>
                </Tabs>
                <div className="separator_tab"> </div>
                </AppBar>
                <Box p={3}>
                <div >
                    <Container className='width_100'>
                    <div className="wrap justify_center item_boletin_container">
                        {/* Tramite Sala */}
                        {value === 0 && (
                        <Box >
                            {selectedtipoDecision.length > 0   && (
                            <h5 className="width_100 text_center margin_m text_bolder">Resultado de búsqueda por:</h5>
                            )}
                            {selectedtipoDecision.length === 0 && (
                            <>
                                {/*<h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones por Tribunal</h5>*/}
                                <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión para ver las decisiones por Tribunal</h5>
                            </>
                            )}
                            <div className="margin_bottom_l">
                            <div className="wrap width_100 display_flex justify_center">
                                <FormControl className="input_caso ">
                                <InputLabel className="" id="multi-select-label">Tipo de Decisión</InputLabel>
                                <Select
                                    labelId="multi-select-label"
                                    multiple
                                    value={selectedtipoDecision}
                                    onChange={handleSelectChange}
                                    renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {selected.map((value) => (
                                        <Chip key={value} label={value} sx={{ m: 0.5 }} />
                                        ))}
                                    </Box>
                                    )}
                                >
                                    {tipoDecisionSala.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                    ))}
                                </Select>
    
                                </FormControl>
                                {/* Por el momento se omite subcaso */}
                                {/*<FormControl className="input_caso">
                                <InputLabel id="multi-select-label">Subcaso</InputLabel>
                                <Select
                                    labelId="multi-select-label"
                                    multiple
                                    value={selectedSubcasos}
                                    onChange={handleSelectSubcasos}
                                    renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {selected.map((value2) => (
                                        <Chip key={value2} label={value2} sx={{ m: 0.5 }} />
                                        ))}
                                    </Box>
                                    )}
                                >
                                    {subcasos.map((subcasos) => (
                                    <MenuItem key={subcasos} value={subcasos}>
                                        {subcasos}
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>*/}
                                {(selectedtipoDecision.length > 0 || selectedSubcasos.length > 0) && (
                                <div className='width_100'>
                                    <ListCardSearch datosTramite={datos} isExternalFilters={false} selectedTerm={`"${(selectedtipoDecision.concat(selectedSubcasos)).join(", ")}"`} />
                                </div>
                                )}

                            </div>
                            </div>
                        </Box>
                        )}
                        {/* Tramite Sala */}
                        {/* Tramite Tribunal */}
                        {value === 1 && (
                        <Box >
                            {selectedtipoDecision.length > 0 && (
                            <h5 className="width_100 text_center margin_m text_bolder">Resultado de búsqueda por:</h5>
                            )}
                            {selectedtipoDecision.length === 0 && (
                            <>
                                {/*<h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones por Tribunal</h5>*/}
                                <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión para ver las decisiones por Tribunal</h5>
                            </>
                            )}
                            <div className="margin_bottom_l">
                            <div className="wrap width_100 display_flex justify_center">
                                <FormControl className="input_caso ">
                                <InputLabel className="" id="multi-select-label">Tipo de Decisión</InputLabel>
                                <Select
                                    labelId="multi-select-label"
                                    multiple
                                    value={selectedtipoDecision}
                                    onChange={handleSelectChange}
                                    renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {selected.map((value) => (
                                        <Chip key={value} label={value} sx={{ m: 0.5 }} />
                                        ))}
                                    </Box>
                                    )}
                                >
                                    {tipoDecisionTribunal.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                                {/* Por el momento se omite subcaso */}
                                {/*<FormControl className="input_caso">
                                <InputLabel id="multi-select-label">Subcaso</InputLabel>
                                <Select
                                    labelId="multi-select-label"
                                    multiple
                                    value={selectedSubcasos}
                                    onChange={handleSelectSubcasos}
                                    renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {selected.map((value2) => (
                                        <Chip key={value2} label={value2} sx={{ m: 0.5 }} />
                                        ))}
                                    </Box>
                                    )}
                                >
                                    {subcasos.map((subcasos) => (
                                    <MenuItem key={subcasos} value={subcasos}>
                                        {subcasos}
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>*/}
                                {(selectedtipoDecision.length > 0 || selectedSubcasos.length > 0) && (
                                <div className='width_100'>
                                    <ListCardSearch datosTramite={datos} isExternalFilters={false} selectedTerm={`"${(selectedtipoDecision.concat(selectedSubcasos)).join(", ")}"`} />
                                </div>
                                )}
                            </div>
                            </div>
                        </Box>
                        )}
                        {/* Tramite Tribunal */}
                    </div>
                    </Container>
                </div>
                </Box>
            </Container>
            </>
            }    
            </Container>
        </>
    );
}