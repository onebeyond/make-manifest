# make-manifest
Generates a manfiest.json similar to...
```
{
  "name": "make-manifest",
  "version": "0.1.0",
  "timestamp": "2016-07-05T00:21:41.308Z",
  "scm": {
    "remote": "git@github.com:guidesmiths/make-manifest.git",
    "branch": "master",
    "commit": "98d5460ad979b1b0300c6cf9fee4799abddf0ab6"
  }
}
```
### Why?
It's good practice to ship some basic information about your application build in case you need to rebuild or debug it from source. It can also be useful to guarantee at least one new layer if you're deploying your application within a docker image. Copying a freshly generated manifest in the last step of your Dockerfile will achieve this.

### Usage
```
  Usage: make-manifest [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -x --extra [string]  colon separated key value pair
```
### Example
```
./bin/make-manifest --extra "build.url: $CIRCLE_BUILD_URL" --extra "build.number: $CIRCLE_BUILD_NUM"
{
  "name": "make-manifest",
  "version": "0.1.0",
  "timestamp": "2016-07-05T00:21:41.308Z",
  "scm": {
    "remote": "git@github.com:guidesmiths/make-manifest.git",
    "branch": "master",
    "commit": "98d5460ad979b1b0300c6cf9fee4799abddf0ab6"
  },
  "build": {
    "url": "https://circleci.com/gh/guidesmiths/make-manifest/48",
    "number": "48"
  }
}
```
