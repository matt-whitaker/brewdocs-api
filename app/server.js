import os from 'os';
import cluster from 'cluster';
import app from './app';

if (process.env.CLUSTER) {
  const defaultSpawnCount = process.env.NODE_ENV === 'production' ? os.cpus().length : 1;
  const spawnCount = process.env.SPAWN_COUNT || defaultSpawnCount;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is starting...`);

    for (let i = 0; i < spawnCount; i++) {
      cluster.fork({ CLUSTER_SPAWN_COUNT: spawnCount });
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with ${code}, replacing...`);
      cluster.fork();
    });
  } else {
    console.log(`Worker ${process.pid} is starting...`);

    app.create();
  }
} else {
  app.create();
}
