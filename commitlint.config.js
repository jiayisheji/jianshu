const scopeEnum = require('./commit.scope.config');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'scope-enum': [2, 'always', scopeEnum.map(item => item.scope)],
    /**
     * type-enum 提交的类型枚举
     * build： 主要目的是修改项目构建系统(例如 glup， webpack， rollup，npm的配置等.xxx) 的提交
     * chore： 不属于以上类型的其他类型
     * ci： 主要目的是修改项目继续集成流程(例如 Travis， Jenkins， GitLab CI， Circle等) 的提交
     * docs： 文档更新
     * feat： 新增功能
     * fix： bug 修复
     * merge： 分支合并 Merge branch ? of ?
     * perf： 性能, 体验优化
     * refactor： 重构代码(既没有新增功能， 也没有修复 bug)
     * release: 发布版本
     * revert： 回滚某个更早之前的提交
     * style： 不影响程序逻辑的代码修改(修改空白字符， 格式缩进， 补全缺失的分号等， 没有改变代码逻辑)
     * test： 新增测试用例或是更新现有测试
     */
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'merge', 'perf', 'refactor', 'release', 'revert', 'style', 'test'],
    ],
  },
};
