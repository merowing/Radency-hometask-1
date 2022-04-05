const http = require('http');
const fs = require('fs');
//const mine = require('mine');

const localServer = http.createServer((req, res) => {
    
    let filePath = (req.url === '/') ? '/src/index.html' : `/src/${req.url}`;

    let file = req.url.split('.');
    let fileExtension = req.url.split('.')[file.length - 1];
    let contentType = "text/html";
    let ext = {html: "html", css: "css", js: "javascript"};
    
    if(ext[fileExtension]) contentType = `text/${ext[fileExtension]}`;

    fs.readFile(__dirname + filePath, (err, data) => {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            return res.end(`${filePath} not found!`);
        }
        
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    });
});

localServer.listen(3000, 'localhost', () => console.log('Local server is online'));