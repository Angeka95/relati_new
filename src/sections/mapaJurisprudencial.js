import SearchBarSmall from '../components/searchBarSmall.js';
import Filter from '../components/filter.js';
import FilterLarge from '../components/filterLarge.js';
import ListCardMapaSearch from '../components/listCardSearchMapaResults.js';
import '../App.css';
import { Container, Grid, Box } from '@mui/material';
import LinearWithValueLabel from '../components/linearProgress.js';
import React, { useState, useEffect, PureComponent, useContext } from 'react';
import { styled } from '@mui/material/styles';
import mapaJurisprudencialService from '../services/mapa_jurisprudencial.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Tooltip, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { truncateWithEllipsis, obtenerAnio, obtenerPalabrasFromArrayObject } from '../helpers/utils.js';
import Context from '../context/context.js';
import { filtroMapaByDefault, removeFragmentoInString } from '../helpers/utils.js';

export default function Mapa() {

    const SmallResultsGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.up('sm')]: {
            margin: '60px',

        },

        [theme.breakpoints.down('sm')]: {
            padding: '20px',

        }
    }));
    const  WrapMapGrid= styled(Grid)(({ theme }) => ({

        [theme.breakpoints.up('sm')]: {
            display:  'flex' ,
            flexWrap: 'nowrap',
        },
        [theme.breakpoints.down('sm')]: {
            display:  'flex' ,
            flexWrap: 'wrap',
        },

    }));
    const MapGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.up('sm')]: {
            margin: '60px 60px 60px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '20px 5px 60px 5px',
        },


    }));
 
    const { isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial, dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial, setListaDptosMapaJurisprudencial,  filtroMapaJurisprudencial, setFiltroMapaJurisprudencial } = useContext(Context);
    
    const [listdpto, setListdpto] = useState([]);
    const [graf, setGraf] = useState([]);
    const [message, setMessage] = useState("");

    const [datos, setDatos] = useState([]);
    const [datosOriginales, setDatosOriginales] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState("");
    const [searchDocsOptions, setSearchDocsOptions] = useState([]);

    const getDocsByProvidencias = () => {
        mapaJurisprudencialService
            .getProvidencias()
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const cardsArr = response.data.map(item => {
                        let itemProvidencia = {
                            id: item.id,
                            fecha: item.fecha_providencia,
                            anio: obtenerAnio(item.fecha_providencia),
                            asuntoNombreCaso: "",
                            asuntoCasoEllipsed: ((item.nombre !== null)) ? truncateWithEllipsis(item.asuntocaso) : "", 
                            asuntoNombre: ((item.nombre !== null)) ? item.nombre : "",
                            nombre: ((item.nombre !== null)) ? item.nombre : "",
                            actuacion: obtenerPalabrasFromArrayObject(item.actuacion),
                            caso:  ((item.caso !== null)) ? item.caso : "",
                            sala: ((item.despacho !== null) && item.despacho.hasOwnProperty("nombre")) ? item.despacho.nombre : "",
                            salaDescripcion:  ((item.despacho !== null) && item.despacho.hasOwnProperty("descripcion")) ? item.despacho.descripcion : "",
                            salaId:  ((item.despacho !== null) && item.despacho.hasOwnProperty("id")) ? item.despacho.id : "",
                            asuntoCaso: (item.asuntocaso !== null) ? item.asuntocaso : "",
                            departamentoId: (item.departamento_ext.length > 0) ? item.departamento_ext[0].id : "",
                            providencia: (item.departamento_ext.length > 0) ? item.departamento_ext[0].providencia_id : "",
                            departamentoNombre: removeFragmentoInString("DEPARTAMENTO", item.departamento_ext[0].nombre_dpto),
                            hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "",
                            comparecientes: (item.hasOwnProperty("tipopeti")) && (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "",
                            delitos: (item.hasOwnProperty("delitos")) && (item.delitos.length > 0 )? obtenerPalabrasFromArrayObject(item.delitos, "delito", null, false) : "",
                            procedimientos: (item.hasOwnProperty("actuacion")) && (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, false) : "",
                            palabrasClave: "",
                            municipio: "",
                            palabrasClaveBuscador: "",
                            palabrasClaveFichaJuridica: (item.getfichas.length > 0) ? "Obtener palabras claves ficha juridica": ""
                        };
                        itemProvidencia["asuntoNombreCaso"] = `${item.asuntocaso} ${item.nombre}`;
                        itemProvidencia["palabrasClave"] = `${itemProvidencia["delitos"]}, ${itemProvidencia["comparecientes"]}, ${itemProvidencia["procedimientos"]}`;
                        return itemProvidencia;
                    });
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`)
                    setDatos(cardsArr);
                    setDatosOriginales(cardsArr);
                    const newOpcionesDocs = getOpcionesDocs(cardsArr);
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
        return [ { "title": "*" } ].concat(arrLinted.map( item => { return { "title": item.nombre } }));
    };

    // Funcion que genera la lista de departamentos removiendo el fragmento "DEPARTAMENTO"
    const getNewListDptos = (dptosList) => {
        return dptosList.map( departamento => {
            return {
                ...departamento, dpto: removeFragmentoInString("DEPARTAMENTO", departamento.dpto)
            }
        });
    };

    //funcion que hace el llamado para traer la data de los dpto del mapa
    const getMapaDptos = () => {
        mapaJurisprudencialService
            .getMapaDptos()
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    setGraf(response.data[0].datagraf);
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
                    const newDptos = getNewListDptos(response.data[0]["dpto"]); 
                    setListdpto(newDptos);
                    setListaDptosMapaJurisprudencial(setDatosDepartamentos(newDptos));
                } else {
                    setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
                }
            }
            )
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if(datos.length === 0){
            setFiltroMapaJurisprudencial(filtroMapaByDefault);
            setIsDatosMapaJurisprudencial(false);
            getDocsByProvidencias();
        } else {
            setIsDatosMapaJurisprudencial(true);
            getMapaDptos();
        }
    }, [datos]);

    //funcion que realiza el filtro de las providencias cuando se da clic en un dpto
    const searchprodpto = (data) => {
        setDptoSelMapaJurisprudencial(data);
        setFiltroMapaJurisprudencial({...filtroMapaJurisprudencial, departamentos: [ data.dpto ]});
    }

    //funcion que crea un array de objetos enviado a la lista de filtros corrspondiente a dptos
    const setDatosDepartamentos = (dptos) => {
        const listaDptos = dptos.map( item => { return { "nombre_campo": item.dpto, "valor": item.dpto } });
        return listaDptos;
    }
    
  return (
    <div> 
        
        <Container className="container_large">
        <h1 className="text_center margin_top_l">Mapa Jurisprudencial </h1>  
        <p className="text_center">Encuentre las decisiones de la JEP y conozca la actividad judicial en el territorio Colombiano</p>
        
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

            { ( isDatosMapaJurisprudencial === true ) && (
                    <MapGrid item xs={12} sm={12} md={7} lg={7} xl={7} sx={{ height: '100%', overflow: 'hidden' }}>
                    <Box component="section" sx={{ p: 5, border: '1px solid grey', mb: 2 }}>
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

                    <div className="map light_blue">
                        <MapContainer center={[4.624335, -74.063645]} zoom={6}  style={{ height: "100vh", zIndex: 0 }} scrollWheelZoom={false} fadeAnimation={true} markerZoomAnimation={true} doubleClickZoom={false} dragging={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                    { listdpto.map( (maker, k) => {

                        return (
                            <CircleMarker
                                key={k}
                                center={[maker.lat, maker.long]}
                                pathOptions={{ color: 'red' }}
                                eventHandlers={{
                                    click: (e) => {
                                        searchprodpto(maker)
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
                    
                </MapGrid>
            )}
            
            
        </WrapMapGrid> 
        
        </Container>
    
    </div>
    
  );
}
