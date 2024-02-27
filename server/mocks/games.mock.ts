export const MOCK_GAMES: IGame[] = [{
  id: '1',
  date: '2020-01-01',
  ancient: ANCIENT.AZATHOTH,
  players: 4,
  expansions: [],
  investigators: [],
  rules: {
    startingRumors: false,
    mythos: {
      easy: true,
      normal: true,
      hard: true
    }
  },
  result: {
    winner: false,
    solvedMysteries: 1,
    time: 4 * 60 * 60 * 1000,
    reason: REASON.SURRENDER
  }
}, {
  id: '2',
  date: '2020-01-02',
  ancient: ANCIENT.SYZYGY,
  players: 5,
  expansions: [EXPANSION.STRANGE_REMNANTS],
  investigators: [],
  rules: {
    startingRumors: true,
    mythos: {
      easy: true,
      normal: true,
      hard: true
    }
  },
  result: {
    winner: true,
    solvedMysteries: 3,
    time: 3 * 60 * 60 * 1000,
    scoring: {
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
