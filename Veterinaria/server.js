const http = require('http');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

// Inicialización de la base de datos SQLite (veterinaria.db)
const db = new DatabaseSync('veterinaria.db');

// Creación de las dos tablas según la asignación oficial
db.exec(`
    CREATE TABLE IF NOT EXISTS mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        especie TEXT NOT NULL,
        propietario TEXT NOT NULL,
        correo TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mascota_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        hora TEXT NOT NULL,
        motivo TEXT NOT NULL
    );
`);

// Sentencias SQL preparadas con parámetros ?
const insertarMascota = db.prepare(`
    INSERT INTO mascotas (nombre, especie, propietario, correo)
    VALUES (?, ?, ?, ?)
`);

const insertarCita = db.prepare(`
    INSERT INTO citas (mascota_id, fecha, hora, motivo)
    VALUES (?, ?, ?, ?)
`);

const server = http.createServer((req, res) => {
    console.log('Método:', req.method, '| URL:', req.url);

    // RUTAS GET
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        const html = fs.readFileSync('index.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    }

    if (req.method === 'GET' && req.url === '/acerca') {
        const html = fs.readFileSync('acerca.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    }

    if (req.method === 'GET' && req.url === '/registro') {
        const html = fs.readFileSync('registro.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    }

    if (req.method === 'GET' && req.url === '/servicios') {
        const html = fs.readFileSync('servicios.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    }

    if (req.method === 'GET' && req.url === '/styles.css') {
        const css = fs.readFileSync('styles.css');
        res.writeHead(200, { 'Content-Type': 'text/css; charset=UTF-8' });
        return res.end(css);
    }

    // RUTA POST: REGISTRO DE MASCOTAS
    if (req.method === 'POST' && req.url === '/mascotas') {
        let cuerpo = '';
        req.on('data', fragmento => { cuerpo += fragmento.toString(); });
        req.on('end', () => {
            const datos = new URLSearchParams(cuerpo);
            const nombre = datos.get('nombre')?.trim();
            const especie = datos.get('especie')?.trim();
            const propietario = datos.get('propietario')?.trim();
            const correo = datos.get('correo')?.trim();

            if (!nombre || !especie || !propietario || !correo) {
                res.writeHead(400, { 'Content-Type': 'text/html; charset=UTF-8' });
                return res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head><meta charset="UTF-8"><link rel="stylesheet" href="/styles.css"><title>Error - Datos Incompletos</title></head>
                    <body>
                        <header><h1>Veterinaria - Error</h1></header>
                        <main>
                            <section>
                                <h2>400 - Solicitud Incorrecta</h2>
                                <p>Todos los campos son obligatorios para registrar una mascota.</p>
                                <a href="/registro"><button>Regresar al Registro</button></a>
                            </section>
                        </main>
                    </body>
                    </html>
                `);
            }

            try {
                const resultado = insertarMascota.run(nombre, especie, propietario, correo);
                const mascotaId = resultado.lastInsertRowid;
                
                console.log(`Mascota registrada con ID: ${mascotaId}`);

                res.writeHead(201, { 'Content-Type': 'text/html; charset=UTF-8' });
                return res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head><meta charset="UTF-8"><link rel="stylesheet" href="/styles.css"><title>Registro Exitoso</title></head>
                    <body>
                        <header><h1>Veterinaria - Confirmación</h1></header>
                        <main>
                            <section>
                                <h2>¡Mascota registrada exitosamente!</h2>
                                <p>Conserve el siguiente identificador para agendar la cita médica:</p>
                                <div style="font-size: 26px; font-weight: bold; color: #17365d; margin: 20px 0; padding: 15px; border: 2px dashed #17365d; text-align: center;">
                                    ID DE MASCOTA: ${mascotaId}
                                </div>
                                <a href="/servicios"><button>Ir a Agendar Cita</button></a>
                            </section>
                        </main>
                    </body>
                    </html>
                `);
            } catch (error) {
                console.error('Error al insertar mascota:', error);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=UTF-8' });
                return res.end('<h1>500 - Error Interno del Servidor</h1>');
            }
        });
        return;
    }

    // RUTA POST: AGENDAMIENTO DE CITAS
    if (req.method === 'POST' && req.url === '/citas') {
        let cuerpo = '';
        req.on('data', fragmento => { cuerpo += fragmento.toString(); });
        req.on('end', () => {
            const datos = new URLSearchParams(cuerpo);
            const mascota_id = datos.get('mascota_id')?.trim();
            const fecha = datos.get('fecha')?.trim();
            const hora = datos.get('hora')?.trim();
            const motivo = datos.get('motivo')?.trim();

            if (!mascota_id || !fecha || !hora || !motivo) {
                res.writeHead(400, { 'Content-Type': 'text/html; charset=UTF-8' });
                return res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head><meta charset="UTF-8"><link rel="stylesheet" href="/styles.css"><title>Error - Datos Incompletos</title></head>
                    <body>
                        <header><h1>Veterinaria - Error</h1></header>
                        <main>
                            <section>
                                <h2>400 - Solicitud Incorrecta</h2>
                                <p>Todos los campos son obligatorios para agendar la cita.</p>
                                <a href="/servicios"><button>Regresar a Servicios</button></a>
                            </section>
                        </main>
                    </body>
                    </html>
                `);
            }

            try {
                const resultado = insertarCita.run(mascota_id, fecha, hora, motivo);

                console.log(`Cita agendada con ID: ${resultado.lastInsertRowid} para la Mascota ID: ${mascota_id}`);

                res.writeHead(201, { 'Content-Type': 'text/html; charset=UTF-8' });
                return res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head><meta charset="UTF-8"><link rel="stylesheet" href="/styles.css"><title>Cita Agendada</title></head>
                    <body>
                        <header><h1>Veterinaria - Confirmación</h1></header>
                        <main>
                            <section>
                                <h2>¡Cita agendada con éxito!</h2>
                                <p>La cita ha sido almacenada correctamente para la Mascota con ID: <strong>${mascota_id}</strong>.</p>
                                <a href="/"><button>Volver al Inicio</button></a>
                            </section>
                        </main>
                    </body>
                    </html>
                `);
            } catch (error) {
                console.error('Error al agendar cita:', error);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=UTF-8' });
                return res.end('<h1>500 - Error Interno del Servidor</h1>');
            }
        });
        return;
    }

    // RUTA NO ENCONTRADA (404)
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><link rel="stylesheet" href="/styles.css"><title>Página no encontrada</title></head>
        <body>
            <header><h1>Veterinaria</h1></header>
            <main>
                <section>
                    <h2>404 - Página No Encontrada</h2>
                    <p>El recurso que está intentando consultar no existe.</p>
                    <a href="/"><button>Ir al Inicio</button></a>
                </section>
            </main>
        </body>
        </html>
    `);
});

server.listen(3000, () => {
    console.log('Servidor disponible en http://localhost:3000');
});