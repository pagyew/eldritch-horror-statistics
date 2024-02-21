export const games: IGame[] = [{
  id: '1',
  date: '2020-01-01',
  ancient: 'Azatot',
  players: 4,
  expansions: [],
  investigators: [],
  rules: {
    mythos: {
      easy: true,
      normal: true,
      hard: true
    }
  },
  result: {
    winner: false,
    solvedMysteries: 1,
    time: 4*60*60*1000,
    reason: 'No reason'
  }
}, {
  id: '2',
  date: '2020-01-02',
  ancient: 'Syzygy',
  players: 5,
  expansions: [],
  investigators: [],
  rules: {
    mythos: {
      easy: true,
      normal: true,
      hard: true
    }
  },
  result: {
    winner: true,
    solvedMysteries: 3,
    time: 3*60*60*1000,
    scoring: [{
      title: 'Mystery 1',
      score: 10
    }, {
      title: 'Mystery 2',
      score: 20
    }]
  }
}]
