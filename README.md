## **Coderbano**

---

## Commit Guideline

Commit message has the following pattern: `--[verb]:[changes performed]`
Verb can be any of the following:

* init
* update
* fix
* refactor
* log
* removed

> Sample commit messages

* First commit after setting up a repo: --init: initial setup
* After adding new changes: --update: added db connections
* After making any fix: --fix: DB pool connection instetad of normal connection
* After removing anything: --removed: redis was no longer required for todo app
* When you moved a repeting code-block as util function: --refactor: new util to validate array payload for todos
* After adding logs for debug: --log: added debudding logs inside update todo controller

## Steps to get started:


1. Create .env file. Run command `touch .env`
2. Add `PORT=3000` and `MONGO_URI=YOUR_MONGO_DB_PATH` in .env
3. Run `npm i`
4. Run `npm start`
5. To run client, use `./run.sh`