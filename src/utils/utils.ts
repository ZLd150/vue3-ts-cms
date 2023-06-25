type NodeType = Record<string, any>;

/**
 * 返回树节点数组中的叶子节点数组
 * @param nodes 树节点数组
 * @returns 叶子节点数据
 */
export const getMenuLeafNodes = (nodes: NodeType[], key: string) => {
  const leafList: any[] = [];
  const recursionNodes = (nodes: NodeType[]) => {
    for (const item of nodes) {
      if (item.children) {
        recursionNodes(item.children);
      } else {
        leafList.push(item[key]);
      }
    }
  };
  recursionNodes(nodes);
  return leafList;
};
