import { Fragment, useState } from "react";
import { Cards, Tree } from "./components";
import { Layout } from "./layouts/Layout";

import styles from './App.module.css';

const viewType = [
  { id: 1, title: "Карточки" },
  { id: 2, title: "Древовидный список" },
];
function App() {
  const [selectView, setSelectView] = useState<number>(1);

  return (
    <Layout>
      <div className={styles.selectView}>
      {viewType.map((el) => {
        return (
          <Fragment key={el.id}>
            <input
              type="radio"
              onChange={() => setSelectView(el.id)}
              checked={selectView === el.id}
            />
            <label>{el.title}</label>
          </Fragment>
        );
      })}
      </div>
      {selectView === 1 ? <Cards /> : <Tree/> }
    </Layout>
  );
}

export default App;
