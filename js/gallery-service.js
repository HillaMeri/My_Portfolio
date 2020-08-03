const gProjectId = ['Touch_the_nums','Mine_sweeper','In_the_pic'];
const gProjectNames = ['Touch The Nums','Mine Sweeper','In The Pic'];
const gProjectDesc = ['Touch The Nums', 'Mine Sweeper','In The Pic'];

_creatProjects();


function _createProject(id, name,desc, labels = []) {
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
        projects.push(_createProject(gProjectId[i],gProjectNames[i], gProjectDesc[i]));
    }
    gProjects = projects;
}

function getProjects(){
    return gProjects;
}

function findProject(id){
    return gProjects.find(function (project){
        return project.id === id;
    })
}