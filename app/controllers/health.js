import os from 'os';
import R from 'ramda';

const rejectNil = R.reject(R.isNil);

import database from './../utils/database';

function check (req, res, next) {
    const info = rejectNil({
        environment: process.env.NODE_ENV,
        pid: process.env.NODE_ENV === 'production' ? null : process.pid
    });

    database.raw('select 1;')
        .then(() => res.status(200).json(info));
}

export default {
    check
};