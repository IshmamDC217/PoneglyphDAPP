// Replace this with your contract's ABI
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            }
        ],
        "name": "Vote",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "candidatesTotal",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];  
const contractAddress = '0x7f35F0B3525E4d99B97CFD3c4435713F63a9E09D';

window.addEventListener('load', async () => {
    // Modern dapp browsers
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    }
    // Legacy dapp browsers
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const votingSystem = new web3.eth.Contract(contractABI, contractAddress);

    // Update UI with total number of candidates
    const totalCandidates = await votingSystem.methods.candidatesTotal().call();
    for (let i = 1; i <= totalCandidates; i++) {
        const candidate = await votingSystem.methods.candidates(i).call();
        $('#candidatesList').append(`<p>ID: ${candidate.id} - Name: ${candidate.name} - Votes: ${candidate.voteCount}</p>`);
    }

    // Add Candidate
    $('#addCandidateForm').submit(async (e) => {
        e.preventDefault();
        const candidateName = $('#candidateName').val();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        await votingSystem.methods.addCandidate(candidateName).send({ from: accounts[0] });
    });

    // Vote for Candidate
    $('#voteForm').submit(async (e) => {
        e.preventDefault();
        const candidateId = $('#candidateId').val();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        await votingSystem.methods.vote(candidateId).send({ from: accounts[0] });
    });
});
