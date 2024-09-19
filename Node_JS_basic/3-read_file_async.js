const fs = require('fs').promises;

async function countStudents(filePath) {
    try {
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

        const totalStudents = lines.length - 1;
        console.log(`Number of students: ${totalStudents}`);

        for (const [field, names] of Object.entries(students)) {
            console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        }
    } catch (err) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;
