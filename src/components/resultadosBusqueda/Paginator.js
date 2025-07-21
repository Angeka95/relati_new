import React from 'react';
import { useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { SpaceGrid } from './../listCardSearch/gridComponents.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Paginator = ({ datosLength = 0, itemsPerPage = 10, page = 1, customPagination = null, handleChange = null, selectedTerm = null }) => {

    // Funciones de paginacion

    const totalPages = Math.ceil(datosLength / itemsPerPage);
    let endIndexPage = Math.ceil(page * itemsPerPage);
    endIndexPage = endIndexPage > datosLength ? datosLength : endIndexPage

    const startIndexPage = Math.ceil(page * itemsPerPage + 1 - itemsPerPage);

    // custom Pagination
    const handleChangeCustomPagination = (event, value) => {
        const params = new URLSearchParams({ string: encodeURIComponent(selectedTerm), page: encodeURIComponent(value), per_page: encodeURIComponent(customPagination.per_page) });
        window.location.href = `/resultados-busqueda?${params.toString()}`;
    }

    // Fin funciones de paginacion
    
  return (
      <>
        Paginador para resultados de busqueda
        <SpaceGrid className="justify_end">
            {(Object.keys(customPagination).length === 0) ?
                <>
                <Pagination className="margin_top_s"
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item, id) => (
                        <PaginationItem key={id}
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
                </>
                :
                <>
                <Pagination className="margin_top_s"
                    count={Math.ceil(customPagination.total / customPagination.per_page)}
                    page={ customPagination.current_page }
                    onChange={handleChangeCustomPagination}
                    renderItem={(item, id) => (
                        <PaginationItem key={id}
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
                </>
            }
        </SpaceGrid>
      </>
  );
};

export default Paginator;