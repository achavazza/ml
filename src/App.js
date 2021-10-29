import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import SearchBar from "./components/SearchBar";

//import Home from "./pages/Home";
import Search from "./pages/Search";
import Product from "./pages/Product";

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//error: "",
		};
	}
	
	render() {
		//console.log(this.state)
		//const searchString = this.state.seachString;
		return (
			<div className="App">
				<SearchBar />
				<Router>
					<Route exact path="/items" component={Search}  />
					<Route path="/items/:id" component={Product} />
				</Router>
			</div>
		);
	}
}

export default App;
