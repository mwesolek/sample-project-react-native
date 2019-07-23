const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');

const config = require('../package.json').detox;

jest.setTimeout(60000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
});

beforeEach(async () => {
  await adapter.beforeEach();
  await device.launchApp({
    permissions: { location: 'always', notifications: 'YES', calendar: 'YES' },
    newInstance: true,
  });
  await device.setURLBlacklist([
    '.*optimizely.*',
    '.*smetrics.*',
    '.*branch\\.io.*',
    '.*xtify.*',
    '.*apple\\.com.*',
    '.*msdk\\.freshchat\\.com.*',
  ]);
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
