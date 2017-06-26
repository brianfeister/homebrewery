const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const request = require('superagent');
const Moment = require('moment');


const BrewLookup = React.createClass({
	getDefaultProps: function() {
		return {
			adminKey : '',
			homebrews: []
		};
	},
	getInitialState: function() {
		return {
			query:'',
			resultBrew : null,
			searching : false
		};
	},

	handleChange : function(e){
		this.setState({
			query : e.target.value
		})
	},
	lookup : function(){
		this.setState({ searching : true });

		request.get(`/admin/lookup/${this.state.query}`)
			.query({ admin_key : this.props.adminKey })
			.end((err, res) => {
				this.setState({
					searching : false,
					resultBrew : (err ? null : res.body)
				});
			})
	},

	renderFoundBrew : function(){
		if(this.state.searching) return <div className='searching'><i className='fa fa-spin fa-spinner' /></div>;
		if(!this.state.resultBrew) return <div className='noBrew'>No brew found.</div>;

		const brew = this.state.resultBrew;
		return <div className='brewRow'>
			<div>{brew.title}</div>
			<div>{brew.authors.join(', ')}</div>
			<div><a href={'/edit/' + brew.editId} target='_blank'>/edit/{brew.editId}</a></div>
			<div><a href={'/share/' + brew.shareId} target='_blank'>/share/{brew.shareId}</a></div>
			<div>{Moment(brew.updatedAt).fromNow()}</div>
			<div>{brew.views}</div>
		</div>
	},

	render: function(){
		return (
			<ul>
			{ this.props.homebrews.map(function(brew){
	            return <li key={ JSON.stringify( brew )}> <div className='brewRow'>
				<div className='title'>Title: <strong> {brew.title} </strong></div>
				<div>Authors: <strong> {brew.authors.join(', ')} </strong> </div>
				<div>Edit Link: <strong> <a href={'/edit/' + brew.editId} target='_blank'>/edit/{brew.editId} </a> </strong></div>
				<div>Preview Link: <strong> <a href={'/share/' + brew.shareId} target='_blank'>/share/{brew.shareId}</a> </strong></div>
				<div>Last Updated: <strong> {Moment(brew.updatedAt).fromNow()} </strong> </div>
				</div>
				</li>
	        }) }
	        </ul>
		)
	}
});

module.exports = BrewLookup;
