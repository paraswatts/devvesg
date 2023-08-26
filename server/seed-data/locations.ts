import { SeedData } from './interface';

export interface SeedLocation {
  country: string;
  province: string;
}

export const LOCATIONS: SeedData<SeedLocation> = {
  USA_GA: {
    data: {
      country: 'United States',
      province: 'Georgia',
    },
  },
};
