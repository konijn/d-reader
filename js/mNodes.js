/*
  D.Reader by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com

  The problem that mNodes, hNodes and xNodes address is that reader deals with
  * a model that contains nodes ( mNodes )
  * html nodes to display the feeds ( hNodes )
  * xml nodes from OPML that contain feeds ( xNodes )
*/

mNodes =
{
  findByText : function( text , parent )
  {
  	//Harden
  	parent = parent || _feeds;
  	for( var i = 1 ; i < parent.length ; i++ )
  	{
  		var node = parent[i];
  		if( node.length && node[0] == text )
  			return node;
  		if( node.length )
  			return mNodes.findByText( text , node )
  		if( node.text == text )
  			return node;
  	}
  },

  findmatch : function( node , parent )
  {


  }

}




