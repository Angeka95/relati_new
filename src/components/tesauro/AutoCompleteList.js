
export default function AutoCompleteList (lista) {

    const data = lista.map(item => { return { "title": item } });
    
    return data;

}
