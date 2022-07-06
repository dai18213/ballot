import React from 'react';
import { Button, Card } from 'react-bootstrap';
import web3 from '../web3';
import abi from '../abi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CardItem({ id, title, image, item, owner }) {
	const onClickHandler = async (event) => {
		event.preventDefault();
		try {
			const accounts = await web3.eth.getAccounts();
			await abi.methods
				.bid(id)
				.send({
					from: accounts[0],
					value: web3.utils.toWei('0.01', 'ether'),
				})
				.then((a) => {
					console.log(a);
					toast(`Bid for item with id ${id}`);
				});
		} catch (err) {
			toast(err);
		}
	};

	return (
		<Card className="d-flex">
			<Card.Header>
				<b> {title}</b>
			</Card.Header>
			<Card.Body>
				<blockquote className="blockquote mb-0">
					<p>
						<img
							style={{
								objectFit: 'contain',
								height: '100px',
								width: '100%',
							}}
							src={image}
						/>
					</p>
					<div className="d-flex align-items-center justify-content-between">
						<Button
							disabled={owner}
							onClick={onClickHandler}
							variant="outline-secondary"
							style={{ width: '100px', marginTop: '10px' }}
						>
							Bid
						</Button>
						<h3 style={{ marginTop: '5px' }}>{item?.toString()}</h3>
					</div>
				</blockquote>
			</Card.Body>
			<ToastContainer position="top-center" />
		</Card>
	);
}

export default CardItem;
