import React, { useState, useEffect, act } from 'react';
import { Container, Grid, Button, Autocomplete, TextField, Stack, Alert, Box } from '@mui/material';
import tesauroService from '../services/tesauro.js';
import SearchIcon from '@mui/icons-material/Search';
import ListCardSearch from '../components/listCardSearchResults.js';
import LinearWithValueLabel from '../components/linearProgress.js';  
import '../App.css';
import { Link } from 'react-router-dom';

export default function Tesauro() {
   
    const [data, setData] = useState({ a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [], j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r: [], s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: [] });
    const [activeLetter, setActiveLetter] = useState("");
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [searchOptions, setSearchOptions] = useState([]);
    const [message, setMessage] = useState({ message: "", classname: "" });

    useEffect(() => {  
       if(activeLetter.length === 0){
            setActiveLetter("a");    
            getTerms("a");
       } else {
            getTerms(activeLetter);
       }
    },[activeLetter]);

    const getTerms = (activeLetter) => {
        let newMessage = {}; 
        tesauroService
            .getTermsByLetter(activeLetter)
            .then(response => { 
                if((response.status_info.status !== undefined) && (response.status_info.status === 401)) {
                    newMessage["message"] = `Lo sentimos, ha ocurrido un error en nuestro servidor. Por favor, intenta nuevamente más tarde.`;
                    newMessage["classname"] = 'error';
                } else if((response.status_info.status === 200 ) && (response.data.length === 0)){
                    newMessage["message"] = `No se encontraron resultados por la letra "${activeLetter}".`;
                    newMessage["classname"] = 'warning';
                } else {
                    const terminosArr = response.data; 
                    setData(objTerms => ({...objTerms, [activeLetter] : terminosArr }));
                    setSearchOptions(autoCompleteList(terminosArr));
                    newMessage["message"] = `La consulta se ha realizado satisfactoriamente.`;
                    newMessage["classname"] = 'success';
                }
                handleMessage(newMessage);      
            }
            )
            .catch(error => { 
                newMessage["message"] = `Lo sentimos, ha ocurrido un error en nuestro servidor. Por favor, intenta nuevamente más tarde.`;
                newMessage["classname"] = 'error';
                handleMessage(newMessage);
            });
    };
    
    const handleMessage = (newMessage) => {
        setTimeout(function(){ 
            setMessage(newMessage);
        }, 0);
    }
    
    // Autocompletar la lista
    const autoCompleteList = (lista) => {
        return lista.map(item => {
            if(typeof item !== 'string'){
              return { "title": `${item.alias} - ${item.nombreReal}` };
            } else {
              return { "title": item };
            }
          });    
    }
    
    // Valor de los terminos al seleccionar letra
    const selectLetter = (letter) => {
        setActiveLetter(letter);
        setMessage({ message: "", classname: "" });
        setSelectedTerm('');
        setSearchOptions([]);
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
        <>
        {( activeLetter === "") ? 
             <Container className="margin_bottom_m">
             <h1 className="width_100 text_center margin_top_l">Tesauro</h1>
             <h5 className="width_100 text_center margin_bottom_m">Encuentre las decisiones a través de conceptos clave </h5>
             <Grid container spacing={2}>
               <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                 <>
                   <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuesta..."]}></LinearWithValueLabel> 
                 </>
               </Grid>
             </Grid>
           </Container>   
            :
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
                        <div className="container_list_tesauro " style={{ marginBottom: "2rem" }} >
                            {!activeLetter && (
                                <p className="text_diabled text_center padding_x">(Seleccione una letra para mostrarle términos del Tesauro)</p> 
                            )}
                            {!selectedTerm && activeLetter && (
                                <>
                                    {((data[activeLetter].length === 0) && (message.message === ""))?
                                        <>
                                        <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuesta..."]}></LinearWithValueLabel> 
                                        </>
                                    :
                                        <>
                                        {((message.classname === "error") || (message.classname === "warning")) ?
                                           <Alert variant="outlined" severity={message.classname}>
                                             {message.message}
                                           </Alert>
                                           :
                                            <div className="list_container_tesauro scroll-container text_center padding_x">
                                            <div className="wrap justify_between margin_bottom_m margin_top_s list_container_header fixed_header">
                                                <h3> Términos encontrados por {activeLetter ? activeLetter.toUpperCase() : ''}</h3>
                                                <div>
                                                    <Stack className='autocomplete_bar_search_terms '>
                                                        <Autocomplete
                                                            id="free-solo-demo"
                                                            freeSolo
                                                            options={searchOptions.map((option) => option.title)}
                                                            renderInput={(params) => <TextField {...params} label="Buscar término" inputProps={{
                                                                ...params.inputProps,
                                                                maxLength: 80
                                                            }} />}
                                                            onChange = {
                                                                (event, newTerm) => {
                                                                  setSelectedTerm(newTerm);
                                                                }
                                                            }
                                                        />
                                                        <Button className="autocomplete_button_terms button_primary"><SearchIcon /></Button>
                                                    </Stack>
                                                </div>
                                            </div>
                                            {!selectedTerm && activeLetter &&  (
                                                <div className="list_tesauro">
                                                    {data[activeLetter].map((term, index) => 
                                                    typeof term === 'string' ? (
                                                        <div
                                                            className="list_item_tesauro text_blue link_simple"
                                                            key={index}
                                                            title={term}
                                                        >
                                                            <a className="link_nounderline text_blue"
                                                                href=":javascript"
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Previene la navegación
                                                                    handleTermClick(term); // Actualiza el término seleccionado
                                                                }}
                                                            >   <div className="text_ellipsis text_capitalize">
                                                                {term.toLowerCase()} 
                                                                </div>               
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="list_item_tesauro text_blue link_simple"
                                                            key={index}
                                                        >
                                                            <a className="link_inline link_nounderline text_blue"
                                                                href=":javascript"
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Previene la navegación
                                                                    handleTermClick(term.nombreReal); // Actualiza el término seleccionado
                                                                }}
                                                            >   
                                                                <div title={term.alias.toUpperCase()} className="text_green margin_right_s text_ellipsis text_capitalize">
                                                                {term.alias.toLowerCase()} 
                                                                </div> 
                                                                <div className="text_black text_italic text_bolder">Use término</div>
                                                                <div title={term.nombreReal} className="margin_left_s text_ellipsis text_capitalize"> 
                                                                    {term.nombreReal.toLowerCase()} 
                                                                </div> 
                                                            </a>
                                                        </div>
                                                    )
                                                )}
                                                </div>
                                            )}
                                            </div>
                                        } 
                                        </>
                                    }
                                </> 
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
            
            }

            <Box className= " margin_bottom_xl margin_top_m"> 
                <div className="cta">
                    <Container > 
                        <div className="cta_container"> 
                            <h6 className="text_bolder cta_text">Interactúe con las palabras clave del Tesauro a través de sus redes y relaciones temáticas</h6> 
                            <Link to="/red-terminos">
                            <Button className="button_primary ">Ver Red de Términos</Button>
                            </Link>
                        </div>
                    </Container>
                </div>
                </Box>
        </>
    );
}


