import React from 'react';


class SearchBar extends React.Component {

	constructor(props){
		super(props);
		this.state = { term : ''};
	}

	render(){
		return (
			<div className="search-bar">
				<input value={this.state.term} onChange={this.onChangeInput.bind(this)}/>
			</div>
		);
	}

	onChangeInput(e){
		this.setState({ term : e.target.value });
		this.props.onSearchTermChange(e.target.value);
	}

}


export default SearchBar;
