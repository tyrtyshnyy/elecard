import { FC } from "react";
import { CatalogResults } from "../../../types";

type TreeNameProps = {
  item: string;
  treeData: CatalogResults[];
};

const TreeName: FC<TreeNameProps> = ({ item, treeData }) => {
  const nameFile = treeData
    .map((data, index) =>
      data.image.slice(
        data.image.indexOf("/") + 1,
        data.image.lastIndexOf("-")
      ) === item
        ? data.image.slice(
            data.image.lastIndexOf("-") + 1,
            data.image.indexOf("_")
          )
        : ""
    )
    .filter((item) => item);

  console.log(nameFile);

  return (
    <div>
      <details>
        <summary>{item}</summary>
        {nameFile.map((name, index) => {
          return (<div key={index}>
            <details>
              <summary>{name}</summary>
            </details>
          </div>
        )})}
      </details>
    </div>
  );
};

export { TreeName };

