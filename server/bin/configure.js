require('babel-register');
require('babel-polyfill');

const Config = require('../src/Config');
const {Map} = require('immutable');
const config = Config.fromArgv(new Map());
const config_map = config.getData();

const int_params = [
  'graph.application_id',
  'graph.version.0',
  'graph.version.1'
];

function iterateMap(map, mutations = [], path = '') {
  map.forEach((v, k) => {
    const key = (path === '') ? k : path + '.' + k;
    if (v instanceof Object) {
      iterateMap(v, mutations, key);
    } else if (process.env[key]) {
      mutations.push(key);
    }
  });

  return mutations;
}

const mutations = iterateMap(config_map);
const new_config_map = (new Map()).withMutations(
  map => {
    mutations.forEach(mutation => {
      const path = mutation.split('.');
      let value = process.env[mutation];
      if (value === 'true' || value === 'false') {
        value = (value === 'true');
      } else if (int_params.indexOf(mutation) !== -1) {
        value = parseInt(value, 10);
      }
      map.setIn(path, value);
    });
    map.setIn(
      ['server', 'bindings', 'http', 'port'],
      parseInt(process.env.PORT, 10)
    );
  }
);

process.stdout.write(JSON.stringify(new_config_map.toJS(), null, 4));
