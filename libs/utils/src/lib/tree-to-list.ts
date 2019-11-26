/**
 * @description 树形结构转换成列表结构
 * @export
 * @param root
 * @param options
 * @returns
 */
export function treeToList<D>(root: D[] | D, options?: { idKey?: string; childrenKey?: string }): D[] {
  const { idKey: ID_KEY, childrenKey: CHILDREN_KEY } = Object.assign({ idKey: 'id', childrenKey: 'children' }, options);
  // 堆叠集合
  let stack = [];
  // 摊平数组
  const array = [];
  // 临时存储Map
  let hashMap = {};
  // 如果root是数组 就直接拼接
  if (Array.isArray(root)) {
    stack = stack.concat(root);
  } else {
    stack.push(root);
  }
  // 处理节点
  function visitNode(node: D) {
    // 如果节点id标识不存在
    if (!hashMap[node[ID_KEY]]) {
      // 就在临时存储Map注册
      hashMap[node[ID_KEY]] = true;
      // 把当前子节点设为null
      node[CHILDREN_KEY] = null;
      // 添加到摊平数组中
      array.push(node);
    }
  }
  // 循环
  while (stack.length) {
    // 删除并返回堆叠集合的最后一个元素
    const node = stack.pop();
    // 如果节点没有子节点 或者 子节点为空 直接处理当前节点
    if (!node[CHILDREN_KEY] || !node[CHILDREN_KEY].length) {
      visitNode(node);
    } else {
      // 获取子节点
      const children = node[CHILDREN_KEY];
      // 循环遍历子节点，并添加到堆叠集合中
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
      // 处理当前节点
      visitNode(node);
    }
  }
  // 销毁临时存储Map
  hashMap = null;
  // 销毁堆叠集合
  stack = null;
  return array;
}
