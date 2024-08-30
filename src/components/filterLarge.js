import { Card, CardContent, Button, CardMedia } from '@mui/material';
import { Container, Grid, Box, Chip } from '@mui/material';
import { BuildTwoTone } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from './filter';
import React, { useState, useEffect, useContext } from 'react';




export default function FilterLarge() {
  const [selectedFilters, setSelectedFilters] = useState([]);


  const ButtonFilter = () => {
  }
  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };
  
  
    
  return (
    <div>
      
        <h1 className="text_center">Mapa Jurisprudencial </h1>  
        <p className="text_center">Encuentre las decisiones de la JEP y conozca la actividad judicial en el territorio Colombiano</p>
        <Grid> 
        <div className="margin_bottom_s padding_none card_filter_large">
          
          <div className="justify_between vertical_align">
              <Grid items xs={12} sm={12} md={8} lg={8} xl={8}>
              {selectedFilters.length === 0 && (
                        <h4 className="text_bolder">Seleccione un filtro para mostrarle decisiones y datos limitados a su interés</h4>
                    )}
                    {selectedFilters.length > 0 && (
                      
                        <Box sx={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                          <h4 className="text_bolder">Mostrando decisiones y datos dinámicos de:</h4> 
                          <div className="display_block"> 
                            {selectedFilters.map((value) => (
                                <Chip
                                    onMouseDown={e => {
                                        e.stopPropagation()
                                    }}
                                    className="chip_select chip_select_large" key={value} label={value}
                                />


                            ))}
                            </div>
                        </Box>
                )}
                 </Grid>

            <Grid items xs={12} sm={12} md={4} lg={4} xl={4}>
              <div className="position_relative"> 
              <Button className="button_function button_filter_size" startIcon={<FilterListIcon/>} onClick={handleFilter}>
                  {showFilter ? 'Cerrar filtros' : 'Filtrar'} 
              </Button>
      
                    <div className="position_float button_filter_position"> 
                    {showFilter && <Filter setSelectedFilters={setSelectedFilters}/>}
                    </div> 
              </div> 
            </Grid>




          </div>
         
          
       </div>
       </Grid>


    </div>


  );
}


