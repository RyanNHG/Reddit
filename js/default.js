$(document).ready(function(){
	
	if(window.location.hash.length < 2)
	{
		getRedditPosts('all');		
	}
	else getRedditPosts(window.location.hash.substring(1));
	$('#subredditField').keypress(function(e) {
    if(e.which == 13) {
      event.preventDefault();
			window.location.hash = '#'+ $('#subredditField').val();
			getRedditPosts($('#subredditField').val());
			$('#subredditField').val('');
      return false;
    }
});
});

function getRedditPosts(subreddit)
{
		$('#contentRow').fadeOut(function () {
			$('#contentRow').html('');
			
			$.getJSON('http://api.reddit.com/r/'+subreddit+'.json', function(data){
				console.log(data);
				
				var posts = data.data.children;
				console.log(posts);
				
				$.each(posts, function(i, post){
					var data = post.data;
					var title = data.title;
					var author = data.author;
					var subreddit = data.subreddit;
					var isSelf = data.is_self;
					var url = data.url;
					var topCommentAuthor = "Coming soon";
					var topCommentText = "Top comments!";
					
					addPanel(title, author, subreddit, isSelf, url, topCommentAuthor, topCommentText);
					
				});
				
				$('#contentRow').append(
					'<div class="col-xs-12">'+
						'<button class="btn btn-primary btn-lg btn-block" id="btnMore">More</button>'+
					'</div>'
				);
				
				$('#contentRow').fadeIn();
				
			});
		});
	

}

function addPanel(title, author, subreddit, isSelf, url, topCommentAuthor, topCommentText)
{
	var imageUrl, imageString;
	
	if(isSelf)
	{
		imageUrl = "";
		imageString = "";
	}
	else if(url.indexOf('imgur') > -1)
	{
		if(url.indexOf('gif') > -1)
		{
			imageUrl = url;
			imageString = '<video src="'+imageUrl+'">';
		}
		else
		{
			imageUrl = url+'.png';
			imageString = '<img src="'+imageUrl+'">';
		}
	}
	else
	{
		imageUrl = url;
		imageString = '<img src="'+imageUrl+'">';
	}
	
	$('#contentRow').append(
				'<div class="col-xs-12">'+
					'<div class="panel panel-default">'+
						
							'<div class="panel-heading">'+
								'<div class="row">'+
									'<div class="col-xs-2">'+
										'<button type="button" class="btn btn-default btn-block">'+
										  '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>'+
										'</button>'+
										'<button type="button" class="btn btn-default btn-block">'+
										  '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>'+
										'</button>'+
									'</div>'+
									'<a role="button" class="heading-link">'+
										'<div class="col-xs-10">'+
											'<h4>'+title+'</h4>'+
											'<p>'+author+' (on r/'+subreddit+')</p>'+
										'</div>'+
									'</a>'+
								'</div>'+
							'</div>'+
						
						'<a role="button" class="body-link" href="'+url+'">'+
							'<div class="panel-body">'+
								imageString+
							'</div>'+
						'</a>'+
						
						'<a role="button" class="footer-link">'+
							'<div class="panel-footer">'+
								'<div class="row">'+
									'<div class="col-xs-9">'+
										'<h5><strong>'+topCommentAuthor+'</strong> - '+topCommentText+'</h5>'+
									'</div>'+
									'<div class="col-xs-3">'+
										  '<span class="glyphicon glyphicon-comment btn btn-default pull-right" aria-hidden="true"></span>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</a>'+
						
					'</div>'+
				'</div>'
	);
}