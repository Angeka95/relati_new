const datos = [
    {
        id: 1,
        "fecha": "2023-06-15",
        "asunto": "En el asunto de héctor orlando bastidas bravo",
        "salaOSeccion": "Sala de Reconocimiento",
        "nombreDecision": "Sentencia SRT-ST-117-2024",
        "delito": "Desaparición Forzada",
        "departamento": "Meta",
        "municipio": "Acacias",
        "anioHechos": "2016",
        "organo": "Lorem ipsum",
        "tipo": "Lorem ipsum",
        "radicado": "Lorem ipsum",
        "procedimiento": "Lorem ipsum dolor sit amet",
        "expediente": "Lorem ipsum dolor",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...",
        "magistrado": "Lily Andrea Rueda Guzmán",
        "actor": "Lorem ipsum dolor sit amet",
        "tipoSujeto": "Lorem ipsum dolor sit amet",
        "accionadoVinculado": "Lorem ipsum dolor sit amet",
    },
    {
        id: 2,
        "fecha": "2022-03-18",
        "asunto": "En el asunto de martin gonzales leal",
        "salaOSeccion": "Sala de Amnistía",
        "nombreDecision": "Sentencia SRT-ST-120-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 3,
        "fecha": "2021-06-22",
        "asunto": "En el asunto de juana castellanos rodriguez",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 4,
        "fecha": "2023-08-11",
        "asunto": "En el asunto de mario leal prado",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 5,
        "fecha": "2021-03-15",
        "asunto": "En el asunto de juan camilo molano pedraza",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 6,
        "fecha": "2022-03-08",
        "asunto": "En el asunto de camila moreno daza",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 7,
        "fecha": "2024-02-01",
        "asunto": "En el asunto de guillermo fernandez moreno",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 8,
        "fecha": "2021-02-14",
        "asunto": "En el asunto de valentina lozano paz",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 9,
        "fecha": "2021-02-14",
        "asunto": "En el asunto de alejandra arias vasquez",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 10,
        "fecha": "2021-02-14",
        "asunto": "En el asunto de camilo puentes alvarado",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 11,
        "fecha": "2021-08-22",
        "asunto": "En el asunto de mario ramirez duarte",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 12,
        "fecha": "2021-05-11",
        "asunto": "En el asunto de viviana suarez mondragon",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 13,
        "fecha": "2020-02-14",
        "asunto": "En el asunto de diego gomez valencia",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 14,
        "fecha": "2020-02-01",
        "asunto": "En el asunto de pablo bohórquez garzón",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 15,
        "fecha": "2019-02-14",
        "asunto": "En el asunto de luis benavides romero",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 16,
        "fecha": "2016-02-14",
        "asunto": "En el asunto de andrea castillo diaz",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 17,
        "fecha": "2021-02-09",
        "asunto": "En el asunto de esteban vargas jaramillo",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 18,
        "fecha": "2021-08-07",
        "asunto": "En el asunto de ricardo castro salazar",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 19,
        "fecha": "2019-02-14",
        "asunto": "En el asunto de sergio ramirez torres",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 20,
        "fecha": "2018-02-14",
        "asunto": "En el asunto de catalina moreno vargas",
        "salaOSeccion": "Sección de Revisión",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 21,
        "fecha": "2016-06-14",
        "asunto": "En el asunto de alejandro torres castro",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
    {
        id: 22,
        "fecha": "2017-01-15",
        "asunto": "En el asunto de isabel castillo vargas",
        "salaOSeccion": "Sección de Apelacion",
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
];