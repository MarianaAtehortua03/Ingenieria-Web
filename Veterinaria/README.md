# Veterinaria - Aplicación Web con Node.js y SQLite

**Proyecto:** Práctica Evaluativa (20%) — Diseño de una aplicación Web temática con Node.js y SQLite
**Estudiante:** Mariana Atehortua Grajales
**Asignatura:** Ingeniería Web
**Programa:** Ingeniería de Software
**Institución:** Universidad Cooperativa de Colombia
**Temática Asignada:** Veterinaria

## 1. Descripción Funcional

Este sitio Web gestiona el registro de pacientes y el agendamiento de citas en una **Veterinaria**. La aplicación sigue una arquitectura cliente-servidor nativa sin frameworks externos y utiliza una base de datos SQLite para garantizar la persistencia de datos.

### Orden de uso obligatorio:

1. **Registro de Mascota:** El usuario ingresa a `/registro` y completa el formulario (`POST /mascotas`). El servidor procesa la solicitud, almacena el registro en la tabla `mascotas` y responde con una página de confirmación que muestra el **ID generado** (`lastInsertRowid`).
2. **Agendamiento de Cita:** El usuario ingresa a `/servicios` e introduce el ID de la mascota junto con la fecha, hora y motivo de la cita (`POST /citas`). El servidor almacena el registro en la tabla `citas` asociándolo a la mascota correspondiente.

## 2. Tecnologías Utilizadas

* **HTML5:** Estructura semántica integrada por los elementos `<header>`, `<nav>`, `<main>`, `<section>` y `<footer>`.
* **CSS3:** Presentación visual externa a través del archivo `styles.css`.
* **JavaScript / Node.js:** Servidor HTTP creado mediante módulos nativos (`http`, `fs`).
* **SQLite:** Persistencia de datos mediante el módulo nativo `node:sqlite` (`DatabaseSync`).
* **Protocolo HTTP:** Gestión de peticiones `GET` y `POST`, acompañada de los códigos de estado `200`, `201`, `400`, `404` y `500`.

## 3. Estructura del Proyecto

```text
veterinaria/
├── index.html       # Página principal temática
├── acerca.html      # Información del proyecto y contexto
├── registro.html    # Formulario para registrar la entidad principal (mascotas)
├── servicios.html   # Formulario para agendar la cita médica (citas)
├── styles.css       # Hoja de estilos externa compartida
├── server.js        # Servidor HTTP y administración de SQLite
├── veterinaria.db   # Base de datos SQLite
└── README.md        # Documentación oficial del proyecto
```

## 4. Tabla de Rutas

| **Método**     | **Ruta**      | **Recurso o Respuesta**                | **Código HTTP**                   |
| -------------- | ------------- | -------------------------------------- | --------------------------------- |
| `GET`          | `/`           | `index.html`                           | `200 OK`                          |
| `GET`          | `/acerca`     | `acerca.html`                          | `200 OK`                          |
| `GET`          | `/registro`   | `registro.html`                        | `200 OK`                          |
| `GET`          | `/servicios`  | `servicios.html`                       | `200 OK`                          |
| `GET`          | `/styles.css` | `styles.css`                           | `200 OK`                          |
| `POST`         | `/mascotas`   | Registra mascota y muestra su ID       | `201 Created` / `400 Bad Request` |
| `POST`         | `/citas`      | Registra cita vinculada a `mascota_id` | `201 Created` / `400 Bad Request` |
| Cualquier otra | —             | `404 - Página no encontrada`           | `404 Not Found`                   |

## 5. Modelo de Datos

**Base de Datos:** `veterinaria.db`

### Tabla 1: `mascotas` (Entidad Principal)

| **Columna**   | **Tipo**  | **Restricciones**           | **Propósito**                            |
| ------------- | --------- | --------------------------- | ---------------------------------------- |
| `id`          | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Identificador autogenerado de la mascota |
| `nombre`      | `TEXT`    | `NOT NULL`                  | Nombre de la mascota                     |
| `especie`     | `TEXT`    | `NOT NULL`                  | Especie de la mascota                    |
| `propietario` | `TEXT`    | `NOT NULL`                  | Nombre del propietario                   |
| `correo`      | `TEXT`    | `NOT NULL`                  | Correo electrónico de contacto           |

### Tabla 2: `citas` (Operaciones)

| **Columna**  | **Tipo**  | **Restricciones**           | **Propósito**                          |
| ------------ | --------- | --------------------------- | -------------------------------------- |
| `id`         | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Identificador autogenerado de la cita  |
| `mascota_id` | `INTEGER` | `NOT NULL`                  | Identificador de la mascota registrada |
| `fecha`      | `TEXT`    | `NOT NULL`                  | Fecha de la cita médica                |
| `hora`       | `TEXT`    | `NOT NULL`                  | Hora programada                        |
| `motivo`     | `TEXT`    | `NOT NULL`                  | Motivo de la consulta                  |

## 6. Requisitos Previos e Instrucciones de Ejecución

### Requisitos

* Node.js v24 o superior instalado.
* Puerto 3000 disponible en el sistema.

### Pasos para ejecutar

1. **Clonar o descargar el repositorio:**

```bash
git clone https://github.com/MarianaAtehortua03/Ingenieria-Web.git
cd veterinaria
```

2. **Verificar la versión instalada de Node.js:**

```bash
node --version
```

3. **Iniciar el servidor** (no requiere `npm install` ni paquetes externos):

```bash
node server.js
```

4. **Abrir la aplicación en el navegador ingresando a:**

```text
http://localhost:3000
```

---

## 7. Procesamiento de Peticiones POST y Persistencia

* **Procesamiento de POST:** El servidor escucha los eventos `data` y `end` para capturar el cuerpo de la petición. Posteriormente, interpreta los parámetros mediante `URLSearchParams` y limpia los valores de texto aplicando `.trim()`.

* **Validación Backend:** Si falta alguno de los datos obligatorios, el servidor responde con un estado `400 Bad Request` sin ejecutar la sentencia SQL.

* **Almacenamiento:** Se emplean consultas parametrizadas con `?` mediante la función `.prepare()` y `.run()` para prevenir inyecciones SQL.

* **Persistencia:** Todos los datos permanecen almacenados en la base de datos `veterinaria.db` tras reiniciar el servidor.

---

## 8. Pruebas Realizadas y Resultados

* **Navegación:** Las 4 rutas `GET` entregan sus respectivos documentos HTML respondiendo con código `200`.

* **Carga de CSS:** La terminal registra la petición `GET /styles.css` enviada con el encabezado `Content-Type: text/css`.

* **Registro de Mascota:** Envío válido a `POST /mascotas` responde con código `201` y expone el ID asignado por `lastInsertRowid`.

* **Registro de Cita:** Envío válido a `POST /citas` incluyendo el ID previo almacena la cita con código `201`.

* **Validación de Campos:** Se forzó el envío de datos vacíos respondiendo adecuadamente con código `400`.

* **Respuesta 404:** El ingreso a URLs no definidas retorna la pantalla de error con código `404`.

* **Reproducibilidad:** El proyecto se probó clonando el repositorio desde cero y eliminando el archivo `.db`, verificando que el servidor lo crea automáticamente junto a las tablas.
