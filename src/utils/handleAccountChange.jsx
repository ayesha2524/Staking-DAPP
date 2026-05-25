export const handleAccountChange = (setState) => {
  return (accounts) => {
    console.log("Accounts changed", accounts[0])
    setState(prev => ({
      ...prev,
      account: accounts[0]
    }));
  };
};