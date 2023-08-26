import Handlebars from 'handlebars';

export interface WebappBaseUrlParam {
  webappBaseUrl: string;
}

export interface EmailToParam {
  to: string[];
}

export interface EmailSubjectParam {
  subject: string;
}

export const buildTemplate = <T>(templateFile: Buffer, variables: T) => {
  const template = Handlebars.compile(templateFile.toString('utf8'));
  return template(variables);
};

export const injectWebappBaseUrl = <T>(params: T): T & WebappBaseUrlParam => {
  return { ...params, webappBaseUrl: process.env.WEBAPP_BASE_URL };
};
