export const MOCK_GAMES: IGame[] = [{
  id: '1',
  date: '2020-01-01',
  ancientName: ANCIENT.AZATHOTH,
  playerCount: 4,
  expansionNames: [],
  investigatorNames: [],
  rules: {
    startingRumor: false,
    mythos: [
      'easy',
      'normal',
      'hard'
    ]
  },
  isWin: false,
  results: {
    solvedMysteryCount: 1,
    time: 4 * 60 * 60 * 1000,
    reason: REASON.SURRENDER
  }
}, {
  id: '2',
  date: '2020-01-02',
  ancientName: ANCIENT.SYZYGY,
  playerCount: 5,
  expansionNames: [EXPANSION.STRANGE_REMNANTS],
  investigatorNames: [],
  rules: {
    startingRumor: true,
    mythos: [
      'easy',
      'normal',
      'hard'
    ]
  },
  isWin: true,
  results: {
    solvedMysteryCount: 3,
    time: 3 * 60 * 60 * 1000,
    scores: {
      gates: 10,
      doom: 0,
      blessed: 0,
      monsters: 0,
      cursed: 0,
      rumors: 0,
      clues: 0
    }
  }
}]
