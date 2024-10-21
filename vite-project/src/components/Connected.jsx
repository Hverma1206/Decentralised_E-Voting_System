import PropTypes from "prop-types";
const ConnectedAccount=({account})=>{
    return(
       <>
          <p>Connected Account: {account}</p>
       </>
    )
   }
   ConnectedAccount.propTypes = {
    account: PropTypes.node.isRequired,
  };
   export default ConnectedAccount;