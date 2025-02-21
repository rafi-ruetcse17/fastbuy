## Node package

```
$ npm i pg
```

## Version compatibility

node-postgres strives to be compatible with all recent LTS versions of node & the most recent "stable" version. At the time of this writing node-postgres is compatible with node 8.x, 10.x, 12.x and 14.x To use node >= 14.x you will need to install pg@8.2.x or later due to some internal stream changes on the node 14 branch. Dropping support for an old node lts version will always be considered a breaking change in node-postgres and will be done on major version number changes only, and we will try to keep support for 8.x for as long as reasonably possible.
