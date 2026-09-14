const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Método:', req.method);
    console.log('URL:', req.url);

    // Ruta Principal
    if (req.method === 'GET' && req.url === '/') {
        const html = fs.readFileSync('index_rutas.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    } 
    // Ruta Acerca
    else if (req.method === 'GET' && req.url === '/acerca') {
        const html = fs.readFileSync('acerca.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    } 
    // Ruta Servicios
    else if (req.method === 'GET' && req.url === '/servicios') {
        const html = fs.readFileSync('servicios.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    } 
    // Ruta Contacto
    else if (req.method === 'GET' && req.url === '/contacto') {
        const html = fs.readFileSync('contacto.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(html);
    } 
    // Entrega de la hoja de estilos externa
    else if (req.method === 'GET' && req.url === '/styles.css') {
        const css = fs.readFileSync('styles.css');
        res.writeHead(200, { 'Content-Type': 'text/css; charset=UTF-8' });
        return res.end(css);
    } 
    // Petición POST del formulario de contacto
    else if (req.method === 'POST' && req.url === '/contacto') {
        console.log('Formulario recibido');
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
        return res.end('Formulario recibido correctamente');
    } 
    // Manejo de error 404 (Rutas no definidas)
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end('404 - Página no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor disponible en http://localhost:3000');
});