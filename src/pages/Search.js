import React, { Component } from 'react'
import PropTypes from "prop-types";

import { ItemCard } from "../components/ItemCard";

const itemsFound = [];

export class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//seachString: "",
			items: [],
			//error: "",
		};
	}
    
	static propTypes = {
        author: PropTypes.objectOf({
            name: PropTypes.string,
			lastname: PropTypes.string,
		}),
		categories: PropTypes.arrayOf(PropTypes.string),
		items: PropTypes.arrayOf({
            id: PropTypes.string,
			title: PropTypes.string,
			price: PropTypes.objectOf({
                amount: PropTypes.number,
                currency: PropTypes.string,
                decimals: PropTypes.number,
			}),
			picture: PropTypes.string,
			condition: PropTypes.string,
			free_shipping: PropTypes.bool,
		}),
		
	};
	

	triggerSearch = async (searchString) => {
		//let { searchString } = this.state;

		/* tenia algunos problemas con espacios "Apple Ipod" => 'apple+ipod'*/
		/* lo comento porque ahora lo hace el browser */
		//searchString = searchString.toLowerCase().replace(" ", "+");

		/* ...visualizando solo 4 productos ... */
		const limit = "&limit=4";
		const api_url = `https://api.mercadolibre.com/sites/MLA/search?q=${searchString}${limit}`;
		await fetch(api_url)
			.then((res) => res.json())
			.then((results) => {
				results.results.forEach((result) => {

					//console.log(result.prices);
					itemsFound.push({
						id: result.id,
						title: result.title,
						price: {
                            amount: result.price,
                            currency: result.currency_id ? "$" : "",
                            decimals: 2,
                        },
						picture: result.thumbnail,
						free_shipping: result.shipping.free_shipping,
						condition: result.condition === "new" ? "Nuevo" : "Usado",
					});
				});
				this.setState({ items: itemsFound });
				console.log("resultados:", this.state.items);

			})
			.catch((error) => {
				console.log("error:", error);
			});
	};

	renderResults() {
		const { items } = this.state;

		return items.map((item, i) => {
			return (
				<ItemCard
					key={item.id}
					id={item.id}
					title={item.title}
					price={item.price}
					amount={item.amount}
					currency={item.currency}
					decimals={item.decimals}
					picture={item.picture}
					free_shipping={item.free_shipping}
					condition={item.condition}
				/>
			);
		});
	}
	componentDidMount() {
		//const searchString = this.state.seachString;
		const { search } = window.location;
		const searchString = new URLSearchParams(search).get("search");

		console.log("searchString:", searchString);
		this.triggerSearch(searchString);
	}

	render() {
		return (
			<div>
				<section className="main">
					<div className="container">
						{this.state.items.length ? (
							<div className="content">{this.renderResults()}</div>
						) : (
							<div className="content">
								<span className="noresults">No encontramos resultados</span>
							</div>
						)}
					</div>
				</section>
			</div>
		);
	}
}

export default Search
