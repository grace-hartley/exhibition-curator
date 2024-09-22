export const addToCuratedList = (artwork, curatedList, setCuratedList) => {
  if (!curatedList.some((item) => item.id === artwork.id)) {
    setCuratedList([...curatedList, artwork]);
  }
};

export const removeFromCuratedList = (artwork, curatedList, setCuratedList) => {
  setCuratedList(curatedList.filter((item) => item.id !== artwork.id));
};

export const isInCuratedList = (artwork, curatedList, setCuratedList) =>
  curatedList.some((item) => item.id === artwork.id);
