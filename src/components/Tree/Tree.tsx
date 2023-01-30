import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { CatalogResults } from "../../types";
import { TreeNode } from "./TreeNode/TreeNode";

import { LoadingSpinner } from "../";
import styles from "./Tree.module.css";
const Tree = () => {
  const {
    data: treeData,
    isLoading,
    hasError,
  } = useFetch<CatalogResults[]>(
    "http://contest.elecard.ru/frontend_data/catalog.json"
  );
  useEffect(() => {
    document.title = "Древовидный список";
  }, []);

  //@ts-ignore
  const hashCategories = treeData.reduce((acc, cur: CatalogResults) => {
    acc[cur.category] = acc[cur.category] ? acc[cur.category] + 1 : 1;
    return acc;
  }, {} as any);

  if (hasError) {
    return <h2>Произошла ошибка, попробуйте позже</h2>;
  }
  return (
    <div className={styles.tree}>
      <p>Категории</p>

      {!isLoading ? (
        Object.keys(hashCategories).map((category: any, index) => (
          <TreeNode category={category} key={index} treeData={treeData} />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Tree;
