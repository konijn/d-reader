/*
  D.Reader by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

feeds = [];

function dumpFeeds( feeds , indent )
{
  console.log( indent + feeds[0] );
  indent = indent + "  ";
  for( var i = 1 ; i < feeds.length ; i++ )
  {
    if( feeds[i].length )
      dumpFeeds( feeds[i] , indent );
    else
    	console.log( indent + feeds[i].text );
  }
}


function log()
{
  //Allow for global log kill switch
  for( var i = 0 ; i < arguments.length ; i++ )
  	console.log( arguments[i] );
}

function readFile( f )
{
  var reader = new FileReader();
  reader.onload = parseFile;
  reader.readAsText( f );
}



function loadFeeds()
{
	chrome.storage.local.get('feeds', function(items) {
    if (items.feeds)
    {
        console.log( items.feeds );

    }
    else{
    	feeds = [ { text : "All feeds" , uid : UUID.generate() } ];
    }
  });

}

function createElement( feed )
{
	return $('<div id="feeds"><i class="icon-chevron-right"></i> All Feeds (0)</div>')[];
}


function buildFeeds( feeds , parent )
{
	//Validate parent
	parent = parent || $("#feeds")[0];
	//Get indentation level
	//Loop over the nodes
  for( var i = 0 ; i < feeds.length ; i++ )


}

function createNode( xml , parent)
{
  var node, titleNode;
  if( xml.childElementCount )
  {
  	titleNode = {};
  	titleNode.text = xml.attributes.getNamedItem('text').value;

  	node = [ titleNode ];
  }
  else
  {
  	node = {};
  	node.text = xml.attributes.getNamedItem('text').value;
  	node.type = xml.attributes.getNamedItem('type').value;
  	node.xmlUrl = xml.attributes.getNamedItem('xmlUrl').value;;
  	node.htmlUrl = xml.attributes.getNamedItem('htmlUrl').value;
  }
  parent.push( node );
  return node;
}

function findNode( text , parent )
{
  for( var i = 1 ; i < parent.length ; i++ )
  {
  	var node = parent[i];
    if( node.length && node[0] == text )
    	return node;
    if( !node.length && node.text == text )
    	return node;
  }
}

function folderify( node , parent )
{
  for( var i = 0 ; i < parent.length ; i++ )
    if( parent[i] === node )
    {
    	return ( parent[i] = [ node.text ] );
    }
}

function addNodes( nodes , parent )
{
  for( var i = 0 ; i < nodes.length ; i++ )
  {
  	//console.log( "Looking at" , nodes[i].title )
  	var node = findNode( nodes[i].text , parent ) || createNode( nodes[i] , parent );
  	if( nodes[i].childElementCount )
  	{
  		if( !node.length )
  			node = folderify( node , parent );
      addNodes( nodes[i].children , node );
    }
  }
}


function parseFile( e )
{
  xml = $(this.result);
  var outlines = xml.children("outline");
  var body = xml.find("opml")[0];
  addNodes( outlines , feeds );
}

$(function()
{
  $("#xml").change( function(e)
  {
    var fileList = this.files;
    if( fileList.length == 1 )
      return readFile( fileList[0] );
    alert("Please select 1 file only.");
  });

  $(window).resize(function(e) {
    onResize();
  });

  function onResize()
  {
    var h = $(window).height();
    $("#left").height(h);
    $("#right").height(h);
  }
  //Go for it
  onResize();
  //Dont ask, development is pressing F12 now
  loadFeeds();
  buildFeeds();
});

