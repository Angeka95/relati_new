import React from 'react';
import { useEffect, useContext } from 'react';
import Context from './../../context/context.js';
import PaginatorContext from './../../context/paginatorContext.js';
import FilterContext from './../../context/filterContext.js';
import { Pagination, PaginationItem } from '@mui/material';
import { SpaceGrid } from './../gridComponents/gridComponents.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getLocalStorageSimple } from '../../helpers/utils.js';
import './../../App.css';

const Paginator = ({ datosLength = 0, selectedTerm = null, href = null }) => {
    
    const { page, setPage } = useContext(PaginatorContext);
    const { itemsPerPage, setItemsPerPage } = useContext(PaginatorContext);
    const { startIndexPage, setStartIndexPage } = useContext(PaginatorContext);
    const { endIndexPage, setEndIndexPage } = useContext(PaginatorContext);
    const { customPagination, setCustomPagination } = useContext(PaginatorContext);
    const { totalPages, setTotalPages } = useContext(PaginatorContext);
    const { setHref } = useContext(PaginatorContext);
    
    const { searchFilterObj, setSearchFilterObj } = useContext(Context);
    
    const lsFlagFromFilter = localStorage.getItem('flagFromFilter');

    // Funciones de paginacion
    
    // useEffect que carga los valores del paginador como pagina inicial, final, total de paginas, y la url de la seccion a paginar ej. "/resultados-busqueda"
    useEffect(() => {
        let tempEndIndexPage = Math.ceil(page * itemsPerPage);
        setEndIndexPage(tempEndIndexPage > datosLength ? datosLength : tempEndIndexPage);
        setStartIndexPage(Math.ceil(page * itemsPerPage + 1 - itemsPerPage));
        setTotalPages(Math.ceil(datosLength / itemsPerPage));
        setHref(href);
    }, []);
    
    // handleChange: funcionalidad que manipula la paginacion a partir de un set de datos totales obtenidos de un estado
    const handleChange = (event, value) => {
        setPage(value);
    };
    
    // handleChangeCustomPagination: funcionalidad que manipula la paginacion a partir del un set de datos segmentados por page and per_page
    const handleChangeCustomPagination = (event, value) => { 
        const params = new URLSearchParams({ string: encodeURIComponent(selectedTerm), page: encodeURIComponent(value), per_page: encodeURIComponent(customPagination.per_page) });
        window.location.href = `${href}?${params.toString()}`;
    }
    
     // handleChangeCustomPagination: funcionalidad que manipula la paginacion a partir del un set de datos segmentados por page and per_page cuando hay valores en filtro
    const handleChangeCustomPaginationFromFilter = (event, value) => {    
        const objSearchFilterQry = JSON.parse(getLocalStorageSimple('searchFilterQry'));
        Object.assign(objSearchFilterQry, { page: value, per_page: customPagination.per_page });
        console.log("newSearchFilterObj", objSearchFilterQry);   
        setSearchFilterObj(objSearchFilterQry);
    }

    // Fin funciones de paginacion
    
  return (
      <>
        <SpaceGrid className="justify_end">
            {/* Si en localStorage la variable flagFromFilter es igual a false la paginacion no basada en filtro lateral */}
            {(lsFlagFromFilter && (getLocalStorageSimple('flagFromFilter') === "false")) ? 
            <>
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
                        {/* Paginacion basada en datos segmentados a partir de la respuesta del servicio por medio de page y per_page */}
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
            </>
            :
                <>
                    {/* Paginacion basada en filtro lateral, flagFromFilter is true */}
                    <Pagination className="margin_top_s"
                        count={Math.ceil(customPagination.total / customPagination.per_page)}
                        page={ customPagination.current_page }
                        onChange={handleChangeCustomPaginationFromFilter}
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