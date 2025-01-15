import SearchBarSmall from '../components/searchBarSmall.js';
import Filter from '../components/filter.js';
import FilterShort from '../components/filterShort.js';
import '../App.css';
import { Container, Grid, Button, Box, Chip } from '@mui/material';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchBar from '../components/searchBar.js';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import Context from '../context/context';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function BusquedaAvanzada() {

  const navigate = useNavigate();

  const [busquedaAvanzada, setBusquedaAvanzada] = useState('');

  // Inputs con height automatico 

  //         const [value, setValue] = useState('');
  //         const [value2, setValue2] = useState('');
  //         const [value3, setValue3] = useState('');
  //         const [value4, setValue4] = useState('');
  //         const textAreaRef = useRef(null);
  //         const textAreaRef2 = useRef(null);
  //         const textAreaRef3 = useRef(null);
  //         const textAreaRef4 = useRef(null);

  //  // Ajustar la altura de los textareas y actualizar busquedaAvanzada
  //  useEffect(() => {
  //     if (textAreaRef.current) {
  //       textAreaRef.current.style.height = 'auto';
  //       textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  //     }

  //     if (textAreaRef2.current) {
  //       textAreaRef2.current.style.height = 'auto';
  //       textAreaRef2.current.style.height = `${textAreaRef2.current.scrollHeight}px`;
  //     }

  //     if (textAreaRef3.current) {
  //       textAreaRef3.current.style.height = 'auto';
  //       textAreaRef3.current.style.height = `${textAreaRef3.current.scrollHeight}px`;
  //     }

  //     if (textAreaRef4.current) {
  //       textAreaRef4.current.style.height = 'auto';
  //       textAreaRef4.current.style.height = `${textAreaRef4.current.scrollHeight}px`;
  //     }

  //     // Crear la cadena de busquedaAvanzada con "and", "or" y "NOT"
  //     let result = '';

  //     if (value.trim()) {
  //         if (result) result += ` '${value}'`;
  //         else result += value;
  //     }

  //     if (value2.trim()) {
  //       if (result) result += ` and ${value2}`;
  //       else result += value2;
  //     }

  //     if (value3.trim()) {
  //       if (result) result += ` or ${value3}`;
  //       else result += value3;
  //     }

  //     if (value4.trim()) {
  //       if (result) result += ` NOT ${value4}`;
  //       else result += value4;
  //     }

  //     setBusquedaAvanzada(result);
  //   }, [value, value2, value3, value4]);

  //   const handleChange = (setter) => (event) => {
  //     setter(event.target.value);
  //   };

  const { setBusqueda, setVerTodasDecisiones } = useContext(Context);

  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [cadenaBusqueda, setCadenaBusqueda] = useState('');

  const textAreaRef = useRef(null);
  const textAreaRef2 = useRef(null);
  const textAreaRef3 = useRef(null);
  const textAreaRef4 = useRef(null);

  // Ajustar la altura de los textareas y actualizar busquedaAvanzada
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }

    if (textAreaRef2.current) {
      textAreaRef2.current.style.height = 'auto';
      textAreaRef2.current.style.height = `${textAreaRef2.current.scrollHeight}px`;
    }

    if (textAreaRef3.current) {
      textAreaRef3.current.style.height = 'auto';
      textAreaRef3.current.style.height = `${textAreaRef3.current.scrollHeight}px`;
    }

    if (textAreaRef4.current) {
      textAreaRef4.current.style.height = 'auto';
      textAreaRef4.current.style.height = `${textAreaRef4.current.scrollHeight}px`;
    }

    // Procesar los valores del textarea
    const processTextAreaValue = (value, replaceSpaces) => {
      // Reemplaza espacios por comas si se indica
      const processedValue = replaceSpaces
        ? value.replace(/\s+/g, ',') // Reemplazar espacios con comas
        : value;

      // Procesar el valor para obtener un array de elementos sin espacios
      return processedValue
        .split(',')
        .map(item => item.trim())
        .filter(item => item);
    };

    // Crear la cadena de busquedaAvanzada 
    const values = processTextAreaValue(value, false).map(item => `"${item}"`);
    const values2 = processTextAreaValue(value2, true);
    const values3 = processTextAreaValue(value3, true);
    const values4 = processTextAreaValue(value4, true);

    let result = '';
    let result_text = '';
    let estilosOperadores = ' <p className="text_bolder operador_size">*operadorLogico*</p> ';
    if (values.length > 0) {
      result += values.join(estilosOperadores.replace('operadorLogico', 'y'));
      result_text += values.join(' *y* ');
    }

    if (values2.length > 0) {
      if (result) result += estilosOperadores.replace('operadorLogico', 'y');
      if (result_text) result_text += ' *y* ';
      result += values2.join(estilosOperadores.replace('operadorLogico', 'y'));
      result_text += values2.join(' *y* ');
    }

    if (values3.length > 0) {
      if (result) result += estilosOperadores.replace('operadorLogico', 'o');
      if (result_text) result_text += ' *o* ';
      result += values3.join(estilosOperadores.replace('operadorLogico', 'o'));
      result_text += values3.join(' *o* ');
    }

    if (values4.length > 0) {
      if (result) result += estilosOperadores.replace('operadorLogico', 'excluir');
      if (result_text) result_text += ' *excluir* ';
      result += values4.join(estilosOperadores.replace('operadorLogico', 'excluir'));
      result_text += values4.join(' *excluir* ');
    }

    setBusquedaAvanzada(result);
    setCadenaBusqueda(result_text);
  }, [value, value2, value3, value4]);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSearch = () => {
    setBusqueda(cadenaBusqueda);
    setVerTodasDecisiones(false);
    navigate('/resultados-busqueda');
};


  // Boton help 

  const [infoHelp, setInfoHelp] = useState(false);
  const helpRef = useRef(null);

  const toggleButtonHelp = () => {
    setInfoHelp(!infoHelp);
  };


  const [infoFraseExacta, setinfoFraseExacta] = useState(false);
  const fraseExactaRef = useRef(null);

  const toggleButtonHelp1 = () => {
    setinfoFraseExacta(!infoFraseExacta);
  };


  const [infoTodasPalabras, setinfoTodasPalabras] = useState(false);
  const todasPalabrasRef = useRef(null);

  const toggleButtonHelp2 = () => {
    setinfoTodasPalabras(!infoTodasPalabras);
  };

  const [infoAlgunaPalabra, setinfoinfoAlgunaPalabra] = useState(false);
  const algunaPalabrasRef = useRef(null);

  const toggleButtonHelp3 = () => {
    setinfoinfoAlgunaPalabra(!infoAlgunaPalabra);
  };

  const [infoNingunaPalabra, setinfoNingunaPalabra] = useState(false);
  const ningunaPalabraRef = useRef(null);

  const toggleButtonHelp4 = () => {
    setinfoNingunaPalabra(!infoNingunaPalabra);
  };

  // Filtros

  const [selectedFilters, setSelectedFilters] = useState([]);
  const ButtonFilter = () => {
  }
  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Grid personalizable
  const FilterAdvanceGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center'
    },


  }));


  return (
    <Container className="margin_bottom_xl">
      <div className="search_advance_size">
        <Grid item xs={8} sm={8} md={12} lg={12} xl={12}>

          <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
            <h1 className="text_center margin_top_l">Búsqueda avanzada</h1>

            <h5 className="text_center margin_bottom_m">Delimite su búsqueda usando una o más palabras claves para los siguientes parámetros.
              {/* <br></br>
                    Si va a  incluir más de un criterio por campo, sepárelo con una coma. */}
            </h5>
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
            <div className="modal_help_container">
              <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s"
                onClick={toggleButtonHelp1}
              >?</Button>

              {infoFraseExacta && (<div className="position_float container_help_advance text_center ">
                <p><span className="text_bolder display_block">Frase exacta:</span>Use este campo para buscar dos o más términos consecutivos
                  <span className="display_block"> ej:  fuerza pública, falsos positivos, ejercito nacional</span> </p>
              </div>)}
            </div>




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
            <div className="modal_help_container">
              <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s"
                onClick={toggleButtonHelp2}
              >? {infoTodasPalabras ? '' : ''}

              </Button>

              {infoTodasPalabras && (<div className="position_float container_help_advance text_center ">
                <p><span className="text_bolder display_block">Todas las palabras:</span>Use este campo para buscar por todos los términos aquí incluidos
                  <span className="display_block"> ej:  FARC, diputados, sometimiento</span> </p>
              </div>)}
            </div>



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
            <div className="modal_help_container">
              <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s position_relative"
                onClick={toggleButtonHelp3}
              >?  {infoAlgunaPalabra ? '' : ''}

              </Button>

              {infoAlgunaPalabra && (<div className="position_float container_help_advance text_center ">
                <p><span className="text_bolder display_block">Alguna de las palabras:</span> Use este campo para buscar por alguno de los términos aquí incluidos
                  <span className="display_block"> ej: ley, norma</span> </p>
              </div>)}
            </div>

          </div>




          <div className=" vertical_align  margin_s ">
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
            <div className="modal_help_container">
              <Button className="light_white text_blue autocomplete_button_help_area button_terciary margin_left_s"
                onClick={toggleButtonHelp4}

              >

                ? {infoNingunaPalabra ? '' : ''}
              </Button>

              {infoNingunaPalabra && (<div className="position_float container_help_advance text_center">
                <p><span className="text_bolder display_block">Ninguna de las palabras:</span> Use este campo para excluir un término de su búsqueda.
                  <span className="display_block"> ej:  demanda, reclamación</span> </p>
              </div>)}

            </div>


          </div>

        </Grid>

        <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
          {(selectedFilters.length === 0 && busquedaAvanzada.length === 0) && (
            <h5 className="text_diabled text_center margin_top_m">(Aún no ha agregado ningún parámetro a su búsqueda)</h5>
          )}
          {(selectedFilters.length > 0 || busquedaAvanzada.length > 0) && (

            <Box sx={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <h4 className="text_bolder margin_s">Así se realizará su búsqueda:</h4>
            </Box>
          )}
          {selectedFilters.length > 0 && (
            <div className="display_block margin_s">
              {selectedFilters.map((value) => (
                <Chip
                  onMouseDown={e => {
                    e.stopPropagation()
                  }}
                  className="chip_select chip_select_large" key={value} label={value}
                />


              ))}
            </div>

          )}
        </Grid>



        <Grid container className="wrap">

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="search-advance-width">
            {/* <SearchBar isSearchAdvance={true}> 
                </SearchBar> */}
            {busquedaAvanzada.length > 0 && (
              <>
                <div className="input_advance">
                  <div className="flex width_100 vertical_align wrap" dangerouslySetInnerHTML={{ __html: busquedaAvanzada }}>

                  </div>
                  <Button onClick={handleSearch} className=" button_primary button_search_advance " startIcon={<SearchIcon />}>
                    Buscar
                  </Button>
                </div>

                <div className="filter_advance">
                  <FilterShort setSelectedFilters={setSelectedFilters} isFilterWindowLeft={true}/>
                </div>
              </>
            )}
          </Grid>
        </Grid>

      </div>
    </Container>

  );
}
