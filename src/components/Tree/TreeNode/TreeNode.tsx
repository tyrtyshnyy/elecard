import { FC } from "react";
import { CatalogResults } from "../../../types";
import { TreeInfo } from "../TreeInfo/TreeInfo";

type TreeNodeProps = {
  category: string;
  treeData: CatalogResults[];
};

const TreeNode: FC<TreeNodeProps> = ({ category, treeData }) => {
  const categoryItems = treeData
    .map((data) =>
      data.category === category
        ? data.image.slice(data.image.indexOf("/") + 1, data.image.indexOf("_"))
        : ""
    )
    .filter((item) => item);

  return (
    <div>
      <details>
        <summary>{category}</summary>
        {categoryItems.map((item, index) => (
          <TreeInfo key={index} item={item} treeData={treeData} />
        ))}
      </details>
    </div>
  );
};

export { TreeNode };

