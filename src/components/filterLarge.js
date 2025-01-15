import { Card, CardContent, Button, CardMedia } from '@mui/material';
import { Container, Grid, Box, Chip } from '@mui/material';
import { BuildTwoTone } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Filter from './filter';
import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Context from '../context/context.js';


export default function FilterLarge() {

  const { filtroMapaJurisprudencial, setFiltroMapaJurisprudencial } = useContext(Context);

  const [selectedFilters, setSelectedFilters] = useState([]);


  const ButtonFilter = () => {
  }
  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const SpaceBetweenGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      textAlign: 'center',
      width: "100%",
      textAlign: 'center',
      margin: '20px 0px 0px 0px',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0px 0px',
      display: 'flex',

    },
  }));

  return (
    <div>

      <div className={selectedFilters.length > 0 ? ("margin_bottom_s padding_none card_filter_large_active ") : ("margin_bottom_s padding_none card_filter_large")} >

        <div className="filter_justify_between vertical_align  ">
          <Box xs={12} sm={12} md={8} lg={8} xl={8}>
            {selectedFilters.length === 0 && (
              <h4 className="text_bolder text_center">Seleccione un filtro para mostrarle decisiones y datos limitados a su interés</h4>
            )}
            {selectedFilters.length > 0 && (

              <Box sx={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
          </Box>

          <Box xs={12} sm={12} md={4} lg={4} xl={4}>
            <div className="position_relative ">
              <Button className={showFilter ? ("button_function_noradius button_filter_size") : ("button_function button_filter_size")}
                endIcon={showFilter ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
                startIcon={<FilterListIcon />}
                onClick={handleFilter}>
                {showFilter ? ('Filtrar') : 'Filtrar'}
              </Button>

              <div className="position_float">
                <Filter isShowingFilter={showFilter} isFilterFloat={true} setSelectedFilters={setSelectedFilters} />
              </div>
            </div>
          </Box>



        </div>


      </div>



    </div>


  );
}


