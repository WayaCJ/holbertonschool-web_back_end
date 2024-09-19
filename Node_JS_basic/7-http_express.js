const express = require('express');
const fs = require('fs').promises;

const app = express();

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

app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
    const dbPath = process.argv[2];

    if (!dbPath) {
        res.status(500).send('Cannot load the database');
        return;
    }

    try {
        const students = await countStudents(dbPath);
        const totalStudents = Object.values(students).reduce((acc, names) => acc + names.length, 0);
        let response = `This is the list of our students\nNumber of students: ${totalStudents}\n`;

        for (const [field, names] of Object.entries(students)) {
            response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        }

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Cannot load the database');
    }
});

app.listen(1245, () => {
    console.log('Server is listening on port 1245');
});

module.exports = app;
