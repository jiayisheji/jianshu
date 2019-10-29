module.exports = {
  name: 'web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/web',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
