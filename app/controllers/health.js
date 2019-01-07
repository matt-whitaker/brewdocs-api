import os from 'os';
import R from 'ramda';
import database from './../utils/database';

const rejectNil = R.reject(R.isNil);
const isProd = process.env.NODE_ENV === 'production';

const controller = {
  check(req, res) {
    database.raw('select 1;')
      .catch(() => false)
      .then((dbStatus) => rejectNil({
        status: dbStatus ? 200 : 503,
        environment: process.env.NODE_ENV,
        branch: !isProd ? process.env.BREWDOCS_BRANCH : null,
        tag: isProd ? process.env.BREWDOCS_TAG : null,
        uptime: `${os.uptime()}`,
        usage: `${Math.round((os.freemem() / os.totalmem()) * 100, 2)}%`,
        workers: process.env.CLUSTER_SPAWN_COUNT
      }))
      .then((info) => res.status(info.status).json(info));
  }
};

export default controller;
