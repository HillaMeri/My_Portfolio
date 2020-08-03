const gProjectId = ['Touch_the_nums', 'Mine_sweeper', 'In_the_pic'];
const gProjectNames = ['Touch The Nums', 'Mine Sweeper', 'In The Pic'];
const gProjectDesc = ['Tests your speed at absorbing numbers in space',
    'A board with mines, try to guesses where is the mine'
    , 'Find out whats hidden in the picture'];

_creatProjects();

var gProjects; 

function _createProject(id, name, desc, labels = []) {
    return {
        id,
        name,
        desc,
        url: id,
        publishAt: new Date(),
        labels
    }
}

function _creatProjects() {
    var projects = [];
    for (let i = 0; i < gProjectId.length; i++) {
        projects.push(_createProject(gProjectId[i], gProjectNames[i], gProjectDesc[i]));
    }
    gProjects = projects;
}

function getProjects() {
    return gProjects;
}

function findProject(id) {
    return gProjects.find(function (project) {
        return project.id === id;
    })
}