module.exports = {
  name: 'secure',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/secure',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
