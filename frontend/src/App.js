import React, { Component } from 'react';
import './App.css';
import CardItem from './Components/CardItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import web3 from './web3';
import abi from './abi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	state = {
		beneficiary: '',
		currentAccount: '',
		balance: '',
		accounts: '',
		newOwner: '',
		winners: '',
		items: [],
	};

	async componentDidMount() {
		const currentAccount = await web3.eth.getAccounts();
		const beneficiary = await abi.methods.beneficiary().call();
		const balance = await web3.eth.getBalance(abi.options.address);
		const accounts = await web3.eth.getAccounts();
		this.setState({ currentAccount, beneficiary, balance, accounts });

		if (window.ethereum) {
			window.ethereum.on('chainChanged', () => {
				window.location.reload();
			});
			window.ethereum.on('accountsChanged', () => {
				window.location.reload();
			});
		}
	}

	revealHandler = async () => {
		const items = await abi.methods.reveal().call();
		this.setState({ items });
	};
	withdrawHandler = async () => {
		try {
			await abi.methods.withdraw().send({
				from: this.state.accounts[0],
			});
			window.location.reload();
		} catch (err) {
			toast(err);
		}
	};
	destroyContractHandler = async () => {
		try {
			await abi.methods
				.destroyContract()
				.send({
					from: this.state.accounts[0],
				})
				.then(() => {
					window.location.reload();
				});
		} catch (err) {
			toast(err);
		}
	};
	declareWinnersHandler = async () => {
		try {
			await abi.methods
				.declareWinners()
				.send({
					from: this.state.accounts[0],
				})
				.then(() => {
					window.location.reload();
				});
		} catch (err) {
			toast(err);
		}
	};
	setNewOwnerHandler = async (e) => {
		e.preventDefault();
		try {
			await abi.methods
				.setNewOwner(this.state.newOwner)
				.send({
					from: this.state.accounts[0],
				})
				.then(() => {
					window.location.reload();
				});
		} catch (err) {
			toast(err);
		}
	};
	resetHandler = async () => {
		try {
			await abi.methods
				.reset()
				.send({
					from: this.state.accounts[0],
				})
				.then(() => {
					toast('Reset succedeed');
				});
		} catch (err) {
			toast(err);
		}
	};
	amIWinnerHander = async () => {
		const winners = await abi.methods.amIWinner().call();
		this.setState({ winners });
	};
	render() {
		return (
			<Container fluid={true} className="app py-5">
				<span>
					Balance contact:{' '}
					{this.state.balance &&
						web3.utils.fromWei(this.state.balance, 'ether')}
				</span>
				<h1 className="text-center">Lottery - Ballot</h1>
				<Row className="m-5" md={3} xs={1}>
					{cards.map((card, index) => {
						const { title, image } = card;
						return (
							<Col key={index} className="my-2 ">
								<CardItem
									owner={
										this.state.currentAccount === this.state.beneficiary
											? true
											: false
									}
									title={title}
									id={index}
									image={image}
									item={this.state.items && this.state.items?.[index]}
								/>
							</Col>
						);
					})}
				</Row>

				<Row>
					{this.state.accounts[0] === this.state.beneficiary ? (
						<Col>
							<div className="d-flex flex-column justify-content-center align-items-center">
								<p>Owner's account : {this.state.beneficiary}</p>
								<p>
									Current account :{' '}
									{this.state.currentAccount && this.state.currentAccount}
								</p>
								<Button
									onClick={this.withdrawHandler}
									className="my-2"
									variant="outline-success"
									style={{ width: '400px' }}
								>
									Withdraw
								</Button>
								<Button
									onClick={this.declareWinnersHandler}
									className="my-2"
									variant="outline-success"
									style={{ width: '400px' }}
								>
									Declare Winner
								</Button>
								<Form
									onSubmit={this.setNewOwnerHandler}
									className="d-flex align-items-center my-2"
									style={{ width: '400px', gap: '5px' }}
								>
									<Button
										variant="outline-success"
										type="submit"
										style={{ width: '50%' }}
									>
										New Onwer
									</Button>
									<Form.Group controlId="formBasicEmail">
										<Form.Control
											required
											type="text"
											placeholder="Enter new address"
											onChange={(e) =>
												this.setState({ newOwner: e.target.value })
											}
										/>
									</Form.Group>
								</Form>
								<Button
									onClick={this.destroyContractHandler}
									className="my-2"
									variant="outline-danger"
									style={{ width: '400px' }}
								>
									Destroy Contract
								</Button>

								<Button
									onClick={this.resetHandler}
									className="my-2"
									variant="outline-danger"
									style={{ width: '400px' }}
								>
									Reset
								</Button>
							</div>
						</Col>
					) : (
						<Col>
							<div className="d-flex flex-column justify-content-center align-items-center">
								<p>Owner's account : {this.state.beneficiary}</p>
								<p>
									Current account :{' '}
									{this.state.currentAccount && this.state.currentAccount}
								</p>
								<Button
									onClick={this.revealHandler}
									className="my-2"
									variant="outline-primary"
									style={{ width: '400px' }}
								>
									Reveal
								</Button>
								<div>
									<Button
										onClick={this.amIWinnerHander}
										className="my-2"
										variant="outline-primary"
										style={{ width: '400px' }}
									>
										Am i winner
									</Button>
									{this.state.winners &&
										this.state.winners.map((item, index) => {
											return (
												<p key={index}>
													{item === this.state.accounts[0]
														? `I won the item with id ${index}`
														: '0'}
												</p>
											);
										})}
								</div>
							</div>
						</Col>
					)}
				</Row>
				<ToastContainer position="top-center" />
			</Container>
		);
	}
}

export default App;

const cards = [
	{
		title: 'Car',
		image:
			'https://www.pngall.com/wp-content/uploads/2016/05/Ferrari-Download-PNG.png',
	},
	{
		title: 'Phone',
		image:
			'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
	},
	{
		title: 'Computer',
		image:
			'http://atlas-content-cdn.pixelsquid.com/stock-images/apple-macbook-pro-16-inch-grey-laptop-L81OqD9-600.jpg',
	},
];
