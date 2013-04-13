/*
  D.Reader by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

var storage = {

	dump : function()
	{
		chrome.storage.local.get('feeds', function(items)
		{
			console.log( items.feeds );
		});
	},

	load : function()
	{
		chrome.storage.local.get('feeds', function(items)
		{
			_feeds = items.feeds ? 	items.feeds : [ { text : "All feeds" , id : 'feeds' , createdOn : Date.now() } ];
			buildFeeds( log( _feeds ) );
		});
	},

	store : function( feeds )
	{
		chrome.storage.local.set( { feeds : feeds } );
	},

	clearFeeds : function()
	{
		chrome.storage.local.remove( 'feeds' );
  }
}





