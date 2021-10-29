import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import icFree from "../assets/ic_shipping.png";

export class ItemCard extends Component {
	static propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		price: PropTypes.number,
		amount: PropTypes.number,
		currency: PropTypes.string,
		decimals: PropTypes.number,
		picture: PropTypes.string,
		free_shipping: PropTypes.bool,
		condition: PropTypes.string,
	};
	render() {
		const { id, title, picture, currency, amount, free_shipping } = this.props;
		//const { id, title, picture, currency, amount, decimals, free_shipping, condition, } = this.props;
		const free_img = free_shipping ? (
			<img src={icFree} alt="Envío Gratis" />
		) : (
			""
		);

		//console.log(free_img)
		//console.log(free_shipping)
		return (
			<Link to={`/items/${id}`} className="itemCard" title={title}>
				<div className="itemThumb">
					<img src={picture} alt={title} />
				</div>
				<div className="desc">
					<div className="price">
						<span>
							{`${currency} ${amount}`} {free_img}
						</span>
					</div>
					<div>
						<h2 className="title">{title}</h2>
					</div>
				</div>
			</Link>
		);
	}
}

export default ItemCard;
