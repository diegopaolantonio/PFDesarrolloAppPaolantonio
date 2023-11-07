# PROYECTO APP PAOLANTONIO (FREELANCER APP)

> Aplicacion destinada al control de clientes, proyectos y cobros, para trabajadores ***Freelance***.

## Descripcion

> Las herramientas utilizadas en esta app fueron:
> - React Native
> - Expo
> - DateTimePicker
> - Expo Image Picker
> - Expo Font
> - Expo Location
> - Firebase
> - React Native Maps
> - React Native Select Dropdown
> - React Redux
> - Async Storage

### Secciones

1. **Registro de usuario y Login**.

Este se realiza mediante ==*Email*==, que debe ser unico, y ==*Password*==.
La validacion del mismo lo hace mediante ***Authentication*** de ***Firebase***.

2. **Usuarios**.

Aqui podemos cargar los datos del usuario, pero estos no son obligatorios:
    - **id**: codigo alfanumero autogenerado por firebase.
    - **nombre**: Nombre del usuario o de la empresa.
    - **profesion**: Profesion y/o Rubro de trabajo.
    - **ciudad**: Cuidad de base de trabajo.
    - **pais**: Pais de base de trabajo.
    - **birthDate**: fecha de nacimiento del usuario o fecha de inscripcion de la empresa.
    - **Foto o Imagen**: Foto o logo del usuario.

3. **Clientes**.

Los clientes se cargan para el usuario, estos estan compuestos por los datos:
    - **id**: valor numero autogenerado.
    - **nombre**: del cliente, debe ser unico.
    - **rubro**: del cliente.
    - **ciudad**: en la que esta asentado el cliente.
    - **pais**: en el que esta asentado.
    - **cuit**: del cliente.
    - **projects**: que se realizaron, que se estan realizando o que se estan por realizar para este cliente.

4. **Proyectos**.

Los proyectos se cargan en cada cliente en particular, y estan compuestos por esta informacion:
    - **id**: valor numero autogenerado.
    - **nombre**: Que identifica el proyecto.
    - **cotizacion**: Numero o codigo de cotizacion.
    - **orden**: Numero de Orden bajo el cual se acepta la cotizacion.
    - **horas**: Horas cotizadas.
    - **monto**: Precio total cotizado.
    - **coin**: Moneda bajo la cual se cotizo
        - *Pesos Argentinos* **$**.
        - *Dolar Estadounidense* **USD**.
        - *Euro* **E$**.
        - *Real Brasilero* **R$**.
    - **estado**: Estado del proyecto
        - *En espera*: todavia no se inicia.
        - *En proceso*: ya iniciada.
        - *Finalizado*: finalizada.
        - *Cancelado*: cancelada.
    - **startDate**: fecha de inicio del proyecto.
    - **finishDate**: fecha de fin del proyecto.
    - **paymentStatus**: estado de pago.
        - *Sin facturar*: Todavia no se autoriza a facturar.
        - *Facturado*: Factura realizada pero no se cobro el trabajo
        - *Cobrado*: Trabajo cobrado.

5. **Carrito**:

Aqui se visualizan todos los proyectos con los siguientes datos:
    - **client**: nombre del cliente.
    - **project**: nombre del proyecto.
    - **paymentStatus**: estado del pago.
    - **moneda**: moneda de precio.
    - **monto**: precio del proyecto.

## Variables cargadas a Firebase

1. **Registro de usuario y Login**.

    - **Email** Type String
    - **Password** Type String

Ejemplo:
"email": "juan_perez@email.com"
"password": "contraseña"

2. **Users**.

    - **id** Type String
    - **nombre** Type String
    - **profesion** Type String
    - **ciudad** Type String
    - **pais** Type String
    - **birthDate** Type Object
        - **day** Type Number
        - **month** Type Number
        - **year** Type Number

Ejemplo:
{ "8D7ASF587ASD78F6SDAD": {
    "id": "8D7ASF587ASD78F6SDAD",
    "nombre": "Juan Perez",
    "profesion": "Electricista",
    "ciudad": "Santa Fe",
    "pais": "Argentina",
    "birthDate": {
        "day": 5,
        "month": 7,
        "year": 1995,
    }
}
}

3. **Image**

    - **image** Type Base64
    - **nombre** Type String

Ejemplo:
{
    "id": {
        "image": `data:image/jpeg;base64,${result.assets[0].base64}`,
        "client1": {
            "image": `data:image/jpeg;base64,${result.assets[0].base64}`,
        },
        "client2": {
            "image": `data:image/jpeg;base64,${result.assets[0].base64}`,
        },
    }
}

4. **Clients**.

    - **nombre** Type String
    - **id** Type Number
    - **rubro** Type String
    - **ciudad** Type String
    - **pais** Type String
    - **cuit** Type String
    - **projects** Type Array
        - **nombre** Type String
        - **id** Type Number
        - **cotizacion** Type String
        - **orden** Type String
        - **horas** Type String
        - **monto** Type String
        - **coin** Type String
            - *$*
            - *USD*
            - *E$*
            - *R$*
        - **estado** Type String
            - *En espera*
            - *En proceso*
            - *Finalizado*
            - *Cancelado*
        - **startDate** Type Object
            - **day** Type String
            - **month** Type String
            - **year** Type String
        - **finishDate** Type Object
            - **day** Type String
            - **month** Type String
            - **year** Type String
        - **paymentStatus** Type String
            - *Sin facturar*
            - *Facturado*
            - *Cobrado*

Ejemplo:
{
    "8D7ASF587ASD78F6SDAD": {
        "Nombre: {
            "id": "1216897824387",
            "rubro": "Automotriz",
            "ciudad": "Buenos Aires",
            "pais": "Argentina",
            "cuit": "45-52147896-3",
            "projects": [ {
                "nombre": "Cambio de PLC",
                "id": 5376158416862,
                "cotizacion": "g12j3gu1g",
                "orden": "bjkeh12hkjeh1",
                "horas": "240",
                "monto: "1000",
                "coin": "USD",
                "estado": "En proceso",
                "startDate" {
                    "day": "9",
                    "month": "11",
                    "year": "2023",
                    }
                "finishDate": {
                    "day": "31",
                    "month": "12",
                    "year": "2023",
                    }
                "paymentStatus": "Sin facturar"
                },
                {
                "nombre": "Modificacion de ciclo",
                "id": 1371238416831,
                "cotizacion": "h14j3tyy8",
                "orden": "bjkeh12hkjeh1",
                "horas": "40",
                "monto: "200",
                "coin": "E$",
                "estado": "Finalizado",
                "startDate" {
                    "day": "25",
                    "month": "7",
                    "year": "2023",
                    }
                "finishDate": {
                    "day": "30",
                    "month": "7",
                    "year": "2023",
                    }
                "paymentStatus": "Cobrado"
                }
            ]
        }
    }
}
    