import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Context from '../context/context.js';
import { Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SmallResultsGrid, MapGrid } from '../components/gridComponents/gridComponents.js'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Tooltip, CircleMarker } from 'react-leaflet';
import FilterLarge from '../components/filterLarge.js';
import ListCardMapaSearch from '../components/sectionMapaJurisprudencial/listCardSearchResults.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import mapaJurisprudencialService from '../services/mapa_jurisprudencial.js';
import { filtroByDefault, removeFragmentoInString, verificaGuardaEnArray, validarfiltroJurisprudencial, getArrayDataGraph, convertObjFiltroJurisToQuery } from '../helpers/utils.js';
import dataResults from '../data_results/dataResMapaJurisprudencial.js';
import 'leaflet/dist/leaflet.css';
import '../App.css';

export default function Mapa() {
 
    const { isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial, setDptoSelMapaJurisprudencial, filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
    
    const [listdpto, setListdpto] = useState([]);
    const [graf, setGraf] = useState([]);
    const [grafOriginal, setGrafOriginal] = useState([]);
    const [message, setMessage] = useState("");

    const [datos, setDatos] = useState([]);
    const [datosOriginales, setDatosOriginales] = useState([]);
   
    const [searchDocsOptions, setSearchDocsOptions] = useState([]);

    const getDocsByProvidencias = () => {
        mapaJurisprudencialService
            .getProvidencias()
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const newDatos = dataResults(response.data);
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`)
                    setDatos(newDatos);
                    setDatosOriginales(newDatos);
                    const newOpcionesDocs = getOpcionesDocs(newDatos);
                    setSearchDocsOptions(newOpcionesDocs);
                } else {
                    setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`)
                }
            })
            .catch(error => console.log(error))
    }
    
    // Genera el listado de opciones de documentos para el autocompletar
    const getOpcionesDocs = (arrDatos) => {
        const arrLinted = Array.from(
            new Map(arrDatos.map(item => [item.nombre, item])).values()
        );
        return [ { "title": "* Todos los resultados" } ].concat(arrLinted.map( item => { return { "title": item.nombre } }));
    };

    // Funcion que genera la lista de departamentos removiendo el fragmento "DEPARTAMENTO"
    const getNewListDptos = (dptosList) => {
        return dptosList.map( departamento => {
            return {
                ...departamento, dpto: removeFragmentoInString("DEPARTAMENTO", departamento.dpto)
            }
        });
    };

    //Funcion que hace el llamado para traer la data solo de la grafica decisiones/tiempo
    const getMapaDptos = () => {
        mapaJurisprudencialService
            .getMapaDptos()
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    setGraf(response.data[0].datagraf);
                    setGrafOriginal(response.data[0].datagraf);
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
                    const newDptos = getNewListDptos(response.data[0]["dpto"]); ;
                    setListdpto(newDptos);
                } else {
                    setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
                }
            }
            )
            .catch(error => console.log(error));
    }
    
    useEffect(() => {
        if(datos.length === 0){
            setFiltroJurisprudencial(filtroByDefault);
            setIsDatosMapaJurisprudencial(false);
            getDocsByProvidencias();
            getMapaDptos();
        } else {
            setIsDatosMapaJurisprudencial(true);
        }
    }, [datos, filtroJurisprudencial]);
    
    useEffect(() => {
        if(!validarfiltroJurisprudencial(filtroJurisprudencial)){
            const stringQuery = convertObjFiltroJurisToQuery(filtroJurisprudencial);
            mapaJurisprudencialService
            .getDetailsGraph(stringQuery)
            .then(response => {
                if((response.status_info.status === 200) && (response.data !== null)) {
                    let newArr = getArrayDataGraph(response.data);
                    setGraf(newArr);
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
                } else {
                    setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
                }
            })
            .catch(error => console.log(error));
        } else {
            setGraf(grafOriginal);
        }   
    }, [filtroJurisprudencial]);
    
    //funcion que realiza el filtro de las providencias cuando se da clic en un dpto
    const searchProDpto = (data) => {
        setDptoSelMapaJurisprudencial(data);
        const newArr = verificaGuardaEnArray(filtroJurisprudencial.departamentos, data.dpto);
        setFiltroJurisprudencial({...filtroJurisprudencial, departamentos: newArr });
    }
    
   
    const WrapMapGrid = styled(Grid)(({ theme }) => ({
        
            [theme.breakpoints.up('sm')]: {
                display:  'flex' ,
                flexWrap: 'nowrap',
            },
            [theme.breakpoints.down('sm')]: {
                display:  'flex' ,
                flexWrap: 'wrap',
            },
        
    }));
    
    return (
        <div> 
            <Container className="container_large">
                <h1 className="text_center margin_top_l">Mapa Jurisprudencial </h1>  
                <h5 className="text_center">Encuentre las decisiones de la JEP y conozca la actividad judicial en el territorio Colombiano</h5>
                {( !isDatosMapaJurisprudencial ) && (
                    <LinearWithValueLabel></LinearWithValueLabel>
                )}
                {( isDatosMapaJurisprudencial ) && (
                   <FilterLarge> </FilterLarge>
                )}
                <WrapMapGrid container spacing={0} >
                    <SmallResultsGrid item xs={12} sm={12} md={5} lg={5} xl={5} className="padding_none" >
                        <ListCardMapaSearch 
                            isListSmall={true} 
                            datosMapa={datos}
                            datosOriginalesMapa={datosOriginales}
                            searchDocsOptionsMapa={searchDocsOptions}
                        > 
                        </ListCardMapaSearch>
                    </SmallResultsGrid>
                    {(  isDatosMapaJurisprudencial === true ) && (
                        <MapGrid item xs={12} sm={12} md={7} lg={7} xl={7} sx={{ height: '100%', overflow: 'hidden' }}>
                            <div className="map light_blue">
                                <MapContainer 
                                    center={[4.624335, -74.063645]} 
                                    zoom={6}  
                                    style={{ height: "100vh", zIndex: 0 }} 
                                    scrollWheelZoom={false} 
                                    fadeAnimation={true} 
                                    markerZoomAnimation={true} 
                                    doubleClickZoom={false} 
                                    dragging={true} >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    { listdpto.map((maker, k) => {
                                        return (
                                            <CircleMarker
                                                key={k}
                                                center={[maker.lat, maker.long]}
                                                pathOptions={{ color: 'red' }}
                                                eventHandlers={{
                                                    click: (e) => {
                                                        searchProDpto(maker)
                                                    },
                                                }}
                                                radius={6}>
                                                <Tooltip direction="top" offset={[13, 0]} opacity={1}>
                                                    <span>{maker.dpto}</span><br/>
                                                    <span>Decisiones publicadas : {maker.cantidad}</span><br/>
                                                    <p>Medidas cautelares: {maker.medidas_cautelares}</p>
                                                </Tooltip>
                                            </CircleMarker>
                                            )
                                        })
                                    }
                                </MapContainer>
                            </div>
                            <Box component="section" sx={{ p: 5, border: '1px solid grey', mt: 2 }}>
                                {<ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={graf} margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <XAxis dataKey="name" padding={{ left: 30, right: 30 }}
                                            label={{
                                                value: `Fecha`,
                                                style: { textAnchor: 'middle', paddingBottom: '0'},
                                                position: 'insideCenter',
                                                offset: 0,
                                                dx: 0,
                                                dy: 25
                                            }}
                                        />
                                        <YAxis 
                                            label={{
                                                value: `Decisiones Publicadas`,
                                                style: { textAnchor: 'middle', paddingBottom: '0'},
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: 0,
                                                dx: -6
                                            }}/>
                                        <Legend verticalAlign="top" height={36}/>
                                        <Line type="monotone" dataKey="fecha" stroke="#8884d8" activeDot={{ r: 8 }} label={'fffff'}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                }
                            </Box>      
                        </MapGrid>
                    )}
                </WrapMapGrid> 
            </Container>
        </div>
    );
}
