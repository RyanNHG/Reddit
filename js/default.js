//  CONSTANTS
var loggedIn;
var AUTOFILL_LIMIT = 5;

//
//  ON READY
//

$(document).ready(onReady);

function onReady()
{
    loggedIn = false;

    setupListeners();

    loadPage("home");
}

function setupListeners()
{
    $('.link_login').click(promptLogin);
    $('.link_logout').click(promptLogout);
    $('.btn_login').click(login);
    $('.btn_logout').click(logout);
    $('#search_subreddit').keyup(autofill);


}

//////////////////////////////////////////////////////////
//  LOADING NEW PAGES   //////////////////////////////////
//////////////////////////////////////////////////////////

function loadPage(pageName)
{
    switch(pageName)
    {
        case "home":
            loadPageHelper("html/home.html",homeReady,pageName);
            break;
        default: 
            loadPageHelper("html/home.html", homeReady,pageName);
            break;
    }
}

function loadPageHelper(htmlFile, func, pageName)
{
    $('#page_active').fadeOut(function() {
        $('#page_active').load(htmlFile,function() 
        {
            $('#page_active').fadeIn(func);
        });
    });
}

function homeReady()
{
   
}


//////////////////////////////////////////////////////////
//  ACCOUNT MANAGEMENT   /////////////////////////////////
//////////////////////////////////////////////////////////

function promptLogin()
{
    $('#loginModal').foundation('reveal','open');
}

function promptLogout()
{
    $('#logoutModal').foundation('reveal','open');
}

function login()
{
    //  Close modal
    $('#loginModal').foundation('reveal', 'close');
    
    //  Login
    loggedIn = true;

    //  Show username in top right
    $('#li_user > a').text(getUsername());

    //  Show logout button
    $('#li_login').toggle();
    $('#li_user').toggle();

    //  Display alert and set up alert close event
    $('#loginAlertSuccess').slideDown().delay(1000).slideUp();
}

function getUsername()
{
    return "Maria";
}

function logout()
{
    //  Close modal
    $('#logoutModal').foundation('reveal', 'close');
    
    //  Logout
    loggedIn = false;

    //  Hide logout button
    $('#li_login').toggle();
    $('#li_user').toggle();

    //  Display alert and set up alert close timer.
    $('#logoutAlertSuccess').slideDown().delay(1000).slideUp();
}


//
//  SEARCH FOR SUBREDDITS
//

function autofill(query)
{
    //  Prevent string termination
    query = $('#search_subreddit').val();
    query = query.replace("'",'"');

    $.getJSON('http://www.reddit.com/reddits/search.json?q=%27+'+query+'+%27&limit='+AUTOFILL_LIMIT, function(data){
        //if(data == null) return;
        var results = data.data.children;

        console.log('Query: "'+query+'"');
        for(var i = 0; i < results.length; i++)
        {
            console.log('  '+results[i].data.display_name);
        }
    });
}