# DevvESG

## Requirements

- Node 16.x.x
- Postgres 12+

---

## Backend

All commands should be executed at the root of the repository.

### Before running

Configure environment:

- Copy the `.env.template` file to `.env`.
- Reach out to another team member for all required values.

#### Create a local database:

If creating the database manually:

- Create a new postgres database (eg `devvesg`) and set the database env vars in your `.env` file.

If you would like to use docker:

- Update the `docker-compose.yml` file in the repo to contain the contents below.
- Run `docker-compose up`.
- Do not commit these changes to the project.
- This will create a database accessible on port localhost:5432 with a database name, username,
  and password all set to `devvesg`. Set the database env vars in your `.env` file to these values.

```
version: '3.4'

services:
  db:
    image: postgres
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: devvesg
      POSTGRES_PASSWORD: devvesg
```

Install dependencies:

- `yarn install`

Reset and seed the database:

- `yarn db:reset:local`
- `yarn db:seed`

### Running

Database migrations:

- `yarn db:migrate` to run any new migrations.

Start the server on port 5000:

- `yarn start:local`

If any MikroORM entities are updated, you will need to create a new migration file.

- `yarn db:migrate:create`

---

## Frontend

All commands should be executed in the `client` directory.

### Before running

Configure environment:

- Copy the `.env.template` file to `.env`.
- Reach out to another team member for all required values.

Install dependencies:

- `yarn install`

### Running

Start the server on port 3000:

- `yarn start`

### Testing

- Run `yarn test` to run tests.
- Run `yarn test --coverage --watchAll` to get a coverage report.

---

### Using Localization

We’re using `i18next`(internationalization-framework) & `react-i18next` npm packages for translation.

We can use i18next’s `t()` function to localize our app using the translation resources (`translation.json` file located in `client/public/locales`). `t()` takes a string key, and returns the corresponding string from the active language’s translations.
We access `t()` via react-i18next’s `useTranslation()` react hook. The hook ensures that our components get the `t()` associated with our i18next instance. 

```javascript
import React from "react";
import { useTranslation } from "react-i18next";
// ...

export default function () {
  const { t } = useTranslation();

  return (
    <nav>
      <div className="navbar-brand">
        <a className="navbar-item" href="/">

          <strong>{t("global.devvesg")}</strong>

        </a>
      </div>
    </nav>
  );
}
```
For official documentation and further reading, please refer: [i18next](https://www.i18next.com/)

---

## Code formatting and linting

Prettier configurations are provided for both front and backend projects.
Make sure your editor is configured to auto-format from the configuration files.

---

## Git flow and deployment

When developing features you will always be making pull requests in to dev:

- Branch from `dev` into a new branch
- The branch should be named `feature/feature-detail` or `bugfix/issue-detail`
- Create a pull request with your branch into dev
- When approved, you can merge your pull request, which will delete your branch

To deploy to demo/prod:

- In github, create a pull of dev into demo/prod
- The act of creating this pull request is what deploys to demo/prod, not the merge, so be careful!
- Merge the pull request once the deploy has completed successfully.

---

## Helpful URLs

- [Staging webapp](https://staging.devvesg.com)
- [Staging API](https://api.staging.devvesg.com)
- [Production webapp](https://prod.devvesg.com)
- [Production API](https://api.prod.devvesg.com)

------

## Creating users / logging in

An admin user already exists in the system after seeding the local database. Simply log in with `admin@devv.io` and `P@ssword1`.

To create a client user:

- Navigate to `http://localhost:3000/auth/login`
- Click `Create an Account`
- Click `My organization is not listed` and create your user credentials
- Fill out any generic info you want on the next screen
- After submitting, you will be logged in

To create an partner user:

- Navigate to `http://localhost:3000/auth/login?partner`
- Click `Sign Up`
- Create your user credentials
- On the next screen, click `My organization is not listed` and fill in the form that pops up
- On the next screen, fill in any information you would like about the services your partner provices
- After submitting, you will be logged in, but not yet confirmed
- Log out and log back in as an admin. Click on the `Approvals` navigation item and approve both the user and partner that you just added
- Log out and log back in as a partner and you should be logged in / confirmed
