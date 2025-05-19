import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, AppBar, Tabs, Tab, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import DOMPurify from 'dompurify';
import Context from '../context/context.js';
import { useCleanLocalStorageVars } from './../hooks/useCleanLocalStorageVars.js';
import ListCardSearch from '../components/listCardSearchMacrocasoResults.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import macrocasoService from '../services/macrocaso.js';
import {  setLocalStorageWithExpiry, getLocalStorageWithExpiry } from '../helpers/utils.js';
import dataResults from '../data_results/dataResDecisionesSalaTribunal.js';

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
    
    const [value, setValue] = React.useState(0); // Inicializa el tab en trámites Sala
    const [value2, setValue2] = React.useState(0);

    const [datos, setDatos] = useState([]);
    const [message, setMessage] = useState({ message: "", classname: "" });
    const [casoSelected, setCasoSelected] = useState({});
    const [selectedTipoTramite, setSelectedTipoTramite] = useState("sala");
    const [selectedtipoDecision, setSelectedtipoDecision] = useState([]);
    const [selectedtipoDecisionShow, setSelectedtipoDecisionShow] = useState(true);


    const { ttlMCD } = useContext(Context); // Variable de contexto determina el tiempo de expiracion de una varaiable localStorage

    // Obtiene decisiones por caso y tipo de tramite sala y tribunal
    const getCasos = (caso, tipoTramite, tiposDecisiones) => {
        let newMessage = { message: "", classname: "" };
        macrocasoService
            .getFilterCasoSalaTribunal(caso, tipoTramite, tiposDecisiones)
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const newData = dataResults( response.data );
                    setDatos(newData);
                    setSelectedtipoDecisionShow(true);
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
        if (Object.keys(caso).length > 0) {
            setCasoSelected(caso);
        }
    },  [caso, casoSelected])  
    
    useEffect(() => {
       if((datos.length === 0) && (caso !== undefined) && (selectedtipoDecision.length > 0)){
            setTimeout(() => {
                getCasos(caso.nombre, selectedTipoTramite, selectedtipoDecision);
            }, 1500);
       }
    },  [datos, selectedtipoDecision, selectedTipoTramite])  
          
    const handleChangeTabCaso = (event, newValue) => {
        setSelectedtipoDecision([]);
        setDatos([]);
        setSelectedtipoDecisionShow(true);
        switch(newValue){
            case 0:
                setSelectedTipoTramite("sala");
                setSelectedtipoDecision([]);
                break;
            case 1:
                setSelectedTipoTramite("tribunal");
                setSelectedtipoDecision([]);
                break;
            default:
                setSelectedTipoTramite("sala");
                setSelectedtipoDecision([]);
                break;
        }
        setValue(newValue);
    };
    
    const handleSelectChange = (event) => {
        setDatos([]);
        setSelectedtipoDecisionShow(false);
        setSelectedtipoDecision(event.target.value);
    };
      
     
    return (
        <Container >
            <>
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
                            <Box className="width_100">
                                {(selectedtipoDecision.length > 0) && (datos.length > 0 ) && (
                                    <h5 className="width_100 text_center margin_m text_bolder">Resultado de búsqueda por:</h5>
                                )}
                                {selectedtipoDecision.length === 0 && (
                                <>
                                    <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión para ver las decisiones por Sala</h5>
                                </>
                                )}
                                <div className="margin_bottom_l width_100">
                                    <div className="wrap width_100 display_flex justify_center">
                                        {(selectedtipoDecisionShow === true) && (
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
                                        )}
                                        {(selectedtipoDecision.length > 0) && (datos.length > 0 ) && (
                                            <div className='width_100'>
                                                <ListCardSearch datosTramite={datos} isExternalFilters={false} selectedTerm={selectedtipoDecision} />
                                            </div>
                                        )}
                                        {(selectedtipoDecision.length > 0) && (datos.length === 0 ) && (
                                            <>
                                                <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuestas..."]}></LinearWithValueLabel> 
                                            </> 
                                        )}
                                    </div>
                                </div>
                            </Box>
                            )}
                            {/* Tramite Sala */}
                            {/* Tramite Tribunal */}
                            {value === 1 && (
                            <Box className="width_100">
                                {(selectedtipoDecision.length > 0) && (datos.length > 0 ) && (
                                    <h5 className="width_100 text_center margin_m text_bolder">Resultado de búsqueda por:</h5>
                                )}
                                {selectedtipoDecision.length === 0 && (
                                <>
                                    <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión para ver las decisiones por Tribunal</h5>
                                </>
                                )}
                                <div className="margin_bottom_l width_100">
                                <div className="wrap width_100 display_flex justify_center">
                                    {(selectedtipoDecisionShow === true) && (
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
                                    )}
                                    {(selectedtipoDecision.length > 0) && (datos.length > 0 ) && (
                                        <div className='width_100'>
                                            <ListCardSearch datosTramite={datos} isExternalFilters={false} selectedTerm={selectedtipoDecision} />
                                        </div>
                                    )}
                                    {(selectedtipoDecision.length > 0) && (datos.length === 0 ) && (
                                        <>
                                            <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuestas..."]}></LinearWithValueLabel> 
                                        </> 
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
        </Container>
    );
}