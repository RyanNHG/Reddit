var titles = [
    "Mountains are nice",
    "Your new wallpaper",
    "This cat is too cute!",
    "Lil pup!"
];

var authors = [
    "ryan2345",
    "hansel222",
    "reebs408",
    "eric63"
];

var scores = [
    1032,
    513,
    268,
    42
];

var nums_comments = [
    156,
    37,
    22,
    13
];


$(document).ready(function(){

    $('#content-section > .row').slideUp(function(){
        for(var i = 0; i < 4; i++)
            loadImagePost(titles[i], authors[i], scores[i], nums_comments[i], 'img/sample'+i+'.jpg', 7-i);

        $('#content-section > .row').slideDown();
    });

});

function loadImagePost(title,author,score,num_comments,imageUrl,created)
{

    var html =  '<div class="small-12 columns">'+
'                    <div class="row">'+
'                      <a href="#headerClicked">'+
'                        <div class="small-12 columns">'+
'                          <div class="panel" style=" padding-bottom: 0px; ">'+
'                              <div class="row">'+
'                                <div class="small-12 columns">'+
'                                  <h3 style="font-weight: bold;">'+title+'</h3>'+
'                                </div>'+
'                                <div class="small-6 columns" style="margin-left: 0px;">'+
'                                  <h5 style="margin-left: 1.225rem;">'+author+'</h5>'+
'                                </div>'+
'                                <div class="small-6 columns">'+
'                                  <p style="text-align: right; margin-right: 1.25rem;">'+created+' hours ago</p>'+
'                                </div>'+
'                              </div>'+
'                            </div>'+
'                        </div>'+
'                      </a>'+
'                      <a href="#imageClicked">'+
'                        <div class="small-12 columns">'+
'                          <img src="'+imageUrl+'" >'+
'                        </div>'+
'                      </a>'+
'                      <a href="#commentClicked">'+
'                        <div class="small-12 columns">'+
'                          <div class="panel" style=" padding-bottom: 10px; margin-top: 0px; padding-top: 10px;">'+
'                            <div class="row">'+
'                              <div class="small-9 columns">'+
'                                <p style="margin-bottom: 0px;"><strong>babyhansel</strong> - Cute cat!</p>'+
'                              </div>'+
'                              <div class="small-3 columns">'+
'                                <p style="text-align: right; margin-bottom: 0px;"><strong>'+num_comments+'</strong></p>'+
'                              </div>'+
'                            </div>'+
'                          </div>'+
'                        </div>'+
'                      </a>'+
'                    </div>'+
                '</div>';

        $('#content-section > .row').append(html);
}
