import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';
import { Link } from 'react-router-dom';


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





export default function SearchResults() {
  const [selectedFilters, setSelectedFilters] = useState([]);
//   const [dataBoletines, setDataBoletines] = useState([]);

//     const handleClickBoletines = () => {
//         setDataBoletines(boletines);
//         }
  

  return (
    <div>
    <Container maxWidth="lg" disableGutters>
          <h1 className="width_100 text_center margin_top_m">Boletines Jurisprudenciales</h1>
          <p className="text_center title_description margin_bottom_l">Destacamos aquí las decisiones judiciales más importantes de las Salas y Secciones de la JEP. Este producto editorial plasma la síntesis de los casos, las reglas y argumentos de derecho, así como el sentido de la decisión</p>
          <div className="align_center carousel_main_container"> 
            <p className=" align_center text_carousel_container">Consulte las decisiones más relevantes de la JEP, analizadas mes a mes</p>
            <div className="carousel_container ">

                <Carousel boletines={boletines}/>
                </div> 
          </div> 

          

    </Container>
    <Box className= "cta_boletines_container "> 
        <div className="cta">
            <Container > 
                <div className="cta_container"> 
                    <h6 className="text_bolder cta_text">Suscríbase y reciba mes a mes un boletín con el análisis de las decisiones más relevantes</h6> 
                    <Link to="/suscripcion">
                    <Button className="button_primary">Suscribirse</Button>
                    </Link>
                </div>
            </Container>
        </div>
    </Box>
    <Box> 
        <div className="margin_bottom_xl"> </div> 
        
        <ul>

      </ul>
        {/* {dataBoletines.length > 0 && (
        <ul>
          {dataBoletines.map(dataBoletin => (
            <li key={dataBoletin.id}>
              {dataBoletin.url} 
          ))}
        </ul>
      )} */}
        <div> 
        {/* {boletines.map(datoBoletin => (
          <TabCustom key={datoBoletin.id} pdf={datoBoletin.pdf} fecha={datoBoletin.fecha} imagenPortada={datoBoletin.imagenPortada} />
        ))} */}

        <TabCustom boletines={boletines}/> 
        </div>


            
    </Box>
    </div>
  );
}
