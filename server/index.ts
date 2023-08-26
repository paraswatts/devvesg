if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import './tracer'; // must come before importing any instrumented module.

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityManager, EntityRepository, PostgreSqlDriver } from '@mikro-orm/postgresql';
import passport from 'passport';
import path from 'path';
import morgan from 'morgan';
import { logger, httpLogStream } from './logger';
import { typeDefs, resolvers } from './gql/schema';
import i18n from './i18n';

import {
  Client,
  RequirementDocument,
  Initiative,
  Partner,
  Project,
  ProjectType,
  Requirement,
  RequirementType,
  Service,
  User,
  EmailEvent,
  Vertical,
  CarbonFootprint,
  Quiz,
  QuizInstance,
  QuizInstanceAnswer,
  QuizQuestion,
  QuizQuestionOption,
  QuizScoreType,
} from './entities';
import { AdminRouter } from './controllers/admin';
import {
  AuthController,
  ClientController,
  CreditTypeController,
  InitiativeController,
  NftTypeController,
  PartnerController,
  ServiceController,
  TestController,
  UserController,
  VerticalController,
  QuizController
} from './controllers';
import { applyPassportStrategy } from './config/passport';
import { ClientLocation } from './entities/client-location.entity';
import { EmailController, snsContentTypeConverter } from './controllers/email.controller';
import { errorMiddleware } from './errors';
import { ClientType } from './entities/client-type.entity';
import { ClientTypeController } from './controllers/client-type.controller';
import { formatError } from './gql/utils';
import { Wallet } from './entities/wallet.entity';
import { Nft } from './entities/nft.entity';
import { NftType } from './entities/nft-type.entity';
import { NftController } from './controllers/admin/nft.controller';
import { CreditType } from './entities/credit-type.entity';
import { WalletController } from './controllers/admin/wallet.controller';

export const DI = {} as {
  clientRepo: EntityRepository<Client>;
  emailEventRepo: EntityRepository<EmailEvent>;
  em: EntityManager;
  initiativeRepo: EntityRepository<Initiative>;
  orm: MikroORM<PostgreSqlDriver>;
  partnerRepo: EntityRepository<Partner>;
  projectRepo: EntityRepository<Project>;
  projectTypeRepo: EntityRepository<ProjectType>;
  requirementDocumentRepo: EntityRepository<RequirementDocument>;
  requirementRepo: EntityRepository<Requirement>;
  requirementTypeRepo: EntityRepository<RequirementType>;
  serviceRepo: EntityRepository<Service>;
  userRepo: EntityRepository<User>;
  clientLocationRepo: EntityRepository<ClientLocation>;
  verticalRepo: EntityRepository<Vertical>;
  clientTypeRepo: EntityRepository<ClientType>;
  walletRepo: EntityRepository<Wallet>;
  nftRepo: EntityRepository<Nft>;
  nftTypeRepo: EntityRepository<NftType>;
  carbonFootprintRepo: EntityRepository<CarbonFootprint>;
  creditTypeRepo: EntityRepository<CreditType>;
  quizRepo: EntityRepository<Quiz>;
  quizInstanceRepo: EntityRepository<QuizInstance>;
  quizQuestionRepo: EntityRepository<QuizQuestion>;
  quizAnswerRepo: EntityRepository<QuizInstanceAnswer>;
  quizQuestionOptionRepo: EntityRepository<QuizQuestionOption>;
  quizScoreTypeRepo: EntityRepository<QuizScoreType>;
};

export const app = express();
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream: httpLogStream }));
const port = process.env.PORT || 5000;

export const server = init();

async function init() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;

  DI.clientRepo = DI.orm.em.getRepository(Client);
  DI.emailEventRepo = DI.orm.em.getRepository(EmailEvent);
  DI.initiativeRepo = DI.orm.em.getRepository(Initiative);
  DI.partnerRepo = DI.orm.em.getRepository(Partner);
  DI.projectRepo = DI.orm.em.getRepository(Project);
  DI.projectTypeRepo = DI.orm.em.getRepository(ProjectType);
  DI.requirementDocumentRepo = DI.orm.em.getRepository(RequirementDocument);
  DI.requirementRepo = DI.orm.em.getRepository(Requirement);
  DI.requirementTypeRepo = DI.orm.em.getRepository(RequirementType);
  DI.serviceRepo = DI.orm.em.getRepository(Service);
  DI.userRepo = DI.orm.em.getRepository(User);
  DI.clientLocationRepo = DI.orm.em.getRepository(ClientLocation);
  DI.verticalRepo = DI.orm.em.getRepository(Vertical);
  DI.clientTypeRepo = DI.orm.em.getRepository(ClientType);
  DI.walletRepo = DI.orm.em.getRepository(Wallet);
  DI.nftRepo = DI.orm.em.getRepository(Nft);
  DI.nftTypeRepo = DI.orm.em.getRepository(NftType);
  DI.carbonFootprintRepo = DI.orm.em.getRepository(CarbonFootprint);
  DI.creditTypeRepo = DI.orm.em.getRepository(CreditType);
  DI.quizRepo = DI.orm.em.getRepository(Quiz);
  DI.quizInstanceRepo = DI.orm.em.getRepository(QuizInstance);
  DI.quizAnswerRepo = DI.orm.em.getRepository(QuizInstanceAnswer);
  DI.quizQuestionRepo = DI.orm.em.getRepository(QuizQuestion);
  DI.quizQuestionOptionRepo = DI.orm.em.getRepository(QuizQuestionOption);
  DI.quizScoreTypeRepo = DI.orm.em.getRepository(QuizScoreType);

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: ({ req, res }) => {
      return {
        user: req.user,
        em: DI.orm.em.fork(),
      };
    },
  });

  app.use(cors());
  i18n();
  app.use(snsContentTypeConverter);
  app.use(express.json({ limit: '25mb' }));

  app.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (user) {
        req.user = user;
      }

      next();
    })(req, res, next);
  });

  applyPassportStrategy(passport);
  await gqlServer.start();
  gqlServer.applyMiddleware({ app });
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use('/api/auth', AuthController);
  app.use('/api/email', EmailController);
  app.use('/api/test', TestController);
  app.use('/api/admin', AdminRouter);
  app.use('/api/service', ServiceController);
  app.use('/api/clients', ClientController);
  app.use('/api/partners', PartnerController);
  app.use('/api/users', UserController);
  app.use('/api/verticals', VerticalController);
  app.use('/api/initiatives', InitiativeController);
  app.use('/api/client-types', ClientTypeController);
  app.use('/api/nft', NftController);
  app.use('/api/nft-types', NftTypeController);
  app.use('/api/credit-types', CreditTypeController);
  app.use('/api/wallet', WalletController);
  app.use('/api/quiz', QuizController);

  app.use(errorMiddleware);

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  return app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
    logger.info(`GraphQL on http://localhost:${port}${gqlServer.graphqlPath}`);
    app.emit('app-start');
  });
}
