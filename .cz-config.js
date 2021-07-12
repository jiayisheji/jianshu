const scopeEnum = require('./commit.scope.config');
module.exports = {
  // 自定义types
  types: [
    {
      value: 'feat',
      name: '新增功能',
    },
    {
      value: 'fix',
      name: 'bug修复',
    },
    {
      value: 'docs',
      name: '文档更新',
    },
    {
      value: 'style',
      name: '不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)',
    },
    {
      value: 'refactor',
      name: '重构代码(既没有新增功能，也没有修复bug)',
    },
    {
      value: 'perf',
      name: '改进性能、体验优化的代码更改',
    },
    {
      value: 'test',
      name: '新增测试或更新现有测试用例',
    },
    {
      value: 'build',
      name: '主要目的是修改项目构建系统(例如 glup， webpack， rollup，npm的配置等.xxx) 的提交',
    },
    {
      value: 'ci',
      name: '主要目的是修改项目继续集成流程(例如 Travis， Jenkins， GitLab CI， Circle等) 的提交',
    },
    {
      value: 'chore',
      name: '不属于以上类型的其他类型',
    },
    {
      value: 'merge',
      name: '分支合并 Merge branch ? of ?',
    },
    {
      value: 'revert',
      name: '回滚某个更早之前的提交',
    },
  ],
  // 自定义scopes
  scopes: scopeEnum.map(item => ({ name: item.scope })),

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // override the messages, defaults are as follows
  messages: {
    type: '选择要提交的更改类型:',
    scope: '表示此更改的范围(可选):',
    // used if allowCustomScopes is true
    customScope: '选择此项可以更改自定义范围:',
    subject: '用简短的文字描述变更内容:',
    body: '提供更长的变更描述(可选)。使用“|”中断新行:',
    breaking: '列出任何中断更改(可选):',
    footer: '列出此更改所关闭的任何问题(可选)。例如:#31 #34。对应“package.json”文件里“bugs.url”',
    confirmCommit: '你确定要继续执行上面的提交吗?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过任何你想问的问题
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
};
