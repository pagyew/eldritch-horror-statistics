declare type ScoreName = Lowercase<keyof typeof SCORE>

declare type IScores = Record<ScoreName, number>
