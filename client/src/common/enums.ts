export enum QuestionType {
    TEXT = 1,
    NUMBER = 2,
    RADIO = 3,
    MULTI_SELECT = 4,
    MULTI_SELECT_DROPDOWN = 5
}

export enum ScoreType {
    NO_SCORE = 1,
    OPTION_SCORE = 2,
    PERCENTAGE = 3,
    OPTIONS_TOTAL_PERCENTAGE = 4
}

export enum QuizStatus {
    NOT_STARTED = 'not_started',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export enum QuizStatusText {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
}