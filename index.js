const fs = require('fs')
const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))
const gitCommit = require('git-rev-sync');
const gitRemote = require('remote-origin-url');

module.exports = extra => {
    const { name, version } = pkg;
    let scm = {};

    if( fs.existsSync(path.join(process.cwd(), '.git'))){
      scm = {
        remote: gitRemote.sync(),
        branch: gitCommit.branch(),
        commit: gitCommit.long()
      }
    }

    const timestamp = new Date().toISOString();
    const manifest = { name, version, scm, timestamp, ...extra };
    fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
}
