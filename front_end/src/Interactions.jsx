import { ethers } from "ethers";

const Interactions = ({ contract }) => {
  const transferHandler = async (e) => {
    e.preventDefault();
    let nameOfProp = e.target.nameOfProp.value;

    let txt3 = await contract.registerProposal(nameOfProp);
  };

  const registerVoterJsx = async (e) => {
    e.preventDefault()
    let txt2 = await contract.registerVoter();
  };

  const vote = async (e) => {
    e.preventDefault();
    let voteNum = e.target.voteNum.value;
    let txt1 = await contract.vote(voteNum);
  };

  const restart = async (e) => {
    e.preventDefault()
    let restartNum = e.target.restartNum.value;
    let txt = await contract.restartVoting(restartNum);
  }

  return (
    <div>
      <form onSubmit={transferHandler}>
        <input type="text" id="nameOfProp" />
        <button type="submit">RegisterProposal</button>
      </form>
      <br />
      <form onSubmit={registerVoterJsx}>
        <button type="submit">Register Voter</button>
      </form>
      <br />
      <form onSubmit={vote}>
        <input type="text" id="voteNum" />
        <button type="submit">Vote</button>
      </form>
      <br />
      <form onSubmit={restart}>
          <input type="text" id="restartNum" />
          <button type="submit">Restart Voting</button>
      </form>
    </div>
  );
};

export default Interactions;

// 1. registerProposal()
// 2. registerVoter()
// 3. vote()
// 4. declareWinner()
// 5. restartVoting()
