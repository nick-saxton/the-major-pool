module.exports = {
  getEntryTotal(entry, tournament) {
    return entry[tournament].reduce((acc, current) => {
      return acc + current.score;
    }, 0);
  }
}
