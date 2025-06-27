const transformSelectOptions = (simpleArray) => {
    if(simpleArray.length === 0 || simpleArray === undefined || simpleArray === null) {
        return [];
    } else { 
        return simpleArray.map(item => { 
            return { 
                "nombre_campo": item,
                "valor": item
            }
        });
    }   
};

const transformSelectOptionsDpto = (simpleArray) => {
    if(simpleArray.length === 0 || simpleArray === undefined || simpleArray === null) {
        return [];
    } else { 
        return simpleArray.map(item => { 
             const newItem = item.replace("DEPARTAMENTO", "").trim();
             return { 
                "nombre_campo": newItem,
                "valor": newItem
              }
        });
    } 
};

const dataFilterResults = (dataFilter) => { 
    const newFilter = {
            salas: transformSelectOptions(dataFilter[0]["sala_seccion"]) || [],
            anios: transformSelectOptions(dataFilter[1]["anio_pro"]) || [],
            departamentos: transformSelectOptionsDpto(dataFilter[2]["dpto"]) || [],
            delitos: transformSelectOptions(dataFilter[3]["delito"]) || [],
            macrocasos:  transformSelectOptions(dataFilter[4]["macrocaso"]) || [],
            comparecientes: transformSelectOptions(dataFilter[5]["tipo_compareciente"]) || [],
            procedimientos: transformSelectOptions(dataFilter[6]["procedimiento"]) || []
    };
    return newFilter;
};

export default dataFilterResults;
