import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from 'semantic-ui-react';
import { contractABI, contractAddress } from './votingsystem';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  // Connect to the Ethereum network and initialize the contract
  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        await window.ethereum.enable(); // Request user's permission to connect MetaMask account
        const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethereumProvider);

        const signer = ethereumProvider.getSigner();
        const network = await ethereumProvider.getNetwork();

        const votingSystemContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(votingSystemContract);
      } else {
        console.error('Ethereum provider not found. Please install MetaMask.');
      }
    }

    init();
  }, []);

  // Fetch and update candidate information from the contract
  useEffect(() => {
    async function fetchCandidates() {
      if (contract) {
        // TODO: Fetch candidates data from the contract
        // const candidateData = await contract...
        // const candidates = candidateData.map(data => ({
        //   id: data.id.toNumber(),
        //   name: data.name,
        //   voteCount: data.voteCount.toNumber(),
        // }));
        // setCandidates(candidates);
      }
    }

    fetchCandidates();
  }, [contract]);

  // Handle candidate submission
  async function handleSubmitCandidate(event) {
    event.preventDefault();
    const candidateName = event.target.elements.candidateName.value;

    // TODO: Add logic to submit candidate to the contract

    event.target.reset();
  }

  // Handle vote submission
  async function handleSubmitVote(event) {
    event.preventDefault();
    const candidateId = parseInt(event.target.elements.candidateId.value);

    // TODO: Add logic to submit vote to the contract

    event.target.reset();
  }

  return (
    <section className='mainpage'>
      <div className="container glasscontainer mx-auto max-w-lg mt-10 px-4 py-6 bg-white rounded shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-4">One Piece Voting System</h1>

        <form id="addCandidateForm" className="mb-4" onSubmit={handleSubmitCandidate}>
          <label htmlFor="candidateName" className="text-lg">Candidate Name:</label><br />
          <input type="text" id="candidateName" name="candidateName" className="mt-2 mb-4 px-4 py-2 border rounded-md" required /><br />
          <input type="submit" value="Add Candidate" className="px-8 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" />
        </form>

        <hr className="mb-4" />

        <form id="voteForm" className="mb-4" onSubmit={handleSubmitVote}>
          <label htmlFor="candidateId" className="text-lg">Candidate ID:</label><br />
          <input type="number" id="candidateId" name="candidateId" className="mt-2 mb-4 px-4 py-2 border rounded-md" required /><br />
          <input type="submit" value="Vote"
            className="px-8 py-2 text-white bg-green-500 rounded hover:bg-green-600" />
        </form>
        <div id="candidatesList" className="mt-6">
          {candidates.map(candidate => (
            <div key={candidate.id}>
              <h2 className="text-lg font-bold">{candidate.name}</h2>
              <p>Vote Count: {candidate.voteCount}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
