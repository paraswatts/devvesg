import { SeedData } from './interface';

export interface SeedQuizQuestionOptions {
  name: string;
  description: string;
  score: number;
  isOther?: boolean;
  isNegative?: boolean;
  hasNumberInput?: boolean
}

export const QUIZ_QUESTION_OPTIONS_LONG: SeedData<SeedQuizQuestionOptions> = {
  ENVIRONMENT_QUESTION_1_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_1_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_2_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_2_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_3_OPTION_1: {
    data: {
      name: 'Zero',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_3_OPTION_2: {
    data: {
      name: '>0',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_4_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_4_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_4_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_4_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_4_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_4_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_6_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_6_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_7_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_7_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_8_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_8_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_8_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_8_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_8_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_8_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_9_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_9_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_10_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_10_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_133_OPTION_1: {
    data: {
      name: 'For revenue',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_133_OPTION_2: {
    data: {
      name: 'For expenditures',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_133_OPTION_3: {
    data: {
      name: 'For assets and liabilities',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_133_OPTION_4: {
    data: {
      name: 'For capital and financing',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_11_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1,
    },
  },
  ENVIRONMENT_QUESTION_11_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_12_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1,
    },
  },
  ENVIRONMENT_QUESTION_12_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_13_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1,
    },
  },
  ENVIRONMENT_QUESTION_13_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_14_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1,
    },
  },
  ENVIRONMENT_QUESTION_14_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_134_OPTION_1: {
    data: {
      name: 'For revenue',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_134_OPTION_2: {
    data: {
      name: 'For expenditures',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_134_OPTION_3: {
    data: {
      name: 'For assets and liabilities',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_134_OPTION_4: {
    data: {
      name: 'For capital and financing',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_135_OPTION_1: {
    data: {
      name: 'Through revenue',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_135_OPTION_2: {
    data: {
      name: 'Through expenditures',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_135_OPTION_3: {
    data: {
      name: 'Through assets and liabilities',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_135_OPTION_4: {
    data: {
      name: 'Through capital and financing',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_136_OPTION_1: {
    data: {
      name: 'For revenue',
      description: '',
      score: 0.25
    },
  },
  ENVIRONMENT_QUESTION_136_OPTION_2: {
    data: {
      name: 'For expenditures',
      description: '',
      score: 0.25
    },
  },
  ENVIRONMENT_QUESTION_136_OPTION_3: {
    data: {
      name: 'For assets and liabilities',
      description: '',
      score: 0.25
    },
  },
  ENVIRONMENT_QUESTION_136_OPTION_4: {
    data: {
      name: 'For capital and financing',
      description: '',
      score: 0.25
    },
  },
  ENVIRONMENT_QUESTION_15_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_15_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_16_OPTION_1: {
    data: {
      name: 'Yes - all',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_16_OPTION_2: {
    data: {
      name: 'Yes some (>50%)',
      description: '',
      score: 0.75
    },
  },
  ENVIRONMENT_QUESTION_16_OPTION_3: {
    data: {
      name: 'Yes some (<50%)',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_16_OPTION_4: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_17_OPTION_1: {
    data: {
      name: 'Solar, WindCombined Heat and Power, Hydro, Geothermal, Biomass',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_17_OPTION_2: {
    data: {
      name: 'Coal, Natural Gas, Oil, Propane, Other Fossil Fuel',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_18_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_18_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_18_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_18_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_18_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_18_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_19_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_19_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_19_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_19_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_19_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_19_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_20_OPTION_1: {
    data: {
      name: '<1',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_20_OPTION_2: {
    data: {
      name: '0.5',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_20_OPTION_3: {
    data: {
      name: '>1',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_21_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_21_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_21_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_21_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_21_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_21_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_22_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_22_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_23_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_23_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_24_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_24_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_25_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_25_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_26_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_26_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_27_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_27_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_28_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_28_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_29_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_29_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_30_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_30_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_31_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 2
    },
  },
  ENVIRONMENT_QUESTION_31_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_32_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 3
    },
  },
  ENVIRONMENT_QUESTION_32_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 2
    },
  },
  ENVIRONMENT_QUESTION_33_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 4
    },
  },
  ENVIRONMENT_QUESTION_33_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 3
    },
  },
  ENVIRONMENT_QUESTION_35_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_35_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_35_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_35_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_35_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_35_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_36_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_36_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_37_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_37_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_38_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_38_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_39_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_39_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_40_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_40_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_40_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_40_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_40_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_40_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_41_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_41_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_42_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_42_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_43_OPTION_1: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_43_OPTION_2: {
    data: {
      name: '50-90%',
      description: '',
      score: 0.75
    },
  },
  ENVIRONMENT_QUESTION_43_OPTION_3: {
    data: {
      name: '10-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_43_OPTION_4: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_44_OPTION_1: {
    data: {
      name: 'Bike parking',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_44_OPTION_2: {
    data: {
      name: 'Public Transportation',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_44_OPTION_3: {
    data: {
      name: 'Carpool',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_44_OPTION_4: {
    data: {
      name: 'EV Charging',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_44_OPTION_5: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  ENVIRONMENT_QUESTION_45_OPTION_1: {
    data: {
      name: 'Electric bus/transport',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_45_OPTION_2: {
    data: {
      name: 'Conventional gas bus',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_46_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_46_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_48_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_48_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_1: {
    data: {
      name: 'Plastic',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_2: {
    data: {
      name: 'Toxic',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_3: {
    data: {
      name: 'Paper',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_4: {
    data: {
      name: 'Glass',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_5: {
    data: {
      name: 'Metal',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_6: {
    data: {
      name: 'Wood',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_7: {
    data: {
      name: 'Rubber',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_49_OPTION_8: {
    data: {
      name: 'Other',
      description: '',
      score: 1,
      isOther: true
    },
  },
  ENVIRONMENT_QUESTION_50_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_50_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_51_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_51_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  ENVIRONMENT_QUESTION_51_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  ENVIRONMENT_QUESTION_51_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  ENVIRONMENT_QUESTION_51_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  ENVIRONMENT_QUESTION_51_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_52_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_52_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_54_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_54_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_55_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_55_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_56_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_56_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_57_OPTION_1: {
    data: {
      name: 'Green Water',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_57_OPTION_2: {
    data: {
      name: 'Grey Water',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_57_OPTION_3: {
    data: {
      name: 'Blue Water',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_57_OPTION_4: {
    data: {
      name: 'Total Water',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_57_OPTION_5: {
    data: {
      name: 'None',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_QUESTION_58_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1,
      hasNumberInput: true
    },
  },
  ENVIRONMENT_QUESTION_58_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
      hasNumberInput: true
    },
  },
  ENVIRONMENT_QUESTION_61_OPTION_1: {
    data: {
      name: 'Decreased >10%',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_61_OPTION_2: {
    data: {
      name: 'Decreased <10%',
      description: '',
      score: 0.75,
    },
  },
  ENVIRONMENT_QUESTION_61_OPTION_3: {
    data: {
      name: 'Same as Last Year',
      description: '',
      score: 0.25
    },
  },
  ENVIRONMENT_QUESTION_61_OPTION_4: {
    data: {
      name: 'Increased',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_63_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_63_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  ENVIRONMENT_QUESTION_65_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENT_QUESTION_65_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_67_OPTION_1: {
    data: {
      name: 'Regularly scheduled and reoccuring contributions',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_67_OPTION_2: {
    data: {
      name: 'Occassional, non-regular contributions',
      description: '',
      score: 0.5,
    },
  },
  SOCIAL_QUESTION_67_OPTION_3: {
    data: {
      name: 'No contributions',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_68_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_68_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_69_OPTION_1: {
    data: {
      name: 'Regularly scheduled (once a quarter or more) with leadership',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_69_OPTION_2: {
    data: {
      name: 'Occassional, not regularly schedule or less then once a quarter',
      description: '',
      score: 0.5,
    },
  },
  SOCIAL_QUESTION_69_OPTION_3: {
    data: {
      name: 'No town hall meetings or employee stakeholder meetings with leadership',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_70_OPTION_1: {
    data: {
      name: 'Regularly scheduled (once a quarter or more) with leadership',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_70_OPTION_2: {
    data: {
      name: 'Occassional, not regularly schedule or less then once a quarter',
      description: '',
      score: 0.5,
    },
  },
  SOCIAL_QUESTION_70_OPTION_3: {
    data: {
      name: 'No town hall meetings or community stakeholder meetings with leadership',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_75_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_75_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_76_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_76_OPTION_2: {
    data: {
      name: '10-20%',
      description: '',
      score: 0.25
    },
  },
  SOCIAL_QUESTION_76_OPTION_3: {
    data: {
      name: '20-30%',
      description: '',
      score: 0.5
    },
  },
  SOCIAL_QUESTION_76_OPTION_4: {
    data: {
      name: '30-40%',
      description: '',
      score: 0.75
    },
  },
  SOCIAL_QUESTION_76_OPTION_5: {
    data: {
      name: '>40%',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_77_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_77_OPTION_2: {
    data: {
      name: '10-25%',
      description: '',
      score: 0.25
    },
  },
  SOCIAL_QUESTION_77_OPTION_3: {
    data: {
      name: '25-40%',
      description: '',
      score: 0.5
    },
  },
  SOCIAL_QUESTION_77_OPTION_4: {
    data: {
      name: '40-50%',
      description: '',
      score: 0.75
    },
  },
  SOCIAL_QUESTION_77_OPTION_5: {
    data: {
      name: '>50%',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_78_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_78_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },

  SOCIAL_QUESTION_79_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_79_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_80_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_80_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_81_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_81_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_82_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_82_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_83_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_83_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_84_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_84_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_85_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_85_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_86_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_86_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_87_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_87_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_89_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_89_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_90_OPTION_1: {
    data: {
      name: 'Zero',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_90_OPTION_2: {
    data: {
      name: '>0',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_91_OPTION_1: {
    data: {
      name: 'Reducing TRIR',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_91_OPTION_2: {
    data: {
      name: 'Constant TRIR',
      description: '',
      score: 0.5,
    },
  },
  SOCIAL_QUESTION_91_OPTION_3: {
    data: {
      name: 'Increasing TRIR',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_92_OPTION_1: {
    data: {
      name: 'Zero',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_92_OPTION_2: {
    data: {
      name: '<3.4 (US national average)',
      description: '',
      score: 0.5,
    },
  },
  SOCIAL_QUESTION_92_OPTION_3: {
    data: {
      name: '>3.4 (US national average)',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_93_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_93_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_94_OPTION_1: {
    data: {
      name: '<20%',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_94_OPTION_2: {
    data: {
      name: '20-40%',
      description: '',
      score: 0.5,
    },
  },
  SOCIAL_QUESTION_94_OPTION_3: {
    data: {
      name: '>40%',
      description: '',
      score: 1,
    },
  },
  SOCIAL_QUESTION_95_OPTION_1: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  SOCIAL_QUESTION_95_OPTION_2: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  SOCIAL_QUESTION_95_OPTION_3: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  SOCIAL_QUESTION_95_OPTION_4: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  SOCIAL_QUESTION_95_OPTION_5: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  SOCIAL_QUESTION_95_OPTION_6: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_96_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_96_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_97_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_97_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  SOCIAL_QUESTION_98_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SOCIAL_QUESTION_98_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_99_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_99_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_100_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_100_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_101_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_101_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_102_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_102_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_103_OPTION_1: {
    data: {
      name: 'Every meeting, Monthly, Quarterly',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_103_OPTION_2: {
    data: {
      name: 'Twice a Year',
      description: '',
      score: 0.75,
    },
  },
  GOVERNANCE_QUESTION_103_OPTION_3: {
    data: {
      name: 'Once a Year',
      description: '',
      score: 0.5,
    },
  },
  GOVERNANCE_QUESTION_103_OPTION_4: {
    data: {
      name: 'Never',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_104_OPTION_1: {
    data: {
      name: 'Twice a Year or More Frequently',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_104_OPTION_2: {
    data: {
      name: 'Annually',
      description: '',
      score: 0.75,
    },
  },
  GOVERNANCE_QUESTION_104_OPTION_3: {
    data: {
      name: 'Less frequently than once a year but every couple of years',
      description: '',
      score: 0.5,
    },
  },
  GOVERNANCE_QUESTION_104_OPTION_4: {
    data: {
      name: 'Not more frequently then every couple of years',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_105_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_105_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_107_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_107_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_108_OPTION_1: {
    data: {
      name: 'Annually or more frequently',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_108_OPTION_2: {
    data: {
      name: 'Every couple of years',
      description: '',
      score: 0.5,
    },
  },
  GOVERNANCE_QUESTION_108_OPTION_3: {
    data: {
      name: 'Never',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_109_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_109_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_110_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_110_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_111_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_111_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_112_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_112_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_113_OPTION_1: {
    data: {
      name: 'Board, CEO, President',
      description: '',
      score: 1
    }
  },
  GOVERNANCE_QUESTION_113_OPTION_2: {
    data: {
      name: 'VP',
      description: '',
      score: 0.75
    }
  },
  GOVERNANCE_QUESTION_113_OPTION_3: {
    data: {
      name: 'Director',
      description: '',
      score: 0.5
    }
  },
  GOVERNANCE_QUESTION_113_OPTION_4: {
    data: {
      name: 'Manager',
      description: '',
      score: 0.25
    }
  },
  GOVERNANCE_QUESTION_114_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_114_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_115_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_115_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_116_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_116_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_117_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_117_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_118_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_118_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_119_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_119_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_120_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_120_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_122_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_122_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_123_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_123_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_124_OPTION_1: {
    data: {
      name: 'Annually or more frequently',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_124_OPTION_2: {
    data: {
      name: 'Every couple of years',
      description: '',
      score: 0.5,
    },
  },
  GOVERNANCE_QUESTION_124_OPTION_3: {
    data: {
      name: 'Never',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_1: {
    data: {
      name: 'Energy data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_2: {
    data: {
      name: 'Greenhouse Gas Emissions data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_3: {
    data: {
      name: 'Carbon offset data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_4: {
    data: {
      name: 'Water data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_5: {
    data: {
      name: '  Waste data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_6: {
    data: {
      name: 'Recylcing data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_7: {
    data: {
      name: 'Building data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_8: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_125_OPTION_9: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_1: {
    data: {
      name: 'Energy data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_2: {
    data: {
      name: 'Greenhouse Gas Emissions data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_3: {
    data: {
      name: 'Carbon offset data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_4: {
    data: {
      name: 'Water data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_5: {
    data: {
      name: '  Waste data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_6: {
    data: {
      name: 'Recylcing data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_7: {
    data: {
      name: 'Building data',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_8: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_126_OPTION_9: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  GOVERNANCE_QUESTION_127_OPTION_1: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_127_OPTION_2: {
    data: {
      name: 'Board, executive, and manager diversity',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_127_OPTION_3: {
    data: {
      name: 'Supplier diversity',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_127_OPTION_4: {
    data: {
      name: 'Local supplier',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_127_OPTION_5: {
    data: {
      name: 'Community engagement',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_128_OPTION_1: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_128_OPTION_2: {
    data: {
      name: 'Board, executive, and manager diversity',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_128_OPTION_3: {
    data: {
      name: 'Supplier diversity',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_128_OPTION_4: {
    data: {
      name: 'Local supplier',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_128_OPTION_5: {
    data: {
      name: 'Community engagement',
      description: '',
      score: 0
    },
  },
  GOVERNANCE_QUESTION_129_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_129_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_130_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_130_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_131_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_131_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
  GOVERNANCE_QUESTION_132_OPTION_1: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  GOVERNANCE_QUESTION_132_OPTION_2: {
    data: {
      name: 'No',
      description: '',
      score: 0,
    },
  },
};
