import SearchBarSmall from '../components/searchBarSmall.js';
import Filter from '../components/filter.js';
import FilterLarge from '../components/filterLarge.js';
import ListCardMapaSearch from '../components/listCardSearchMapaResults.js';
import '../App.css';
import { Container, Grid } from '@mui/material';
import React, { useState, useEffect, PureComponent, useContext } from 'react';
import { styled } from '@mui/material/styles';
import mapaJurisprudencialService from '../services/mapa_jurisprudencial.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Tooltip, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Context from '../context/context.js';

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
 
    const { isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial, dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial } = useContext(Context);
    
    const [listdpto, setListdpto] = useState([]);
    const [graf, setGraf] = useState([]);
    const [dptoselect, setDptoselect] = useState([]);
    const [message, setMessage] = useState("");

    //funcion que hace el llamado para traer la data de los dpto del mapa
    const getMapaDptos = () => {
        mapaJurisprudencialService
            .getMapaDptos()
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    setListdpto(response.data[0].dpto);
                    setGraf(response.data[0].datagraf);
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
                } else {
                    setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`)
                }
            }
            )
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getMapaDptos()
    }, []);

    //funcion que realiza el filtro de las providencias cuando se da clic en un dpto
    const searchprodpto = (data) => {
        setDptoselect(data);
        setDptoSelMapaJurisprudencial(data);
    }

  return (
    <div> 
    <Container className="container_large">
    <h1 className="text_center margin_top_l">Mapa Jurisprudencial </h1>  
    <p className="text_center">Encuentre las decisiones de la JEP y conozca la actividad judicial en el territorio Colombiano</p>

    {/*<FilterLarge> 
        
    </FilterLarge>*/}
    { !(isDatosMapaJurisprudencial ) && (
        <div>Esperando datos...</div>
    )} 
    { isDatosMapaJurisprudencial && (
        <WrapMapGrid container spacing={0} >
            <SmallResultsGrid item xs={12} sm={12} md={5} lg={5} xl={5} className="padding_none" >
                <ListCardMapaSearch 
                    isListSmall={true}
                > </ListCardMapaSearch> 

            </SmallResultsGrid>

            <MapGrid item xs={12} sm={12} md={7} lg={7} xl={7} >
                <div>
                    {/*<LineChart width={500} height={300} data={graf}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" padding={{ left: 30, right: 30 }}/>
                        <YAxis label={{
                            value: `Desiciones publicadas`,
                            style: { textAnchor: 'middle', paddingBottom: '10%'},
                            angle: -90,
                    
                            position: 'insideLeft',
                            offset: 0,
                        }}/>
                        <Legend />
                        <Line type="monotone" dataKey="fecha" stroke="#8884d8" activeDot={{ r: 8 }} label={'fffff'}/>
                    </LineChart>*/}
                </div>

                <div className="map light_blue">
                    <MapContainer center={[4.624335, -74.063645]} zoom={6}  style={{ height: "100vh", zIndex: 0 }} scrollWheelZoom={false} fadeAnimation={true} markerZoomAnimation={true} doubleClickZoom={false} dragging={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                { listdpto.map( (maker) => {

                    //console.log(maker) comentado temporalmente

                    return (
                        <CircleMarker
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
        </WrapMapGrid> 
     )} 
    </Container>
    
    </div>
    
  );
}
