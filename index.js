const fs = require('fs');
const path = require('path');
const gitCommit = require('git-rev-sync');
const gitRemote = require('remote-origin-url');

const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = extra => {
  const { name, version } = pkg;
  let scm = {};

  // Without commits, .git/packed-refs does not exists
  if (fs.existsSync(path.join(process.cwd(), '.git', 'packed-refs'))) {
    scm = {
      remote: gitRemote.sync(),
      branch: gitCommit.branch(),
      commit: gitCommit.long()
    }
  }

  const timestamp = new Date().toISOString();
  const manifest = { name, version, scm, timestamp, ...extra };

  fs.writeFileSync('manifest.json', `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
}
