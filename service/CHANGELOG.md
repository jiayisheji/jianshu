> 软件的生命周期中一般分4个版本:
1. alpha版：内部测试版。
2. beta版：公开测试版。
3. rc版：全写：Release Candidate（候选版本）。
4. stable版：正式发布稳定版。
```
书写历史版本格式：
## versions[1.0.0-rc0]（Date[yyyy-mm-dd]）
### Features（新功能）
### Bug Fixes（修复bug）
### Notes（注释）
```

## 1.0.0beta1 （2017-06-07）
### Features
- 完善user表字段，大部分和简书匹配，去掉打赏和第三方社交认证。
- 新增books文集表。
### Bug Fixes

### Notes
需要从新梳理整个数据库设计依赖关系。以用户为核心，开始从新规划。