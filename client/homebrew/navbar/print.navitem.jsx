var React = require('react');
var Nav = require('naturalcrit/nav/nav.jsx');

module.exports = function(props){
	return <Nav.item newTab={true} href={'/print/' + props.shareId +'?dialog=true' + ( (props.startPage) ? '&start_pg=' + props.startPage : '' ) } color='purple' icon='fa-file-pdf-o'>
		get PDF
	</Nav.item>
};
