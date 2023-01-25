import { useEffect, useState } from 'react';
import { getAllCatalog } from './api/api';
import { CatalogResults } from './api/types';
import './App.css';
import { Cards, LoadingSpinner } from './components';
import { Layout } from './layouts/Layout';


function App() {
  const [catalog, setCatalog] = useState<CatalogResults[] >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getAllCatalog().then((res) => {
      
      setCatalog(res)
      setIsLoading(false)
    }).catch(() =>{
      console.log("Error");
      setIsLoading(false)
      
    })
  }, []);

  return (
    <Layout>
        {isLoading ? <LoadingSpinner/> :  <Cards catalog={catalog}/>}
        
    </Layout>
  )
}

export default App
