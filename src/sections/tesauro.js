import '../App.css';
import { Container, Grid, Button, Tooltip, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchBarSmall from '../components/searchBarSmall.js';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import ListCardSearch from '../components/listCardSearchResults.js';
import ABCTermList from '../components/tesauro/ABCTermList.js';
import AutoCompleteList from '../components/tesauro/AutoCompleteList.js';
import useGetTermsByLetter from '../hooks/tesauro/useGetTermsByLetter';

export default function Tesauro() {

    const data = ABCTermList();

    const [activeLetter, setActiveLetter] = useState("a");
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [searchOptions, setSearchOptions] = useState([]);

    useEffect(() => {
        console.log("Data esta cargada");
    },[]);

    // Valor de los terminos al seleccionar letra
    const selectLetter = (letter) => {
        setActiveLetter(letter);
        setSelectedTerm('');
        setSearchOptions(AutoCompleteList(data[letter]));
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


