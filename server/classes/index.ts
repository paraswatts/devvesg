export type UnwrappedEntity<T> = Omit<
  T,
  'toJSON' | 'init' | 'toPOJO' | 'isInitialized' | 'populated' | 'assign' | 'toReference' | 'toObject' | 'signMedia'
>;
