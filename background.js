/*
  Bookmark Commander by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

// Called when the user clicks on the icon.
chrome.browserAction.onClicked.addListener(function(tab)
{
  chrome.tabs.create( { 'url' : chrome.extension.getURL( 'd.reader.html' ) } );
});
