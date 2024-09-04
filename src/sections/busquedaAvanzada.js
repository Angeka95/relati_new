import SearchBarSmall from '../components/searchBarSmall.js';
import Filter from '../components/filter.js';
import FilterLarge from '../components/filterLarge.js';
import '../App.css';
import { Container, Grid, Button} from '@mui/material';
import React, { useState, useEffect,useRef } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchBar from '../components/searchBar.js';


export default function BusquedaAvanzada() {



        // Inputs con height automatico 
   
        const [value, setValue] = useState('');
        const [value2, setValue2] = useState('');
        const [value3, setValue3] = useState('');
        const [value4, setValue4] = useState('');
        const textAreaRef = useRef(null);
        const textAreaRef2 = useRef(null);
        const textAreaRef3 = useRef(null);
        const textAreaRef4 = useRef(null);

        useEffect(() => {
          if (textAreaRef.current) {
            
            textAreaRef.current.style.height = 'auto'; 
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
          }
        }, [value]); 

              
        useEffect(() => {
            if (textAreaRef2.current) {
              
              textAreaRef2.current.style.height = 'auto'; 
              textAreaRef2.current.style.height = `${textAreaRef2.current.scrollHeight}px`;
            }
          }, [value2]);

          useEffect(() => {
            if (textAreaRef3.current) {
                
              textAreaRef3.current.style.height = 'auto'; 
              textAreaRef3.current.style.height = `${textAreaRef3.current.scrollHeight}px`;
            }
          }, [value3]); 

    
          useEffect(() => {
            if (textAreaRef4.current) {
           
              textAreaRef4.current.style.height = 'auto'; 
              textAreaRef4.current.style.height = `${textAreaRef4.current.scrollHeight}px`;
            }
          }, [value4]); 

         // Boton help 

         const [infoHelp, setInfoHelp] = useState (false);
         const helpRef = useRef(null);

         const toggleButtonHelp = () => {
            setInfoHelp(!infoHelp);
         };

         
         const [infoFraseExacta, setinfoFraseExacta] = useState (false);
         const fraseExactaRef = useRef(null);

         const toggleButtonHelp1 = () => {
            setinfoFraseExacta(!infoFraseExacta);
         };


         const [infoTodasPalabras, setinfoTodasPalabras] = useState (false);
         const todasPalabrasRef = useRef(null);

         const toggleButtonHelp2 = () => {
            setinfoTodasPalabras(!infoTodasPalabras);
         };

         const [infoAlgunaPalabra, setinfoinfoAlgunaPalabra] = useState (false);
         const algunaPalabrasRef = useRef(null);

         const toggleButtonHelp3 = () => {
            setinfoinfoAlgunaPalabra(!infoAlgunaPalabra);
         };

         const [infoNingunaPalabra, setinfoNingunaPalabra] = useState (false);
         const ningunaPalabraRef = useRef(null);

         const toggleButtonHelp4 = () => {
            setinfoNingunaPalabra(!infoNingunaPalabra);
         };

          // Filtros

         const [selectedFilters, setSelectedFilters] = useState([]);
    
  return (
    <Container>
    <div className="">
        <Grid item xs={8} sm={8} md={12} lg={12} xl={12}>

            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
            <h1 className="text_center">Búsqueda avanzada</h1> 
           
                <h4 className="text_center">Delimite su búsqueda usando uno o más parámetros.
                    <br></br>
                    Si va a  incluir más de un criterio por campo, sepárelo con una coma.</h4> 
            </Grid>
            
            
            <div className="margin_s vertical_align"> 
                <TextField className="textarea_size "   
                        label="Frase exacta"
                        multiline 
                        rows={1}  
                        variant="outlined" 
                        placeholder='ej: fuerza pública nacional' 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        inputRef={textAreaRef}
                        ref={fraseExactaRef}
                />
                <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s"
                        onClick= {toggleButtonHelp1}
                >?</Button>

                {infoFraseExacta && (<div className="position_float container_help_advance text_center info_help_position"> 
                    <p><span className="text_bolder display_block">Frase exacta:</span>Use este campo para buscar dos o más términos consecutivos
                    <span className="display_block"> ej:  fuerza pública, falsos positivos, ejercito nacional</span> </p>
                    </div> )} 




            </div>
            <div className="margin_s vertical_align"> 
                <TextField className="textarea_size "   
                        label="Todas las palabras"
                        multiline 
                        rows={1} 
                        variant="outlined"  
                        placeholder='ej: sometimiento, reclutamiento' 
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        inputRef={textAreaRef2}
                        ref={todasPalabrasRef}
                />
                <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s"
                        onClick= {toggleButtonHelp2}
                >? {infoTodasPalabras ? '' : ''}

                </Button>
                
                {infoTodasPalabras && (<div className="position_float container_help_advance text_center info_help_position"> 
                    <p><span className="text_bolder display_block">Todas las palabras:</span>Use este campo para buscar por todos los términos aquí incluidos
                    <span className="display_block"> ej:  FARC, diputados, sometimiento</span> </p>
                    </div> )} 



            </div>

            <div className=" margin_s vertical_align"> 
                <TextField className="textarea_size "   
                        label="Alguna de las palabras"
                        multiline 
                        rows={1} 
                        variant="outlined"  
                        placeholder='ej: ley, norma' 
                        value={value3}
                        onChange={(e) => setValue3(e.target.value)}
                        inputRef={textAreaRef3}
                        ref={algunaPalabrasRef}
                />
                <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s position_relative"
                            onClick= {toggleButtonHelp3}
                >?  {infoAlgunaPalabra ? '' : ''}

                </Button>

                    {infoAlgunaPalabra && (<div className="position_float container_help_advance text_center info_help_position"> 
                    <p><span className="text_bolder display_block">Alguna de las palabras:</span> Use este campo para buscar por alguno de los términos aquí incluidos
                    <span className="display_block"> ej: ley, norma</span> </p>
                    </div> )} 

            </div>




            <div className="margin_s vertical_align"> 
                <TextField className="textarea_size"   
                        label="Ninguna de  las palabras"
                        multiline 
                        rows={1} 
                        variant="outlined"  
                        placeholder='ej: demanda, reclamación' 
                        value={value4}
                        onChange={(e) => setValue4(e.target.value)}
                        inputRef={textAreaRef4}
                        ref={ningunaPalabraRef}
                />
                <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s"
                         onClick= {toggleButtonHelp4}
                
                >
                    
                    ? {infoNingunaPalabra ? '' : ''}
                    </Button>
           
                {infoNingunaPalabra&& (<div className="position_float container_help_advance text_center info_help_position"> 
                    <p><span className="text_bolder display_block">Ninguna de las palabras:</span> Use este campo para excluir un término de su búsqueda.
                    <span className="display_block"> ej:  demanda, reclamación</span> </p>
                    </div> )} 
           
           




            </div>

        </Grid>  

        <p className="text_diabled text_center margin_top_m">(Aún no ha agregado ningún parámetro a su búsqueda)</p>
        
        <Grid item xs={8} sm={8} md={12} lg={12} xl={12} className="wrap"> 
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <SearchBar isSearchAdvance={true}> 
                </SearchBar>
            </Grid>
            <Grid item xs={8} sm={8} md={4} lg={4} xl={4}>
                <Filter setSelectedFilters={setSelectedFilters} ></Filter>  
            </Grid>
        </Grid>
        
    </div> 
    </Container>
 
  );
}
