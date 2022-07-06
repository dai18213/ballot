import web3 from './web3';
const address = '0x66c86c691Dd0AfB4eB5F0FF095c30f0cacA6f5a8';
const abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'winner',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'itemId',
				type: 'uint256',
			},
		],
		name: 'Winner',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_itemId',
				type: 'uint256',
			},
		],
		name: 'bid',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'declareWinners',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'destroyContract',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'reset',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'setNewOwner',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		stateMutability: 'payable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'amIWinner',
		outputs: [
			{
				internalType: 'address[]',
				name: '',
				type: 'address[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'beneficiary',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'closedLottery',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getIfLotteryClosed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
		],
		name: 'getPersonDetails',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'items',
		outputs: [
			{
				internalType: 'uint256',
				name: 'itemId',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'reveal',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'winners',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];
export default new web3.eth.Contract(abi, address);
