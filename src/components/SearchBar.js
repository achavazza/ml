import React, { Component } from "react";

import PropTypes from "prop-types";


import logo from "../assets/Logo_ML.png";
import icSearch from "../assets/ic_Search.png";

export class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: this.props.searchString,
		};
		//this.handleSubmit = this.handleSubmit.bind(this);
		//this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		categories: PropTypes.arrayOf(PropTypes.string),
		price: PropTypes.func,
		currency: PropTypes.string,
		amount: PropTypes.number,
		decimals: PropTypes.number,
		condition: PropTypes.string,
		picture: PropTypes.string,
		free_shipping: PropTypes.bool,
	};

	handleChange = (e) => {
		this.setState({ searchString: e.target.value });
	};

	componentDidMount() {
		const { search } = window.location;
		const searchString = new URLSearchParams(search).get("search");
		this.setState({ searchString: searchString });
	}

	render() {
		return (
			<div className="header">
				<div className="container">
					<div className="searchBar">
						<a href="/">
							<img id="logo" alt="ML" src={logo} />
						</a>
						<form action="/items" method="get" className="searchForm">
							<input
								type="text"
								name="search"
								defaultValue={this.state.searchString}
								placeholder="Nunca dejes de buscar"
							/>
							<button type="submit">
								<img src={icSearch} alt="Buscar" />
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchBar;
