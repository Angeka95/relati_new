import React from 'react';
import { useEffect, useContext } from 'react';
import PaginatorContext from './../../context/paginatorContext.js';
import { Pagination, PaginationItem } from '@mui/material';
import { SpaceGrid } from './../gridComponents/gridComponents.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './../../App.css';

const Paginator = ({ datosLength = 0, selectedTerm = null, href = null }) => {
    
    const { page, setPage } = useContext(PaginatorContext);
    const { itemsPerPage, setItemsPerPage } = useContext(PaginatorContext);
    const { startIndexPage, setStartIndexPage } = useContext(PaginatorContext);
    const { endIndexPage, setEndIndexPage } = useContext(PaginatorContext);
    const { customPagination, setCustomPagination } = useContext(PaginatorContext);
    const { totalPages, setTotalPages } = useContext(PaginatorContext);
    const { setHref } = useContext(PaginatorContext);
    
    // Funciones de paginacion
    
    useEffect(() => {
        let tempEndIndexPage = Math.ceil(page * itemsPerPage);
        setEndIndexPage(tempEndIndexPage > datosLength ? datosLength : tempEndIndexPage);
        setStartIndexPage(Math.ceil(page * itemsPerPage + 1 - itemsPerPage));
        setTotalPages(Math.ceil(datosLength / itemsPerPage));
        setHref(href);
    }, []);
    
    // 
    const handleChange = (event, value) => {
        setPage(value);
    };
    
    // custom Pagination
    const handleChangeCustomPagination = (event, value) => {
        const params = new URLSearchParams({ string: encodeURIComponent(selectedTerm), page: encodeURIComponent(value), per_page: encodeURIComponent(customPagination.per_page) });
        window.location.href = `${href}?${params.toString()}`;
    }

    // Fin funciones de paginacion
    
  return (
      <>
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