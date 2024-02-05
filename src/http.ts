import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
	console.log(req.url);

	if (req.url === '/') {
		const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});
		res.end(htmlFile);
		return;
	}

	if (req.url!.includes('.css')) {
		res.writeHead(200, {
			'Content-Type': 'text/css',
		});
		const cssFile = fs.readFileSync(`./public/${req.url}`, 'utf-8');
		res.end(cssFile);
	}

	res.end();
});

const PORT = 8080;
server.listen(PORT, () => {
	console.log(`Server running in port ${PORT}`);
});
