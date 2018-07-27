import os from 'os';
import R from 'ramda';
import database from './../utils/database';

const rejectNil = R.reject(R.isNil);
const isProd = process.env.NODE_ENV === 'production';

function check (req, res) {
  const info = rejectNil({
    environment: process.env.NODE_ENV,
    branch: !isProd ? process.env.BREWDOCS_BRANCH : null,
    tag: isProd ? process.env.BREWDOCS_TAG : null,
    uptime: `${os.uptime()}`,
    usage: `${Math.round((os.freemem() / os.totalmem()) * 100, 2)}%`,
    workers: process.env.CLUSTER_SPAWN_COUNT
  });

  database.raw('select 1;')
    .then(() => res.status(200).json(info));
}

export default {
  check
};
