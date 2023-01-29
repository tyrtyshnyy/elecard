import { FC } from "react";
import { CatalogResults } from "../../../types";
import { TreeName } from "../TreeName/TreeName";

type TreeNodeProps = {
  category: string;
  treeData: CatalogResults[];
};

const TreeNode: FC<TreeNodeProps> = ({ category, treeData }) => {
  const categoryItems = treeData
    .map((data) =>
      data.category === category
        ? data.image.slice(
            data.image.indexOf("/") + 1,
            data.image.lastIndexOf("-")
          )
        : ""
    )
    .filter((item) => item);

  const hashCategories = categoryItems.reduce((acc, cur: string) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
    return acc;
  }, {} as any);

  return (
    <div>
      <details>
        <summary>{category}</summary>
        {Object.keys(hashCategories).map((item, index) => (
          <TreeName key={index} item={item} treeData={treeData} />
        ))}
      </details>
    </div>
  );
};

export { TreeNode };

