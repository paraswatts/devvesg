import { Collection } from '@mikro-orm/core';
import { ApprovalStatuses } from '../enums';
import { Service } from '../entities';
import { SeedData } from './interface';

export interface SeedPartner {
  name: string;
  description: string;
  logo: string;
  contactEmail: string;
  contactPhoneNumber: string;
  twitterUrl?: string;
  facebookUrl?: string;
  linkedInUrl?: string;
  websiteUrl: string;
  seedId?: string;
  approvalStatus: ApprovalStatuses;
  services?: Collection<Service>;
  [key: string]: string | Collection<Service>;
}

export const PARTNERS: SeedData<SeedPartner> = {
  LED_GREENLIGHT: {
    data: {
      name: 'LED Greenlight',
      description:
        'At LED Green Light International (“LEDGLI”), our goal is to produce the finest quality LED Lighting Products available anywhere … as close as possible to natural Sunlight on a clear ‘blue-sky’ day !!',
      logo: 'anything',
      contactEmail: 'info@ledgreenlightint.com',
      contactPhoneNumber: '559-550-1020',
      websiteUrl: 'https://www.ledgreenlightint.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  ABM: {
    data: {
      name: 'ABM',
      description:
        'For thousands of clients across the U.S. and in more than 20 international locations, ABM is a source of reliable people and services that improve the spaces and places that matter most.',
      logo: 'anything',
      contactEmail: 'info@abm.com',
      contactPhoneNumber: '866-202-0164',
      websiteUrl: 'https://www.abm.com',
      facebookUrl: 'https://www.facebook.com/ABMIndustries',
      twitterUrl: 'https://twitter.com/ABM_Industries',
      linkedInUrl: 'https://www.linkedin.com/company/162238',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  DEVVESG_CARBON_STREAMING: {
    data: {
      name: 'DevvESG Carbon Streaming',
      description:
        'We at DevvESG Streaming believe that all solutions necessary to reverse climate change exist in the world today. We help enable these solutions by using carbon credits to invest in them. Contact us if you have a sustainability project that needs a kick start.',
      logo: 'anything',
      contactEmail: 'sales@devvesg.stream',
      contactPhoneNumber: '818-636-3462',
      websiteUrl: 'https://www.devvesg.stream',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  CHITENDAI: {
    data: {
      name: 'Chitendai',
      description:
        'Chitendai Ltd is a Scottish renewable energy company that combines advanced solar and microelectronic technologies to develop SMART solar installations. This increases power system efficiency, reliability, sustainability and stability',
      logo: 'anything',
      contactEmail: 'info@chitendailtd.co.uk',
      contactPhoneNumber: '',
      websiteUrl: 'https://chitendailtd.co.uk',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  HAYSTACK: {
    data: {
      name: 'Haystack',
      description:
        'To support growers and global carbon markets with tools for high-accuracy, cost-effective soil carbon measurement.',
      logo: 'anything',
      contactEmail: 'hello@haystackag.com',
      contactPhoneNumber: '',
      websiteUrl: 'https://www.haystackag.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  NCX: {
    data: {
      name: 'NCX',
      description:
        'NCX connects corporations to the landowners, habitats, and communities they impact through our carbon marketplace. By drawing on our years of precision forest management, we enable net-zero pioneers to purchase carbon credits with immediate, verifiable impact and landowners to quantify the full value of their forests.',
      logo: 'anything',
      contactEmail: 'info@ncx.com',
      contactPhoneNumber: '',
      websiteUrl: 'https://ncx.com',
      facebookUrl: 'https://www.facebook.com/NCXcarbon',
      twitterUrl: 'https://twitter.com/ncx',
      linkedInUrl: 'https://www.linkedin.com/company/ncx-carbon/',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  VOLTPOST: {
    data: {
      name: 'Voltpost',
      description: 'Decarbonizing city mobility',
      logo: 'anything',
      contactEmail: 'info@voltpost.com',
      contactPhoneNumber: '',
      websiteUrl: 'https://www.voltpost.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  'COLUMBIA_CARBON_EXCHANGE_(GCS)': {
    data: {
      name: 'Columbia Carbon Exchange (GCS)',
      description:
        'GCS is a professional services firm helping customers of all types and sizes design, architect, build, migrate, and manage their ArcGIS workloads, applications, and data on Amazon Web Services (AWS), Microsoft Azure, and ArcGIS Online.',
      logo: 'anything',
      contactEmail: 'info@yourdatasmarter.com',
      contactPhoneNumber: '406-747-8393',
      websiteUrl: 'https://gcs.yourdatasmarter.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  'OCEANS_INTEGRITY_(RIO)': {
    data: {
      name: 'Oceans Integrity (RIO)',
      description:
        'Restoring Integrity to the Oceans, Inc. is a diverse group intent on eliminating the plague of plastics from our ocean through reclamation, recycling, and education. ',
      logo: 'anything',
      contactEmail: 'kkelly@oceansintegrity.com',
      contactPhoneNumber: '',
      websiteUrl: 'https://oceansintegrity.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  LOCOAL: {
    data: {
      name: 'LoCoal',
      description:
        'INNOVATE CIRCULAR TECHNOLOGIES FOR THE HUMAN WORLD THAT PRODUCE SUSTAINABLE BENEFITS FOR THE NATURAL WORLD.',
      logo: 'anything',
      contactEmail: 'hello@locoal.com',
      contactPhoneNumber: '1-844-4LOCOAL',
      websiteUrl: 'https://www.locoal.com',
      facebookUrl: 'https://www.facebook.com/LocoalLife',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  GENESIS_SYSTEMS: {
    data: {
      name: 'Genesis Systems',
      description: 'Generating fresh-water from air using integrated technologies never before conceived.',
      logo: 'anything',
      contactEmail: 'info@genesissystems.global',
      contactPhoneNumber: '',
      websiteUrl: 'https://genesissystems.global',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  FLOWASTE: {
    data: {
      name: 'Flowaste',
      description: 'Learn how FloWaste’s innovative solutions can lower your food and labor costs.',
      logo: 'anything',
      contactEmail: 'rian@flowaste.com',
      contactPhoneNumber: '',
      websiteUrl: 'https://www.flowaste.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  CONFLUENCE_ANALYTICS: {
    data: {
      name: 'Confluence Analytics',
      description:
        'Confluence is a fintech firm specializing in environmental / social / governance (“ESG”) data analytics and investment strategies. We merge fundamental and quantitative techniques into software-driven, systematic processes that generate predictive performance metrics — along with other valuable, material insights — and produce model, as well as customizable, index investment strategies. Simply put, Confluence offers investors what they need to find an edge and improve results. ',
      logo: 'anything',
      contactEmail: 'info@confluenceanalytics.com',
      contactPhoneNumber: '412-471-1875',
      websiteUrl: 'https://www.confluenceanalytics.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  CLEAR_RATING: {
    data: {
      name: 'Clear Rating',
      description:
        "Clear Rating specializes in private company valuations, digital securities ratings, and ESG impact assessments. Our firm's mission is simple. Provide clarity to a complex world. Our team of experts navigate the intellectual frontiers of finance, on the edge of understanding. Areas unexplored by most and understood by few are where we find ourselves most at home as we seek to demystify the opaque, illuminate the truth, and facilitate trust through transparency.",
      logo: 'anything',
      contactEmail: 'office@clearrating.com',
      contactPhoneNumber: '713-823-2900',
      websiteUrl: 'https://www.clearrating.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: 'https://www.linkedin.com/company/clear-rating',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  BRIGHT_ACTION: {
    data: {
      name: 'Bright Action',
      description:
        'The BrightAction platform makes it easy to help your team or community take simple, everyday actions and make an impact',
      logo: 'anything',
      contactEmail: 'info@brightaction.com',
      contactPhoneNumber: '',
      websiteUrl: 'https://www.brightaction.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  DANTO_BUILDERS: {
    data: {
      name: 'Danto Builders',
      description:
        'We have completed hundreds of certifications for CPAs, designers and commercial building owners across the country, saving our clients millions of dollars in taxes. Mep has certified hotels, manufacturing facilities, distribution centers, parking garages, schools, universities, courthouses, office buildings, community centers, municipal buildings, warehouses, hospitals, apartment buildings, military facilities, libraries and nursing homes.',
      logo: 'anything',
      contactEmail: 'info@dantobuilders.com',
      contactPhoneNumber: '954-229-2006',
      websiteUrl: 'https://www.dantobuilders.com',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
  CYBERIAL: {
    data: {
      name: 'Cyberial',
      description: '',
      logo: '',
      contactEmail: 'info@dantobuilders.com',
      contactPhoneNumber: 'ddods@cyberial.ca',
      websiteUrl: 'http://www.cyberial.net',
      facebookUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      approvalStatus: ApprovalStatuses.APPROVED,
    },
    relationships: { services: [] },
  },
};
