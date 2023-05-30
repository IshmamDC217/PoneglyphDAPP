// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract VotingSystem {
    // Structure to represent a candidate
    struct Candidate {
        uint id;            // Unique ID of the candidate
        string name;        // Name of the candidate
        uint voteCount;     // Number of votes received by the candidate
    }

    // Mapping to store candidates, with the candidate ID as the key
    mapping(uint => Candidate) public candidates;

    // Total number of candidates
    uint public candidatesCount;

    // Event to broadcast the occurrence of a vote
    event Vote(uint indexed candidateId);

    // Constructor function that is executed when the contract is deployed
    constructor() {
        // Initialize the contract with two default candidates
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    // Function to add a new candidate
    function addCandidate(string memory _name) public {
        candidatesCount++;                                      // Increment the candidates count
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);    // Create a new candidate and store it in the mapping
    }

    // Function to cast a vote for a candidate
    function vote(uint _candidateId) public {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");   // Validate the candidate ID
        candidates[_candidateId].voteCount++;            // Increment the vote count for the candidate
        emit Vote(_candidateId);                         // Emit the Vote event to indicate a vote has been cast
    }
}
