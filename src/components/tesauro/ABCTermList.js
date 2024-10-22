import useGetTermsByLetter from '../../hooks/tesauro/useGetTermsByLetter';

export default function ABCTermList () {

    const data = {
        a: useGetTermsByLetter("a").terminos,
        b: useGetTermsByLetter("b").terminos,
        c: useGetTermsByLetter("c").terminos,
        d: useGetTermsByLetter("d").terminos,
        e: useGetTermsByLetter("e").terminos,
        f: useGetTermsByLetter("f").terminos,
        g: useGetTermsByLetter("g").terminos,
        h: useGetTermsByLetter("h").terminos,
        i: useGetTermsByLetter("i").terminos,
        j: useGetTermsByLetter("j").terminos,
        k: useGetTermsByLetter("k").terminos,
        l: useGetTermsByLetter("l").terminos,
        m: useGetTermsByLetter("m").terminos,
        n: useGetTermsByLetter("n").terminos,
        o: useGetTermsByLetter("o").terminos,
        p: useGetTermsByLetter("p").terminos,
        q: useGetTermsByLetter("q").terminos,
        r: useGetTermsByLetter("r").terminos,
        s: useGetTermsByLetter("s").terminos,
        t: useGetTermsByLetter("t").terminos,
        u: useGetTermsByLetter("u").terminos,
        v: useGetTermsByLetter("v").terminos,
        w: useGetTermsByLetter("w").terminos,
        x: useGetTermsByLetter("x").terminos,
        y: useGetTermsByLetter("y").terminos,
        z: useGetTermsByLetter("z").terminos
    };

    console.log("data", JSON.parse(data));
    if(!('tesauroABCTerms' in localStorage)){
        console.log("var no definida en localstorage");
        localStorage.setItem('tesauroABCTerms', null);
    } 

    setInterval(function(){
        if('tesauroABCTerms' in localStorage) {
            console.log("ya definida");
            localStorage.setItem('tesauroABCTerms', data);
            let dataTerms = JSON.parse(localStorage.getItem('tesauroABCTerms'));
            localStorage.getItem('tesauroABCTerms', JSON.stringify(data));
            console.log(dataTerms.a);
        }
    } , 8000);
    
    
    return data;

}
