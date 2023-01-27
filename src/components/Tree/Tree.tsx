import useFetch from "../../hooks/useFetch";
import { CatalogResults } from "../../types";
import { TreeNode } from "./TreeNode/TreeNode";

import styles from './Tree.module.css';
const Tree = () => {
  const {
    data: treeData,
    isLoading,
    hasError,
  } = useFetch<CatalogResults[]>(
    "http://contest.elecard.ru/frontend_data/catalog.json"
  );

    

  const categories = treeData.map(node => node.category)

  const hashCategories = categories.reduce((acc,cur: string) => {
    //@ts-ignore
    acc[cur] = acc[cur] ? acc[cur] + 1: 1
    return acc
},{})

  return (
    <div className={styles.tree}>
        <p>Категории</p>
        
      {Object.keys(hashCategories).map((category: any, index) => (
        <TreeNode category={category} key={index} treeData={treeData} />
      ))}
    </div>
  );
};

export default Tree;
