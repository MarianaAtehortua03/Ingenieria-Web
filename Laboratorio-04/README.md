# Laboratorio 04 — Diseño personalizado de un sitio Web servido con Node.js

**Nombre:** Mariana Atehortúa

**Asignatura:** Ingeniería Web

**Programa:** Ingeniería de Software

**Repositorio:** https://github.com/MarianaAtehortua03/Ingenieria-Web.git

## Descripción del Proyecto

Este proyecto corresponde al Laboratorio 04 de la asignatura Ingeniería Web. Consiste en la personalización de cuatro páginas web estructuradas con HTML semántico, la aplicación de una hoja de estilos externa (styles.css) servida mediante HTTP desde Node.js y la comprobación del envío del formulario de contacto a través de una petición POST /contacto.

## Tecnologías Utilizadas

* HTML
* CSS
* JavaScript
* Node.js
* HTTP

## Estructura del Proyecto

```text
laboratorio-04/
├── index_rutas.html  # Página principal personalizada y presentación general del sitio.
├── acerca.html       # Información acerca del sitio
├── servicios.html    # Descripción visualmente organizada de los servicios.
├── contacto.html     # Formulario de contacto funcional.
├── styles.css        # Hoja de estilos compartida por todas las páginas.
├── server.js         # Servidor HTTP y definición de rutas.
└── README.md         # Documentación del proyecto.
```

## Tabla de Rutas

| Método HTTP          | Ruta          | Archivo / Respuesta                         |
| :------------------- | :------------ | :------------------------------------------ |
| **GET**              | `/`           | `index_rutas.html`                          |
| **GET**              | `/acerca`     | `acerca.html`                               |
| **GET**              | `/servicios`  | `servicios.html`                            |
| **GET**              | `/contacto`   | `contacto.html`                             |
| **GET**              | `/styles.css` | `styles.css`                                |
| **POST**             | `/contacto`   | Muestra "Formulario recibido correctamente" |
| **Cualquier método** | *Inexistente* | Respuesta 404                               |

## Explicación de Entrega de styles.css y POST /contacto

### Entrega de styles.css

* La hoja de estilos externa se vincula en los archivos HTML.
* Cuando el navegador procesa la página, realiza una petición de tipo `GET /styles.css`.
* El servidor Node.js atiende dicha ruta leyendo el archivo `styles.css` y enviándolo con la cabecera `Content-Type: text/css; charset=UTF-8`.

### Funcionamiento de POST /contacto

* El formulario ubicado en `contacto.html` utiliza los atributos `action="/contacto"` y `method="POST"`.
* Al presionar el botón de envío, el navegador realiza una petición `POST /contacto`.
* El servidor detecta esta petición, registra en la terminal el aviso correspondiente y responde al navegador con el texto "Formulario recibido correctamente".

## Comandos Utilizados

Comandos de Git para publicar el repositorio:

```bash
git init

git add .

git commit -m "Laboratorio 04"

git branch -M main

git remote add origin https://github.com/MarianaAtehortua03/Ingenieria-Web.git

git push -u origin main
```

Comando para ejecutar el servidor:

```bash
node server.js
```

## Instrucciones para Descargar y Ejecutar el Proyecto

* Clonar este repositorio mediante el comando:

```bash
git clone https://github.com/MarianaAtehortua03/Ingenieria-Web.git
```

* Abrir una terminal en la carpeta del proyecto.

* Iniciar el servidor ejecutando: `node server.js`

* Abrir el navegador e ingresar a: `http://localhost:3000`

* Navegar por las rutas:

  * `/`
  * `/acerca`
  * `/servicios`
  * `/contacto`

* Enviar el formulario para comprobar la respuesta en pantalla y verificar las evidencias registradas en la terminal.
