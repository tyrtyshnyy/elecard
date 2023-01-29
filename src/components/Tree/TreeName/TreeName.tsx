import { FC } from "react";
import { CatalogResults } from "../../../types";
import { TreeInfo } from "../TreeInfo/TreeInfo";

type TreeNameProps = {
  item: string;
  treeData: CatalogResults[];
};

const TreeName: FC<TreeNameProps> = ({ item, treeData}) => {
  const nameFile = treeData.filter((data, index) => {
    if (
      data.image.slice(
        data.image.indexOf("/") + 1,
        data.image.lastIndexOf("-")
      ) === item
    ) {
      return data;
    }
  });

  return (
    <div>
      <details>
        <summary>{item}</summary>
        {nameFile.map((data, index) => (
          <TreeInfo key={index} data={data} />
        ))}
      </details>
    </div>
  );
};

export { TreeName };

