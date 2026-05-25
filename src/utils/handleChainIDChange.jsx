export const handleChainIDChange = (setState) => {
  return (chainId) => {
        console.log("ChainId changed", chainId)
    setState(prev => ({
      ...prev,
      chainID: Number(chainId)
    }));
  };
};