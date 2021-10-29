import React, { Component } from "react";
import PropTypes from "prop-types";

export class Product extends Component {
	static propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		picture: PropTypes.string,
		condition: PropTypes.string,
		free_shipping: PropTypes.bool,
		sold_quantity: PropTypes.string,
		description: PropTypes.string,
		price: PropTypes.func,
        currency: PropTypes.string,
        amount: PropTypes.number,
        decimals: PropTypes.number,
	};
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			title: "",
			picture: "",
			condition: "",
			free_shipping: false,
			sold_quantity: "",
			description: "",
			price: {
				amount: 0,
				currency: "",
				decimals: 2,
			},
		};
	}
    /* 
	_handleResults = (results) => {
        this.setState({ results });
	};
    */

	fetchItem({ id }) {
		//console.log('thisid: 'id);
		fetch(`https://api.mercadolibre.com/items/${id}`)
			.then((res) => res.json())
			.then((item) => {
				this.setState({
					//item: {
					//item: item,
					title: item.title,
					picture: item.pictures[0].secure_url,
					condition: item.condition === "new" ? "Nuevo" : "Usado",
					free_shipping: item.shipping.free_shipping,
					sold_quantity: item.sold_quantity,
					price: {
						amount: item.price,
						currency: item.currency_id ? "$" : "",
						decimals: 2,
					},
					//},
				});
				console.log('agrego valores', this.state);
				this.fetchDescription(id);
			});
	}
	fetchDescription(id) {
		fetch(`https://api.mercadolibre.com/items/${id}/description`)
			.then((res) => res.json())
			.then((item) => {
				this.setState({
					//item: {
					//	...this.state.item,
					description: item.plain_text,
					//}
				});
                console.log('actualizo la descripcion', this.state);
			});
	}
	componentDidMount() {
		const { id } = this.props.match.params;

		this.fetchItem({ id });
	}

	render() {
		const {
			id,
			picture,
			title,
			free_shipping,
			condition,
			description,
			sold_quantity,
			price,
		} = this.state;

		const { amount, currency } = price;

		return (
			<div>
				<section className="main">
					<div className="container">
						<div className="content">
							<div id={id} className="shortInfo">
								<div className="img">
									<img src={picture} alt={title} />
								</div>
								<div className="desc">
									<div className="meta">
										<span>{condition}</span>
										<span> - </span>
										<span>{`${sold_quantity} vendidos`}</span>
									</div>
									<h2 className="title">{title}</h2>
									<div className="price">
										<span>{`${currency} ${amount}`}</span>
									</div>
									<div>{free_shipping}</div>
									<button className="button">Comprar</button>
								</div>
							</div>
							<div className="description">
								<h4 className="title">Descripción del producto</h4>
								<p>{description}</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Product;
