/*
  D.Reader by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

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

function addNode( node , parent )
{
  


}

function parseFile( e )
{
  var xml = $(this.result);
  var outlines = xml.find("outline");
  var body = xml.find("opml")[0];
  for( var i = 0 ; i < outlines.length ; i++ )
  {
    var outline = outlines[i];
    var parent = outline.parentNode;
    var parent = ( parent === body ? "All feeds" : parent.title );
    console.log( parent , outline.title , outline.childNodes.length  );
  }
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
  
});

