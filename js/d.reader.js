/*
  D.Reader by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/
var
_feeds = [],
_config = { indentWidth : 20 };

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
  return arguments[0]; //Poor man chaining
}

function readFile( f )
{
  var reader = new FileReader();
  reader.onload = parseFile;
  reader.readAsText( f );
}

var folderTemplate = _.template('<div class="n" id="<%= id %>"><div><i class="icon-chevron-right"></i><%= text %></div><span id="<%= id %>_unread"> (0)</span></div>');
var feedTemplate = _.template('<div class="n" id="<%= id %>"><div><%= text %></div><span id="<%= id %>_unread"> (0)</span></div>');

function createElement( feed , generation )
{
  generation = generation || 0;
	var e = $( feed.length ? folderTemplate( feed[0] ) : feedTemplate( feed ) );
	var padding = ( generation * _config.indentWidth ) + "px";
	var width = ( 200 - ( generation * _config.indentWidth ) - 20 ) + "px";
	//Dont ask about the maxWidth, it pains me
	e.children().eq(0).css("padding-left" , padding)[0].style.maxWidth = width;
	return e;
}


function buildFeeds( feeds , parent , generation)
{
  //Rebuild the parent, throw out what was there already
	if( !parent )
  {
  	//Replace the pale holder
  	$("#feeds").replaceWith( createElement( feeds ) );
  	//Remove the rest
  	$("#feeds").nextAll().remove()
  	//Point to the parent
  	parent = $("#feeds").parent();
  }
  generation = generation || 1;
	//Loop over the nodes
  for( var i = 1 ; i < feeds.length ; i++ )
  {
  	var hNode = createElement( feeds[i] , generation);
  	parent.append(  hNode );
    if( feeds[i].length )
    	buildFeeds( feeds[i] , parent , generation+1 );
  }
}

function createNode( xml , parent)
{
  var node, titleNode;
  if( xml.childElementCount )
  {
  	titleNode = {};
  	titleNode.text = xml.attributes.getNamedItem('text').value;
  	titleNode.id = UUID.generate();
  	titleNode.createdOn = Date.now();
  	node = [ titleNode ];
  }
  else
  {
  	node = {};
  	node.text = xml.attributes.getNamedItem('text').value;
  	node.type = xml.attributes.getNamedItem('type').value;
  	node.xmlUrl = xml.attributes.getNamedItem('xmlUrl').value;;
  	node.htmlUrl = xml.attributes.getNamedItem('htmlUrl').value;
  	node.id = UUID.generate();
  	node.createdOn = Date.now();
  }
  parent.push( node );
  return node;
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
  	var node = mNodes.findByText( nodes[i].text , parent ) || createNode( nodes[i] , parent );
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
  addNodes( outlines , _feeds );
  buildFeeds( _feeds );
  storage.store( _feeds );
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
  storage.load()
});

