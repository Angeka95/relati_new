import '../App.css';
import { Container, Grid, Button, Tooltip, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchBarSmall from '../components/searchBarSmall.js';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import ListCardSearch from '../components/listCardSearchResults.js';
import tesauroService from '../services/tesauro';

export default function Tesauro() {

    console.log("IMPRIMIENDO VAR", tesauroService.tesauroVar);
    
    const data = {
        a: [
            'Abandono De Hijo Fruto De Acceso Carnal Violento, Abusivo, O De Inseminación Artificial O Transferencia De Óvulo Fecundado No Consentidas',
            'Abigeato',
            'Aborto',
            'Aborto Forzado En Persona Protegida',
            'Aborto Sin Consentimiento',
            {nombreReal: 'Certificación que Acredita la condición de miembro de las FARC-EP por la oficina de alto comisionado para la paz',
                alias: 'Acreditación como integrante de las FARC-EP por la oficina del alto comisionado para la paz'
            },
            'Abuso De Autoridad Por Acto Arbitrario E Injusto',
            'Abuso De Autoridad Por Omisión De Denuncia',
            'Abuso De Condiciones De Inferioridad',
            'Abuso De Confianza',
            'Abuso De Confianza Calificado',
            'Abuso De Función Pública',
            'Acaparamiento',
            'Acceso A La Administración De Justicia',
            'Acceso Abusivo A Un Sistema Informático',
            'Acceso Al Expediente Electrónico',
            'Acceso Carnal Abusivo Con Menor De Catorce Años',
            'Acceso Carnal O Acto Sexual Abusivos Con Incapaz De Resistir',
            'Acceso Carnal O Acto Sexual En Persona Puesta En Incapacidad De Resistir',
            'Acceso Carnal Violento',
            'Acceso Carnal Violento En Persona Protegida',
            'Acción De Tutela',
            'Acción De Tutela Contra Providencia Judicial',
            {nombreReal: 'Temeridad En La Acción De Tutela',
                alias: 'Actuación Temeraria'
            },
            'Acciones Afirmativas',
            'Aceptación Indebida De Honores',
            'Aclaración De Providencia',
            'Acoso Sexual',
            'Acreditación Como Integrante De Las Farc-Ep Por La Oficina Del Alto Comisionado Para La Paz Use_termino Certificación Que Acredita La Condición De Miembro De Las Farc-Ep Por La Oficina Del Alto Comisionado Para La Paz',
            'Ámbito De Competencia Material En La Amnistía Use_termino Ámbito De Aplicación Material Para La Amnistía',
            'Ámbito De Competencia Material En La Libertad Condicionada Use_termino Ámbito De Aplicación Material Para La Libertad Condicionada',
            'Ámbito De Competencia Personal En La Amnistía Use_termino Ámbito De Aplicación Personal Para La Amnistía',
            'Ámbito De Competencia Personal En La Libertad Condicionada Use_termino Ámbito De Aplicación Personal Para La Libertad Condicionada',
            {nombreReal: 'Ámbito De Aplicación Personal Para La Renuncia A La Persecución Penal',
                alias: 'Ámbito De Competencia Personal En La Renuncia A La Persecución Penal'
            },
         
            'Ámbito De Competencia Temporal En La Amnistía Use_termino Ámbito De Aplicación Temporal Para La Amnistía',
            'Ámbito De Competencia Temporal En La Libertad Condicionada Use_termino Ámbito De Aplicación Temporal Para La Libertad Condicionada',
            'Acreditación De Condición De Víctima Use_termino Acreditación De Calidad De Víctima',
            'Acta De Sometimiento',
            'Acto Sexual Violento',
            'Actos Contrarios A La Defensa De La Nación',
            'Actos De Barbarie',
            'Actos De Discriminación',
            'Actos De Promoción Y Auspicio De Grupos Armados Al Margen De La Ley',
            'Actos De Terrorismo',
            'Actos Sexuales Con Menor De Catorce Años',
            'Actos Sexuales Con Persona Protegida Menor De Catorce Años',
            'Actos Sexuales Violentos En Persona Protegida',
            'Actus Reus',
            'Acuerdo Final Para La Terminación Del Conflicto Y La Construcción De Una Paz Estable Y Duradera',
            'Acumulación De Procesos Use_termino Acumulación De Casos',
            'Acumulación De Los Trámites',
            'Administración De Justicia Transicional',
            'Administración De Recursos Relacionados Con Actividades Terroristas',
            'Administración Del Expediente Electrónico',
            'Administración Desleal',
            'Adolescentes Use_termino Niños Y Niñas Víctimas Del Conflicto Armado',
            'Adopción Irregular',
            'Aenifpu',
            'Afectaciones Al Medio Ambiente Y El Territorio',
            'Agente Estatal No Integrante De La Fuerza Pública',
            'Agentes Del Estado No Integrantes De La Fuerza Pública',
            'Agiotaje',
            'Alas Equipo Colombia',
            'Alteración Y Modificación De Calidad, Cantidad, Peso O Medida',
            'Alto Comisionado De La Naciones Unidas Para Los Derechos Humanos',
            'Alto Comisionado De Las Naciones Unidas Para Los Refugiados Acnur',
            'Alzamiento De Bienes',
            'Ambiental',
            'Ámbito De Aplicación Material',
            'Ámbito De Aplicación Material Para La Libertad Transitoria, Condicionada Y Anticipada',
            'Ámbito De Aplicación Material Para La Privación De La Libertad En Unidad Militar O Policial',
            'Ámbito De Aplicación Material Para La Renuncia A La Persecución Penal',
            'Ámbito De Aplicación Material Para La Suspensión Condicional De La Ejecución De La Pena',
            'Ámbito De Aplicación Material Para La Suspensión De La Ejecución De La Orden De Captura',
            'Ámbito De Aplicación Material Para La Suspensión Temporal De Inhabilidades',
            'Ámbito De Aplicación Personal Para La Libertad Transitoria, Condicionada Y Anticipada',
            'Ámbito De Aplicación Personal Para La Privación De La Libertad En Unidad Militar O Policial',
            'Ámbito De Aplicación Personal Para La Suspensión Condicional De La Ejecución De La Pena',
            'Ámbito De Aplicación Personal Para La Suspensión De La Ejecución De La Orden De Captura',
            'Ámbito De Aplicación Personal Para La Suspensión Temporal De Inhabilidades',
            'Ámbito De Aplicación Temporal Para La Libertad Transitoria, Condicionada Y Anticipada',
            'Ámbito De Aplicación Temporal Para La Privación De La Libertad En Unidad Militar O Policial',
            'Ámbito De Aplicación Temporal Para La Renuncia A La Persecución Penal',
            'Ámbito De Aplicación Temporal Para La Suspensión Condicional De La Ejecución De La Pena',
            'Ámbito De Aplicación Temporal Para La Suspensión De La Ejecución De La Orden De Captura',
            'Ámbito De Aplicación Temporal Para La Suspensión Temporal De Inhabilidades',
            'Amenazas',
            'Amenazas Contra Defensores De Derechos Humanos Y Servidores Públicos',
            'Amnistía Administrativa',
            'Amnistía De Iure',
            'Amnistía De Sala',
            'Amnistía Impropia Use_termino Extinción De La Sanción Penal',
            'Amnistía O Indulto',
            'Amnistía Propia Use_termino Extinción De La Acción Penal',
            'Análisis De Nivel De Intensidad',
            'Análisis Y Valoración Del Reconocimiento Individual',
            'Anonimización De La Providencia',
            'Aplicación Fraudulenta De Crédito Oficialmente Regulado',
            'Apoderamiento De Aeronaves, Naves, O Medios De Transporte Colectivo',
            'Apoderamiento De Hidrocarburos, Sus Derivados, Biocombustibles O Mezclas Que Los Contengan',
            'Apoderamiento O Alteración De Sistemas De Identificación',
            'Apología Al Genocidio',
            'Aporte A La Verdad Plena',
            'Aporte Esencial Use_termino Contribución Esencial',
            'Aporte Temprano A La Verdad',
            'Aportes Concretos Y Reales',
            'Apreciación De Bases Suficientes Para Entender',
            'Aprovechamiento De Error Ajeno O Caso Fortuito',
            'Aprovechamiento De Los Recursos Públicos',
            'Aprovechamiento Ilícito De Los Recursos Naturales Renovables',
            'Archivo General De La Nación (Agn)',
            'Arma De Efecto Indiscriminado',
            'Arma Trampa',
            'Armada Nacional',
            'Artefactos Explosivos Improvisados',
            'Articulación Y Coordinación Interjurisdiccional Use_termino Mecanismos De Articulación Y Coordinación Con La Jurisdicción Especial Indígena',
            'Asamblea Departamental De Córdoba',
            'Asesinato (L.H)',
            'Asesinato De Personas De La Población Civil Señaladas De Ser Informantes, Colaboradoras O Enemigas',
            'Asesoramiento A Grupos Delictivos Organizados Y Grupos Armados Organizados',
            'Asesoramiento Y Otras Actuaciones Ilegales',
            'Asociación Caucana De Desplazados Del Naya –Asocadeina–',
            'Asociación De Cabildos Indígenas Del Norte Del Cauca',
            'Asociación De Cabildos Indígenas Del Pueblo Awá De Putumayo',
            'Asociación De Cabildos Indígenas Eperara Siapidaara De Nariño',
            'Asociación De Cabildos Nasa Uss',
            'Asociación De Cabildos Ukawe’S’ Nasa C’Hab',
            'Asociación De Cabildos “El Gran Territorio Del Águila” Uh Wala Vxic',
            'Asociación De Carboneros Y Leñateros De Tumaco',
            'Asociación De Consejos Comunitarios Del Norte Del Cauca (Aconc)',
            'Asociación De Consejos Comunitarios Y Organizaciones Étnico -Territoriales De Nariño',
            'Asociación De Desarrollo Integral Para Las Víctimas',
            'Asociación De Hermandades Agroecológicas Y Mineras De Guamocó – Aheramigua',
            'Asociación De Juntas De Acción Comunal',
            'Asociación De Juntas De Acción Comunal De Los Ríos Mira, Nulpe Y Mataje',
            'Asociación De Lideresas Del Pacífico Nariñense',
            'Asociación De Mujeres Afrodescendientes Del Norte Del Cauca',
            'Asociación De Mujeres Unidas Defendemos Nuestros Derechos',
            'Asociación De Municipios Del Caribe - Asomcaribe',
            'Asociación De Pensionados Y Jubilados',
            'Asociación De Trabajadores Campesinos De Nariño',
            'Asociación De Trabajadores Campesinos Del Valle Del Cauca (Astracava)',
            'Asociación De Víctimas La Voz De Dios',
            'Asociación Municipal De Usuarios Campesinos De Pradera',
            'Asociación Municipal De Usuarios Campesinos De Pradera, Valle Del Cauca, (Amuc)',
            'Asociación Para La Comisión De Un Delito Contra La Administración Pública',
            'Asociación Para La Promoción Social Alternativa (Minga)',
            'Asonada',
            'Asuntos Constitucionales',
            'Ataque Contra Obras E Instalaciones Que Contienen Fuerzas Peligrosas',
            'Ataque Generalizado O Sistemático Contra Una Población Civil',
            'Ataques A Misiones Médicas O Ataques Que Afectaron Miembros Del Personal Sanitario O Humanitario',
            'Ataques Contra Miembros De La Policía Nacional Sin Distinguir Cuándo Estaban Participando En Hostilidades Y Cuándo No.',
            'Ataques Contra Vehículos E Infraestructura De Hidrocarburos Sin Perjuicio De Las Consecuencias Contra El Medio Ambiente',
            'Ataques Dirigidos Contra Civiles Por El No Pago De Extorsiones',
            'Atentados A La Subsistencia Y Devastación',
            'Atentados Contra Hitos Fronterizos',
            'Atentados Contra La Dignidad Personal',
            'Atentados Contra La Dignidad Personal (C.G)',
            'Atentados Contra La Población Civil Con Miras A Ejercer Control Territorial Y Social',
            'Atribución De Responsabilidad',
            'Audiencia De Recaudo De Información',
            'Audiencia De Seguimiento A Órdenes',
            'Audiencia De Verdad Ordenada',
            'Audiencia De Verdad Plena',
            'Audiencia Preliminar De Legalización De Captura',
            'Audiencia Pública De Reconocimiento De Responsabilidad',
            'Audiencias De Supervisión',
            'Audiencias Públicas',
            'Audiencias Públicas De Presentación De Observaciones A La Decisión De Concentración',
            'Auto De Determinación De Hechos Y Conductas',
            'Auto De Evaluación De La Correspondencia',
            'Auto De Impulso',
            'Autodefensas Campesinas De Córdoba Y Urabá',
            'Autodefensas Gaitanistas De Colombia',
            'Autodefensas Unidasdecolombia-Auc',
            'Autonomía Y Gobierno Propio',
            'Autor Directo',
            'Autor Mediato',
            'Autoría Mediata Por Aparato Organizado De Poder',
            'Autoridad Étnica',
            'Autorizar La Salida Del País De Las Personas Que Se Acojan A La Jurisdicción Especial Para La Paz Use_termino Autorización De Salida Del País',
            'Avocamiento De La Supervisión Y Revisión De Beneficios',
            'Ayuda E Inducción Al Empleo, Producción Y Transferencia De Minas Antipersonal'

        ],
        b: ['Batallon',
            'Bacrim',
            'Beneficios definitivos'
        ],
        c: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        d: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        e: ['Batallon',
            'Bacrim',
            'Beneficios definitivos'
        ],
        f: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        g: ['Batallon',
            'Bacrim',
            'Beneficios definitivos'
        ],
        h: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        i: ['Batallon',
            'Bacrim',
            'Beneficios definitivos'
        ],
        j: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        k: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        l: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        m: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        n: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        o: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        p: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        q: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        r: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        s: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        t: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        u: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        v: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        w: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        x: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        y: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ],
        z: ['Cargas Procesales',
            'Caribe Afirmativo',
            'Causales de'
        ]



    }

    const [activeLetter, setActiveLetter] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);

    // Valor de los terminos al seleccionar letra
    const selectLetter = (letter) => {
        setActiveLetter(letter);
        setSelectedTerm ('');
    } ;

    // Boton de letra activa

    const getButtonActiveClass = (letter) => {
        return letter === activeLetter ? 'button_alphabet_active' : 'button_terciary';
    };

    // Actualiza el término seleccionado


    const handleTermClick = (term) => {
        setSelectedTerm(term);
    };


    return (
        <Container>
            <Grid container spacing={2} className="justify_center">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >

                    <div className="margin_bottom_m wrap justify_center  button_alphabet_container">


                        <h1 className="width_100 text_center margin_top_l">Tesauro</h1>
                        <h5 className="width_100 text_center margin_bottom_m">Encuentre las decisiones a través de conceptos clave </h5>
                        {Object.keys(data).map((letter) => 
                            (

                            <Button className={`shadow  button_alphabet ${getButtonActiveClass(letter)}  `} key={letter} onClick={() => selectLetter(letter)}>
                                {letter.toUpperCase()}
                            </Button>
                        ))}
                    </div>

                    <div className="container_list_tesauro ">
                        {!activeLetter && (
                            <p className="text_diabled text_center padding_x">(Seleccione una letra para mostrarle términos del Tesauro)</p> 
                        )}

                        {!selectedTerm && activeLetter && (
                            <div className="list_container_tesauro scroll-container text_center padding_x">
                                <div className="wrap justify_between margin_bottom_m margin_top_s list_container_header">
                                    <h3> Términos encontrados por {activeLetter ? activeLetter.toUpperCase() : ''}</h3>

                                    <div>
                                        <Stack className='autocomplete_bar_search_terms'>
                                            <Autocomplete

                                                id="free-solo-demo"
                                                freeSolo
                                                options={searchOptions.map((option) => option.title)}
                                                renderInput={(params) => <TextField {...params} label="Buscar término" inputProps={{
                                                    ...params.inputProps,
                                                    maxLength: 80
                                                }} />}

                                            />


                                            <Button className="autocomplete_button_terms button_primary"><SearchIcon /></Button>

                                        </Stack>
                                    </div>
                                </div>
                                


                                {!selectedTerm && activeLetter &&  (
                                    <div className="list_tesauro">
                                        {/* {data[activeLetter].map((term, index) => (
                                            <div className="list_item_tesauro text_blue link_simple " key={index} title={term}>
                                                {term}
                                                
                                            </div>
                                        ))} */}
                                        {data[activeLetter].map((term, index) => 
                                        typeof term === 'string' ? (
                                            <div
                                                className="list_item_tesauro text_blue link_simple"
                                                key={index}
                                                title={term}
                                            >
                                                <a className="link_nounderline text_blue"
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Previene la navegación
                                                        handleTermClick(term); // Actualiza el término seleccionado
                                                    }}
                                                >   <div className="text_ellipsis">
                                                    {term} 
                                                    </div> 
  
                                                    
                                                </a>
                                            </div>
                                        ) : (
                                            <div
                                                className="list_item_tesauro text_blue link_simple"
                                                key={index}
                                                
                                            >
                                                <a  className="link_inline link_nounderline text_blue "
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Previene la navegación
                                                        handleTermClick(term.nombreReal); // Actualiza el término seleccionado
                                                    }}
                                                >   
                                                    <div title={term.alias} className="text_green margin_right_s text_ellipsis" >
                                                    {term.alias} 
                                                    </div> 
                                                    <div className="text_black text_italic text_bolder">Use término</div>
                                                    <div title={term.nombreReal} className="margin_left_s text_ellipsis"> 
                                                        {term.nombreReal} 
                                                    </div> 

                                                </a>
                                            </div>
                                        )
                                    )}

                                    </div>
                                )}


                            </div>



                        )}
                    </div>
                    
                             {selectedTerm && (
                                <div className="">
                                    <ListCardSearch selectedTerm={selectedTerm} isLargeResult={true}/>
                                </div>
                            )}




                </Grid>
            </Grid>
        </Container>
    );
}

const searchOptions = [
    { title: 'Abandono' },
    { title: 'Abigeato' },
    { title: 'Aborto' },
    { title: 'Aborto Sin Consentimiento' },
    { title: 'Acaparamiento' },
    { title: 'Actos De Barbarie' },
];
