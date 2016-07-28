var fs = require('fs')
var path = require('path')
var pkg = require(path.join(process.cwd(), 'package.json'))
var merge = require('lodash.merge')
var gitCommit = require('git-rev-sync');
var gitRemote = require('remote-origin-url');

module.exports = function(extra) {
    var manifest = merge({
        name: pkg.name,
        version: pkg.version,
        timestamp: new Date().toISOString(),
        scm: {
            remote: gitRemote.sync(),
            branch: gitCommit.branch(),
            commit: gitCommit.long()
        }
    }, extra)
    fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
}