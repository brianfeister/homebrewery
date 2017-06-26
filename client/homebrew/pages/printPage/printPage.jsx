const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');
const Markdown = require('naturalcrit/markdown.js');

const PrintPage = React.createClass({
	getDefaultProps: function() {
		return {
			query : {},
			brew : {
				text : '',
			}
		};
	},

	getInitialState: function() {
		return {
			brewText: this.props.brew.text
		};
	},

	componentDidMount: function() {
		if(this.props.query.local){
			this.setState({ brewText : localStorage.getItem(this.props.query.local)});
		}

		if(this.props.query.dialog) window.print();
	},

	renderPages : function(){
		return _.map(this.state.brewText.split('\\page'), (page, index) => {
			let startPageVal = (this.props.dataStartPage === undefined) ? 'Missing start_pg=X query param' : index + 1 + parseInt( this.props.dataStartPage, 10 );
			if ( Number.isInteger(startPageVal) && startPageVal < 1 ) {
				startPageVal = '';
			}
			const startPage = {'data-start-page': startPageVal };
			return <div
				className='phb'
				id={`p${index + 1}`}
				{...startPage}
				dangerouslySetInnerHTML={{__html:Markdown.render(page)}}
				key={index} />;
		});
	},

	render : function(){
		return <div>
			{this.renderPages()}
		</div>
	}
});

module.exports = PrintPage;
