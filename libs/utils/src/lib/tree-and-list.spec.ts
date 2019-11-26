import { treeToList } from './tree-to-list';
import { listToTree } from './list-to-tree';
import { clone } from './clone';

describe('Utils', () => {
  describe('treeToList', () => {

    it('should return 10', () => {
      const tree = genTree(10);
      expect(treeToList(tree)).toHaveLength(10);
    });

    it('should return true', () => {
      const tree = genTree(5);
      const list = treeToList(clone(tree));
      const tree2 = listToTree(list);
      expect(tree2).toEqual(tree);
    });
  });
});

/**
 * @description 构建数据的树
 * @param {number} itemCount
 * @param {Record<string, string>} [options={}]
 * @returns
 */
function genTree(itemCount: number, options: Record<string, string> = {}) {
  const idKey = options.idKey || 'id';
  const parentKey = options.parentKey || 'parentId';
  const childrenKey = options.childrenKey || 'children';

  // unique id
  const ids = {};
  function getId() {
    const id = 'id' + Math.random().toString().substr(-5);
    return ids[id] ? getId() : (ids[id] = id);
  }

  // tslint:disable-next-line: no-any
  function gen(count: number, prev?: any, parent?: any, top?: any) {

    if (count >= itemCount) {
      return top[childrenKey];
    }

    const item = {};
    item[idKey] = getId();
    item[childrenKey] = [];

    // first child
    if (!count) {
      top = top || {};
      top[idKey] = 0;
      top[childrenKey] = [];
      top[childrenKey].push(item);
      parent = top;
    } else if (Math.random() > 0.5) {
      parent[childrenKey].push(item);
    } else {
      prev[childrenKey].push(item);
      parent = prev;
    }
    item[parentKey] = parent[idKey];
    return gen(++count, item, parent, top);
  }

  return gen(0);
}
