export enum RelationshipTypes {
  projectTypes = 'projectTypes',
  requirementTypes = 'requirementTypes',
  partners = 'partners',
  services = 'services',
  clientLocations = 'clientLocations',
  quiz = 'quiz',
  quizSection = 'sections',
  quizQuestions = 'questions',
  quizQuestionOptions = 'options',
  quizQuestionDependencies = 'dependencies',
  quizQuestionDependent = 'dependentQuestion',
  quizScoreType = 'quizScoreType',
}

export interface SeedData<T> {
  [key: string]: {
    data: T;
    relationships?: {
      [key in RelationshipTypes]?: string[];
    };
  };
}
