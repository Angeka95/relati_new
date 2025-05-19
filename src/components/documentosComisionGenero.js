import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Tooltip, Alert } from '@mui/material';
import './../App.css';

const DocumentosComisionGenero = () => {
  
      const documentos = [
      {
        "nombre": "Concepto Comisión Género (25 De Junio De 2018)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-genero_25-junio-2018.pdf",
        "fecha": "25/06/2018"
      },
      {
        "nombre": "Concepto Comisión Género (06 De Marzo De 2019)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_06-marzo-2019.pdf",
        "fecha": "06/03/2019"
      },
      {
        "nombre": "Concepto Comisión género (29 De Noviembre De 2022)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_29-noviembre-2022.pdf",
        "fecha": "29/11/2022"
      },
      {
        "nombre": "Concepto Comisión Género (26 De Abril De 2023)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_26-abril-2023.pdf",
        "fecha": "26/04/2023"
      },
      {
        "nombre": "Concepto Comisión Género (20 De Noviembre De 2024)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_20-noviembre-2024.pdf",
        "fecha": "20/11/2024"
      },
      {
        "nombre": "Concepto Comisión Género (28 De Febrero De 2025)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_28-febrero-2025.pdf",
        "fecha": "28/02/2025"
      }
    ];

    function sortDocumentosByFechaDesc(arr) {
      return arr.slice().sort((a, b) => {
        // Convert "DD/MM/YYYY" to "YYYY-MM-DD" for comparison
        const parseFecha = (fecha) => {
          const [day, month, year] = fecha.split('/');
          return new Date(`${year}-${month}-${day}`);
        };
        return parseFecha(b.fecha) - parseFecha(a.fecha);
      });
    }

  const documentosOrdenados = sortDocumentosByFechaDesc(documentos);

  return (
        <div className="margin_top_s"> 
            {/*<p>• <a target="_blank" rel="noreferrer" className="link_secondary text_capitalize " href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_04-mayo-2022.pdf`}>  Concepto comisión de género (04 de Mayo de 2022) </a></p>*/}
            {/* Documentos mapeados */}
            {documentosOrdenados.map((doc, idx) => (
              <p key={doc.href}>
                • <a
                  target="_blank"
                  rel="noreferrer"
                  className="link_secondary text_capitalize"
                  href={doc.href}
                >
                  {doc.nombre}
                </a>
              </p>
            ))}
        </div>
  );
};

export default DocumentosComisionGenero;