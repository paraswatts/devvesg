import { ZodIssue } from 'zod';
import { ServerError } from './server-error';

export class FormValidationError extends ServerError {
  issues: ZodIssue[] = [];

  constructor(message: string, issues: ZodIssue[]) {
    super(message);
    Object.setPrototypeOf(this, FormValidationError.prototype);
    this.issues = issues;
  }

  response() {
    return {
      status: 422,
      message: this.message,
      issues: this.issuesWithStringPaths,
    };
  }

  /**
   * Convert zod issue path, which is an array of strings and numbers,
   * to a plain string path in a similar style to lodash.get/
   *
   * [ 'a', 1, 'b' ] becomes 'a[1].b`
   */
  private get issuesWithStringPaths() {
    return this.issues.map((issue) => {
      return {
        ...issue,
        path: issue.path.reduce<string>((fullPath, segment) => {
          if (typeof segment === 'number') {
            segment = `[${segment}]`;
          } else if (fullPath.length > 0) {
            segment = `.${segment}`;
          }
          return fullPath + segment;
        }, ''),
      };
    });
  }
}
