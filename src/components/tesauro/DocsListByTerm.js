import useGetDocsByTerm from '../../hooks/tesauro/useGetDocsByTerm';

export default function DocsListByTerm (selectedTerm) {

    const data = useGetDocsByTerm(selectedTerm).resultados;
    
    return data;

}
