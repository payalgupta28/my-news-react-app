import React,{useEffect,useState} from 'react'
import { useSearchParams } from "react-router-dom"
  import InfiniteScroll from 'react-infinite-scroll-component';

import NewsItem from '../components/NewsItem'

export default function HomePage()  {
  let[page,setPage]=useState(1)
  let[articles,setArticles]=useState([])
  let[totalResults,setTotalResults]=useState(0)
  let [q,setQ] = useState("")
    let [language,setLanguage]= useState("hi")
    let [searchParams] = useSearchParams()
    async function getAPIData(q,language){
      
        let response=await fetch(`https://newsapi.org/v2/everything?q=${q}&sortby=publishedAt&language=${language}&page=1&pageSize=24&apikey=897605363d4a4a1c93c22374ba018630`)
      response=await response.json()
      if(response.status==="ok"){
        setArticles(response.articles)
        setTotalResults(response.totalResults)
      }
      
    }
    let fetchData=async()=>{
      setPage(page+1)
      let response=await fetch(`https://newsapi.org/v2/everything?q=${q}&sortby=publishedAt&language=${language}&page=1&pageSize=24&apikey=897605363d4a4a1c93c22374ba018630`)
      response=await response.json()
      if(response.status==="ok"){
        setArticles(articles.concat(response.articles))
      }
    }
    useEffect(()=>{
      (()=>{
        let q=searchParams?.get("q")??"All"
        let language=searchParams?.get("language")??"hi"
        setQ(q)
        setLanguage(language)
        getAPIData(q,language)
      })()
    },[searchParams])
   
    
  return (
   <div className='container-fluid my-3'>
   <h5 className='text-center text-capitalize'>{q} News Articles</h5>
   <InfiniteScroll
  dataLength={articles.length} //This is important field to render the next data
  next={fetchData}
  hasMore={articles.length<totalResults}
  loader={<h4>Loading...</h4>}
  
>

   <div className="row">
    {
      articles.map((item,index)=>{
        return <NewsItem
             key={index}
             source={item.source.name}
             title={item.title}
             description={item.description}
             url={item.url}
             pic={item.urlToImage}
             date={item.publishedAt}

        />
      })
    }
   </div>
   </InfiniteScroll>

   </div>
  )
}
