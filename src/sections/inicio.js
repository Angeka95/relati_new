import React, { useEffect, useState, useRef, useContext } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relativ2.png';
import { Box, Container, Grid, Button, List, ListItem } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';
import CardDecision from '../components/cardDecision.js';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Masonry from 'react-masonry-css';
import Context from '../context/context';
import { Link } from 'react-router-dom';


export default function Home() {

    // Layout Masonry Decisiones Recientes
    const masonryGridRef = useRef(null);
    const breakpointColumnsObj = {
        default: 2,
        1100: 2,
        700: 1,
    };

    const { verMasDecisionesRecientes } = useContext(Context);


    // Links otras secciones

    const navigate = useNavigate();

    const goToMapaJurispudencialPage = () => {
        navigate('/mapa-jurisprudencial');
    };

    const goToBoletinesPage = () => {
        navigate('/boletines');
    };



    const macrocasos = [

        {
            id: 1,
            numeroCaso: "01",
            nombreCaso: "Secuestro",
        },

        {
            id: 2,
            numeroCaso: "02",
            nombreCaso: "Situación territorial de Nariño ",
        },

        {
            id: 3,
            numeroCaso: "03",
            nombreCaso: " “Falsos positivos” ",
        },

        {
            id: 4,
            numeroCaso: "04",
            nombreCaso: "Situación territorial de Urabá",
        },

        {
            id: 5,
            numeroCaso: "05",
            nombreCaso: "Situación territorial de Cauca y Valle",
        },
        {
            id: 6,
            numeroCaso: "06",
            nombreCaso: "Victimización de la UP",
        },
        {
            id: 7,
            numeroCaso: "07",
            nombreCaso: "Reclutamiento de niñas y niños",
        },
        {
            id: 8,
            numeroCaso: "08",
            nombreCaso: "Crímenes de la fuerza pública y paramilitares",
        },
        {
            id: 9,
            numeroCaso: "09",
            nombreCaso: "Crímenes contra Pueblos Étnicos"
        },
        {
            id: 10,
            numeroCaso: "10",
            nombreCaso: " Crímenes cometidos por Farc-EP",
        },
        {
            id: 11,
            numeroCaso: "11",
            nombreCaso: " Violencia de género, sexual y reproductiva",
        },


    ]

    let decisionesRecientes = [
        {
            id: 1,
            "fecha": "2023-06-15",
            "asunto": "En el asunto de héctor orlando bastidas bravo",
            "nombreDecision": "Sentencia SRT-ST-117-2024",
            "salaOSeccion": "Sala de Amnistía",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        },
        {
            id: 2,
            "fecha": "2022-03-18",
            "asunto": "En el asunto de martin gonzales leal",
            "nombreDecision": "Sentencia SRT-ST-120-2024",
            "salaOSeccion": "Sección de Revisión",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        },
        {
            id: 3,
            "fecha": "2021-06-22",
            "asunto": "En el asunto de juana castellanos rodriguez",
            "nombreDecision": "Sentencia SRT-ST-104-2024",
            "salaOSeccion": "Sala de Amnistía",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        },
        {
            id: 4,
            "fecha": "2023-08-11",
            "asunto": "En el asunto de mario leal prado",
            "nombreDecision": "Sentencia SRT-ST-104-2024",
            "salaOSeccion": "Sección de Revisión",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        },

        // {
        //     id: 5,
        //     "fecha": "2023-06-15",
        //     "asunto": "En el asunto de héctor orlando bastidas bravo",
        //     "nombreDecision": "Sentencia SRT-ST-117-2024",
        //     "salaOSeccion": "Sala de Amnistía",
        //     "grupoPertence": "Grupo armado no firmante",
        //     "lugarHechos": "Acacías, Meta",
        //     "magistrado": "Augusto Rodriguez",
        //     "macrocaso": "08 ",
        //     "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        //     "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        // },
        // {
        //     id: 6,
        //     "fecha": "2022-03-18",
        //     "asunto": "En el asunto de martin gonzales leal",
        //     "nombreDecision": "Sentencia SRT-ST-120-2024",
        //     "salaOSeccion": "Sección de Revisión",
        //     "grupoPertence": "Grupo armado no firmante",
        //     "lugarHechos": "Acacías, Meta",
        //     "magistrado": "Augusto Rodriguez",
        //     "macrocaso": "08 ",
        //     "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        //     "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        // },
        // {
        //     id: 7,
        //     "fecha": "2021-06-22",
        //     "asunto": "En el asunto de juana castellanos rodriguez",
        //     "nombreDecision": "Sentencia SRT-ST-104-2024",
        //     "salaOSeccion": "Sala de Amnistía",
        //     "grupoPertence": "Grupo armado no firmante",
        //     "lugarHechos": "Acacías, Meta",
        //     "magistrado": "Augusto Rodriguez",
        //     "macrocaso": "08 ",
        //     "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        //     "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        // },
        // {
        //     id: 8,
        //     "fecha": "2023-08-11",
        //     "asunto": "En el asunto de mario leal prado",
        //     "nombreDecision": "Sentencia SRT-ST-104-2024",
        //     "salaOSeccion": "Sección de Revisión",
        //     "grupoPertence": "Grupo armado no firmante",
        //     "lugarHechos": "Acacías, Meta",
        //     "magistrado": "Augusto Rodriguez",
        //     "macrocaso": "08 ",
        //     "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        //     "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        // },
    ]

    const boletines = [
        {
            id : 1,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf', 
            fecha: "2024-01", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf', 
            twitter: 'https://twitter.com/intent/tweet?text=Me gusta boletin_01_enero-2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
            mail:true, 
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8'
        },
    
        {
            id : 2,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_02_febrero_2024.pdf', 
            fecha: "2024-02", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_02_febrero_2024.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta boletin_02_febrero_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_02_febrero_2024.pdf",
            mail: true, 
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_02_febrero_2024.png?ver=2.8'
        },
    
        {
            id : 3,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_03_marzo-2024.pdf', 
            fecha: "2024-03", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_03_marzo-2024.pdf', 
            twitter: '"https://twitter.com/intent/tweet?text=Me gusta boletin_03_marzo-2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_03_marzo-2024.pdf"',
            mail: true, 
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_03_marzo_2024.png?ver=2.8'
        },
        {
            id : 4,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_04_abril-2024.pdf', 
            fecha: "2024-04", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_04_abril-2024.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta boletin_04_abril-2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_04_abril-2024.pdf",
            mail: true, 
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_04_abril-2024.png'
        },
        {
            id : 5,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_05_mayo-2024.pdf', 
            fecha: "2024-05", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_05_mayo-2024.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_05_mayo-2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_05_mayo-2024.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_05_mayo_2024.png?ver=2.8'
        },
    
    
        {
            id : 6,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_04_edicion-especial_2024.pdf', 
            fecha: "2024-01", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_04_edicion-especial_2024.pdf', 
            twitter: 'https://twitter.com/intent/tweet?text=Me gusta boletin_04_edicion-especial_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_04_edicion-especial_2024.pdf',
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_especial_04.pdf',
            esEspecial: true, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_04_especial_2024.png'
        },
    
        {
            id : 7,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf', 
            fecha: "2024-01", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta boletin_05_edicion-especial_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: true, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_05_especial_2024.png?ver=2.1'
        },
    
        {
            id : 8,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_06_edicion-especial_2024.pdf', 
            fecha: "2024-01", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_06_edicion-especial_2024.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta boletin_06_edicion-especial_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_06_edicion-especial_2024.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: true, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_06_especial_2024.png'
        },
    
        {
            id : 9,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_09_edicion-especial_2024.pdf', 
            fecha: "2024-01", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_09_edicion-especial_2024.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletín_09_edicion-especial_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_09_edicion-especial_2024.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: true, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_09_especial_2024.png'
        },
    
        {
            id : 10,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_01_enero-2023.pdf', 
            fecha: "2023-01", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_01_enero-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletín_01_enero-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_01_enero-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_enero_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_01_enero_2023.png'
        },
    
        {
            id : 11,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_02_febrero-2023.pdf', 
            fecha: "2023-02", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_02_febrero-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletín_02_febrero-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_02_febrero-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_febrero_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_02_febrero-2023.png'
        },
    
        {
            id : 12,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_03_marzo-2023.pdf', 
            fecha: "2023-03", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_03_marzo-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletín_03_marzo-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_03_marzo-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_marzo_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_03_marzo-2023.png'
        },
    
        {
            id : 13,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_04_abril-2023.pdf', 
            fecha: "2023-04", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_04_abril-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletín_04_abril-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_04_abril-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_abril_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_04_abril-2023.png'
        },
    
        {
            id : 14,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_05_mayo-2023.pdf', 
            fecha: "2023-05", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_05_mayo-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_05_mayo-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_05_mayo-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_mayo_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_05_mayo-2023.png'
        },
    
        {
            id : 15,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_06_junio-2023.pdf', 
            fecha: "2023-06", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_03_marzo-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_06_junio-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_06_junio-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_junio_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_06_junio-2023.png'
        },
    
    
        {
            id : 16,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_07_julio-2023.pdf', 
            fecha: "2023-07", 
            facebook: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_07_julio-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_07_julio-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_07_julio-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_julio_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_07_julio-2023.png'
        },
    
    
        {
            id : 17,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_08_agosto-2023.pdf', 
            fecha: "2023-08", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_08_agosto-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_08_agosto-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_08_agosto-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_agosto_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_08_agosto-2023.png'
        },
    
        {
            id : 18,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_09_septiembre-2023.pdf', 
            fecha: "2023-09", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_09_septiembre-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_09_septiembre-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_09_septiembre-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_septiembre_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_09_septiembre-2023.png'
        },
    
        {
            id : 19,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_10_octubre-2023.pdf', 
            fecha: "2023-10", 
            facebook: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_10_octubre-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_10_octubre-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_10_octubre-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_octubre_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_10_octubre-2023.png'
        },
    
        {
            id : 20,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_11_noviembre-2023.pdf', 
            fecha: "2023-11", 
            facebook: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_11_noviembre-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_11_noviembre-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_11_noviembre-2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_noviembre_2023.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_11_noviembre-2023.png'
        },
    
        {
            id : 21,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_12_diciembre-2023.pdf', 
            fecha: "2023-12", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_12_diciembre-2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_12_diciembre-2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_12_diciembre-2023.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_12_diciembre-2023.png'
        },
    
        {
            id : 22,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_01_edicion-especial_2023.pdf', 
            fecha: "2023-1", 
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_01_edicion-especial_2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_01_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_01_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: true, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_01_especial_2023.png'
        },
    
        {
            id : 23,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_02_edicion-especial_2023.pdf', 
            fecha: "2023-12", 
            facebook: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_02_edicion-especial_2023.pdf', 
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_02_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_02_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_02_especial_2023.png'
        },
    
        {
            id : 24,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf', 
            fecha: "2023-12", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: '',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2023/boletin_03_especial_2023.png'
        },
    
        {
            id : 25,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_01_enero-2022.pdf', 
            fecha: "2022-01", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_01_enero-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_enero_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_01_enero_2022.png'
        },
    
        {
            id : 26,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_02_febrero-2022.pdf', 
            fecha: "2022-02", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_febrero_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_02_febrero_2022.png'
        },
    
        {
            id : 27,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_03_marzo-2022.pdf', 
            fecha: "2022-03", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_marzo_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_03_marzo_2022.png'
        },
    
        {
            id : 28,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_04_abril-2022.pdf', 
            fecha: "2022-04", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_04_abril-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_abril_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_04_abril_2022.png'
        },
    
        {
            id : 29,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_05_mayo-2022.pdf', 
            fecha: "2022-05", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_05_mayo-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_mayo_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_05_mayo_2022.png'
        },
    
        {
            id : 30,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_06_junio-2022.pdf', 
            fecha: "2022-06", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_06_junio-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_junio_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_06_junio_2022.png'
        },
    
        {
            id : 31,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_07_julio-2022.pdf', 
            fecha: "2022-07", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_julio_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_07_julio_2022.png'
        },
    
        {
            id : 32,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_08_agosto-2022.pdf', 
            fecha: "2022-08", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_08_agosto-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_agosto_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_08_agosto_2022.png'
        },
    
        {
            id : 33,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_09_septiembre-2022.pdf', 
            fecha: "2022-09", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_09_septiembre-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_septiembre_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/boletin_09_septiembre_2022.png'
        },
    
        {
            id : 34,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_10_octubre-2022.pdf', 
            fecha: "2022-10", 
            facebook: "https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_10_octubre-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_octubre_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/Bolet%C3%ADn_10_octubre-2022.jpeg'
        },
    
        {
            id : 35,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_11_noviembre-2022.pdf', 
            fecha: "2022-11", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_11_noviembre-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_noviembre_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/Bolet%C3%ADn_11_noviembre-2022.jpeg'
        },
    
        {
            id : 36,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_12_diciembre-2022.pdf', 
            fecha: "2022-12", 
            facebook: "https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletín_12_diciembre-2022.pdf",
            twitter: "https://twitter.com/intent/tweet?text=Me gusta Boletin_03_edicion-especial_2023 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/Boletin_03_edicion-especial_2023.pdf",
            mail: true,  
            versionIngles: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_diciembre_2022.pdf',
            esEspecial: false, 
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2022/Bolet%C3%ADn_12_diciembre-2022.png'
        },
    
    ]

    const documentosSentencias = [
        {
            id: 1,
            nombreDocumento: 'Sentencia Interpretativa 1',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },


        {
            id: 2,
            nombreDocumento: 'Sentencia Interpretativa 2',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-02_09-octubre-2019.docx"'
        },

        {
            id: 3,
            nombreDocumento: 'Sentencia Interpretativa 3',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-03_21-diciembre-2022.pdf'
        },

        {
            id: 4,
            nombreDocumento: 'Sentencia Interpretativa 3 (Reglas)',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/24/Reglas-Sentencia-Interpretativa_TP-SA-SENIT-03_21-diciembre-2022.pdf'
        },
        {
            id: 5,
            nombreDocumento: 'Sentencia Interpretativa 4',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-04_26-abril-2023.pdf'
        },
        {
            id: 6,
            nombreDocumento: 'Sentencia Interpretativa 5',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-05_17-mayo-2023.pdf'
        },
        {
            id: 7,
            nombreDocumento: 'Sentencia Interpretativa 6',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-06_06-septiembre-2023.pdf'
        },
        {
            id: 8,
            nombreDocumento: 'Sentencia Interpretativa 7',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-07_16-noviembre-2023.pdf'
        },



    ]

    const documentosAdicionales = [


        {
            id: 1,
            nombreDocumento: 'Comisión de Género',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },
        {
            id: 2,
            nombreDocumento: 'Comisión de Étnica y Racial',
            pdf: 'documentos/providencias/15/11/Protocolo-001_comision-etnico-racial_05-junio-2019.docx'
        },


    ]

    const options = [
        { title: 'Competencia de la JEP' },
        { title: 'Competencia y Jurisdicción' },
        { title: 'Competencia de la Jurisdicción Ordinaria' },
        { title: 'Competencia Temporal de la JEP' },
        { title: 'Requisitos de la competencia' },
        { title: 'Competencia de las Salas de Justicia' },

    ];

    const [valueBar, setValueBar] = useState('');
    const updateSelectedValue = (event, value) => {
        setValueBar(value);
    };


    const [showAll, setShowAll] = useState(false);

    // Estado Boton ver todos los casos

    const handleSeeAllCases = () => {
        setShowAll(true);
    };

    // Función para manejar el clic en el botón "Ver menos"
    const handleSeeLessCases = () => {
        setShowAll(false);  // Cambia el estado a `false` para mostrar solo los primeros 6 casos
    };


    // Mostrar solo los primeros 6 casos, si `showAll` es false
    const casesToDisplay = showAll ? macrocasos : macrocasos.slice(0, 6);







    useEffect(() => {
        if (masonryGridRef.current) {

            new Masonry(masonryGridRef.current, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-item',
                gutter: 20,
                fitWidth: true,
            });
        }
    }, [verMasDecisionesRecientes]);

    return (
        <div className="nowrap">
            <div className="header_container justify_center ">
                <Box className="header flex width_100">
                    <div className="margin_bottom_l width_100 justify_center align_center wrap margin_header">
                        <div className="width_100  justify_center align_center logo_container">
                            <img src={LogoRelati} className="logo_relati">
                            </img>
                        </div>

                        <h5 className="text_white width_100 text_center">Plataforma de búsqueda simple y especializada <br></br>
                            de las decisiones de la JEP </h5>

                    </div>
                </Box>


                <div className="search_home">

                    <div classname="search_size ">
                        <Container>
                            <div className="justify_center">
                                <div className="autocomplete_home_container ">
                                    <Autocomplete className="margin_top_s autocomplete_home"
                                        id="free-solo-demo"
                                        value={valueBar}
                                        freeSolo
                                        onChange={updateSelectedValue}
                                        options={options.map((option) => option.title)}
                                        renderInput={(params) => <TextField {...params} placeholder="Busque por palabra clave, número de decisión, radicado...  " inputProps={{
                                            ...params.inputProps,
                                            maxLength: 80
                                        }} />}

                                    />
                                    <Button className="light_white text_blue autocomplete_button_help button_terciary query_none">?</Button>
                                    <Link to="resultados-busqueda"> 
                                        <Button className="autocomplete_button_home button_primary z-index_front" startIcon={<SearchIcon />}>
                                            Buscar
                                        </Button>
                                    </Link> 


                                    <Link to="busqueda-avanzada"> 
                                    <Button className="autocomplete_button_advance primary_blue text_white button_secondary_border">Búsqueda Avanzada</Button>
                                    </Link> 
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>

            <Container item xs={12} sm={12} md={12} lg={12} xl={12} className="margin_top_xl " >
                <h2 className="text_bolder text_left padding_x">Decisiones recientes </h2>

                <Masonry ref={masonryGridRef} breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                >
                    {/* <div className='masonry-grid'> */}
                    {decisionesRecientes.map((decisiones, index) => (
                        // <Grid item key={index} xs={12} sm={6} md={6} lg={6} xl={6} className="masonry-item">
                        <CardDecision key={index} decisiones={decisiones}> </CardDecision>
                        // </Grid>
                    ))}
                    {/* </div> */}
                </Masonry>

                {/* <div className="wrap ">


                        {decisionesRecientes.map((decisiones) => (

                            <CardDecision decisiones={decisiones}> </CardDecision>
                        ))}






                </div> */}

            </Container>


            <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_xl">
                <div className="align_center carousel_main_container " >
                    <div className="wrap text_carousel_container" >
                        <h2 className="align_center text_bolder"> Boletines</h2>
                        <h5 className=" align_center margin_top_s margin_bottom_m">Acceda al análisis de las decisiones más importantes de la JEP</h5>
                        <Button onClick={goToBoletinesPage} className="button_primary "> Ver todos los boletines</Button>
                    </div>
                    <div className="carousel_container">

                        <Carousel boletines={boletines} />

                    </div>
                </div>



            </Container>

            <Container className="space_top ">
                <h2 className="justify_center text_bolder">Macrocasos</h2>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m">Conozca las últimas decisiones de cada macrocaso</h5>


                <div className="wrap transition_smooth">

                    {casesToDisplay.map((caso) => (

                        <div key={caso.id} className="card_small transition_smooth">
                            <p className="text_center">  Caso
                                <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">  {caso.numeroCaso} </span>
                                {caso.nombreCaso}
                            </p>
                        </div>


                    ))}
                </div>

                <div className="justify_center margin_top_m">
                    {!showAll ? (
                        <Button className="button_primary" onClick={handleSeeAllCases}>
                            Ver todos los casos
                        </Button>
                    ) : (
                        <Button className="button_primary" onClick={handleSeeLessCases}>
                            Ver menos casos
                        </Button>
                    )}
                </div>

            </Container>


            <Container className="margin_top_xl ">
                <h2 className="justify_center text_bolder text_center">Podcast
                    <br></br>Relatos de la JEP </h2>

                <h5 className="justify_center  align_center margin_top_s margin_bottom_m">Escuche la historia detrás de cada decisión de la JEP</h5>
                <div className="justify_center"> 
                <iframe className="podcast_container shadow_smooth "
                    src='https://widget.spreaker.com/player?show_id=5701029&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true' width='100%' height='400px' frameBorder='0'>

                </iframe>
                </div>

            </Container>
            <Box className="secondary_blue section_blue width_100 margin_top_xl">
                <div className="width_100 justify_center">
                    <h1 className=" text_center text_white ">Mapa Jurisprudencial</h1>
                </div>
                <h5 className="width_100 text_center margin_bottom_m text_white text_bold title_description">Encuentre las decisiones de cada departamento (y municipio) colombiano navegando nuestro mapa interactivo</h5>
                <div className="justify_center margin_top_m">

                    <Button onClick={goToMapaJurispudencialPage} className="button_primary">Ver mapa</Button>
                </div>


            </Box>

            <Container item xs={12} sm={12} md={8} lg={8} xl={8} className="margin_top_xl " >
                <div className="wrap margin_bottom_xl">
                    <div className="container_40 ">
                        <h2 className="text_bolder text_left">Documentos</h2>
                        <h5>Conozca los documentos de Sentencias Interpretativas y Comisiones de Género </h5>
                    </div>
                    <div className="wrap container_60">
                        <ul>
                            {documentosSentencias.map((adicional) => (
                                <li key={adicional.id}>
                                    <a target="_blank" className="link_secondary text_capitalize" href={adicional.pdf} >
                                        {adicional.nombreDocumento}
                                    </a>

                                </li>
                            )

                            )}

                            <div className="separator_blue"> </div>

                            {documentosAdicionales.map((adicional) => (
                                <li key={adicional.id}>
                                    <a target="_blank" className="link_secondary text_capitalize" href={adicional.pdf}>
                                        {adicional.nombreDocumento}
                                    </a>

                                </li>
                            )

                            )}

                        </ul>



                    </div>
                </div>
            </Container>









        </div>

    );
}