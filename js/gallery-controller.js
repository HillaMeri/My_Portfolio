console.log('Starting up');
$(document).ready(onInit);

function onInit() {
  renderProjects();
  // renderModals();
  $('.submit-mail').click(function(){
    var email = $('.email-add').val();
    var subject = $('.email-subject').val();
    var messBody = $('.email-mess-body').val();
    if(!subject || !messBody) return;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=hilla7070@gmail.com&su=${subject}&body=${messBody}`);
  })
}

function renderProjects() {
  var projects = getProjects();
  var headHtmlStr = `<div class="row">
    <div class="col-lg-12 text-center">
      <h2 class="section-heading">Portfolio</h2>
      <h3 class="section-subheading text-muted">My Projects</h3>
    </div>
  </div>
  <div class="row">`
  var strHtmls = projects.map(function (project) {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
          <button onclick="openModal('${project.id}')" class="portfolio-link" data-toggle="modal">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${project.id}-full.png" alt="">
            </a>
          </button>
          <div class="portfolio-caption">
            <h4>${project.name}</h4>
          </div>
        </div>`
  })
  $('#portfolio').html(headHtmlStr + strHtmls.join(''));
}

function openModal(id) {
  var project = findProject(id);
  $('.portfolio-modal h2').text(project.name);
  $('.modal-body .img-fluid').attr("src", `img/portfolio/${id}-full.png`);
  $('.modal-body p').text(project.desc);
  $('.date').text(`Date: ${project.publishAt}`);
  $('.modal-body a').attr("href", `projects/${id}/index.html`);
  $('.modal-body a').text(project.name);
}


function onSendEmail(){
  
}