import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PaginatorContext from './../../context/paginatorContext.js';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import { WrapGrid, Width100Grid, NoneGrid } from './../listCardSearch/gridComponents.js';

const PaginatorDetails = ({datosLength = 0, isListSmall, selectedTerm = null}) => {

  const { setPage, customPagination, startIndexPage, endIndexPage, itemsPerPage, setItemsPerPage, href, itemsCustomPerPage, setItemsCustomPerPage } = useContext(PaginatorContext);
    
  useEffect(() => {
   if(!customPagination || Object.keys(customPagination).length > 0) {
    setItemsCustomPerPage(customPagination.per_page || 10);
   }
  }, [customPagination]);
  
  const handleChangeCustomResultsPerPage = (event, value) => {
        const params = new URLSearchParams({ string: encodeURIComponent(selectedTerm), 
                                             page: encodeURIComponent(customPagination.current_page), 
                                             per_page: encodeURIComponent(value.props.value) 
                                          });
        setTimeout(() => {
            window.location.href = `${href}?${params.toString()}`;
        }, 500);
  };
  
  const handleChangeResultsPerPage = (event) => {
        setItemsPerPage(event.target.value);
        setPage(1);
  }
    
  return (
      <>
      {(Object.keys(customPagination).length === 0) ?
                        <>
                            {/* Paginacion para seccion resultados de busqueda */}
                            <WrapGrid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex " >
                                <Width100Grid>
                                    <p className="margin_results_page">
                                        <span> {startIndexPage} </span> a
                                        <span> {endIndexPage} </span> de
                                        <span className="text_bolder"> {datosLength} </span> decisiones
                                    </p>
                                </Width100Grid>
                                <NoneGrid>
                                    <p className='margin_xs'> | </p>
                                </NoneGrid>
                                <div>
                                    <Width100Grid className='width_100 flex '>
                                        <p className="margin_results_page">Resultados por página  </p>
                                        <Box sx={{ minWidth: 270 }}>
                                            <FormControl fullWidth>
                                                {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                                                <Select className={isListSmall ? "select_items_results_small" : ("select_items_results justify_center")}
                                                    value={itemsPerPage}
                                                    onChange={handleChangeResultsPerPage}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                boxShadow: '0px 8px 24px rgba(57, 129, 195, 0.2) ', // Sombra 

                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={20}>20</MenuItem>
                                                    <MenuItem value={30}>30</MenuItem>
                                                    <MenuItem value={datosLength}>Todas</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Width100Grid>
                                </div>
                            </WrapGrid>
                        </>
                        :
                        <>
                            {/* Paginacion para seccion ver todas las decisiones */}
                            <WrapGrid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex " >
                                <Width100Grid>
                                    <p className="margin_results_page">
                                        <span> {customPagination.from + 1} </span> a
                                        <span> {customPagination.to} </span> de
                                        <span className="text_bolder"> {customPagination.total} </span> decisiones
                                    </p>
                                </Width100Grid>
                                <NoneGrid>
                                    <p className='margin_xs'> | </p>
                                </NoneGrid>
                                <div >
                                    <Width100Grid className='width_100 flex '>
                                        <p className="margin_results_page">Resultados por página  </p>
                                        <Box sx={{ minWidth: 270 }}>
                                            <FormControl fullWidth>
                                                {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                                                <Select className={isListSmall ? "select_items_results_small" : ("select_items_results justify_center")}
                                                    value={itemsCustomPerPage}
                                                    onChange={handleChangeCustomResultsPerPage}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                boxShadow: '0px 8px 24px rgba(57, 129, 195, 0.2) ', // Sombra 

                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={20}>20</MenuItem>
                                                    <MenuItem value={30}>30</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Width100Grid>
                                </div>
                            </WrapGrid>
                        </>
                    }
      </>
  );
};

export default PaginatorDetails;