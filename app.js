const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const projectData = JSON.parse(fs.readFileSync('projects.json', 'utf8'));

app.get('/', (req, res) => {
    res.render('index', {projectData});
})

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    res.render('projects', {project: projectData[projectId].projectPage, title: projectData[projectId].title, progress: projectData[projectId].features.progression, status: projectData[projectId].status});
})

app.get('/')

app.listen(port, () => {
    console.log('app is running on port 3000');
})