const http = require('http');
const fs = require('fs').promises;

async function countStudents(filePath) {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.trim().split('\n').filter(line => line);
    const students = {};

    for (const line of lines.slice(1)) {
        const [firstName, field] = line.split(',');

        if (field) {
            if (!students[field]) {
                students[field] = [];
            }
            students[field].push(firstName);
        }
    }

    return students;
}

const app = http.createServer(async (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello Holberton School!\n');
    } else if (req.url === '/students') {
        const dbPath = process.argv[2];

        if (!dbPath) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Cannot load the database\n');
            return;
        }

        try {
            const students = await countStudents(dbPath);
            const totalStudents = Object.values(students).reduce((acc, names) => acc + names.length, 0);
            let response = `This is the list of our students\nNumber of students: ${totalStudents}\n`;

            for (const [field, names] of Object.entries(students)) {
                response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(response);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Cannot load the database\n');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found\n');
    }
});

app.listen(1245, () => {
    console.log('Server is listening on port 1245');
});

module.exports = app;
