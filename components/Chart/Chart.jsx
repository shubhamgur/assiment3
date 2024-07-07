import style from './Chart.module.css';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { useState } from 'react';

const Chart=()=>{
//http://localhost:8986/
    const [data,setData]=useState([])
    const [item,setItem]=useState([])
    const [pageNo,setPageNo]=useState(0)
    const [search,setSearch]=useState('')
    const [month,setMonth]=useState('')
    const [re,setRe]=useState(false)

useEffect(()=>{
fetch(`http://localhost:8987/${month}`).then((res)=>res.json()).
then((datas)=>setData(datas.data)).catch((err)=>console.log(err))

if(pageNo===1){
  setItem([]);
  const arr=data.filter((ele,ind)=>{return ele.id<11})
  setItem(arr)
}

if(pageNo===2){
  setItem([]);
  const arr=data.filter((ele,ind)=>{return ele.id>10 && ele.id<21 })
  setItem(arr)
}

if(pageNo===3){
  setItem([]);
  const arr=data.filter((ele,ind)=>{return ele.id>20 })
  setItem(arr)
}

},[pageNo,month])

//.filter((ele)=>{if(search===''){return ele}
//else if(ele.toLowerCase().includes(search.toLowerCase())){return ele}})

const sale=data.reduce((pre,ele)=>{return pre+ele.price;},0)
console.log(item)
const sold=data.filter((ele)=>{return ele.sold===true})

const unsold=data.filter((ele)=>{return ele.sold===false})


const items=item.map((ele,ind)=>
<tr key={ind} className={style.tr}>
<td>{ele.id}</td>
<td>{ele.title}</td>
<td>{ele.description}</td>
<td>{ele.price}</td>
<td>{ele.category}</td>
<td>{ele.sold ? 'sold':'unsold'}</td>
<td><img src={ele.image} alt="Girl in a jacket" width="50px" height="60px"/></td>
</tr>
)



const nBtn=()=>{
let num=pageNo;
let num1=num+1;
setPageNo(num1)
}

const   changehandler=(e)=>{
setSearch(e.target.value) 
}
const pBtn=()=>{
  let num=pageNo;
  let num1=num-1;
  setPageNo(num1)
}

    return(
        <>
      <style>
        {
           ` body{
            background-color: rgb(233, 233, 225);
            }`
        }
      </style>

      <input className={style.input} onChange={changehandler} type='text' placeholder='Search Title'/>
             <select className={style.drop} onChange={(e)=>{setMonth(e.target.value)}}>
                <option value=''>March</option>
                <option value='jan'>January</option>
                <option value='feb'>February</option>
                <option value='apr'>April</option>
                <option value='may'>May</option>
                <option value='jun'>June</option>
             </select>

             <div className={style.statis}>
<h1>Statistics - March</h1>

<div  className={style.table2}>
<Table striped >
      <thead>
        <tr>
          <th>Total sale</th>
          <td>{sale}</td>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Total sale item</th>
          <td>{sold.length}</td>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Total not sale item</th>
          <td>{unsold.length}</td>
        </tr>
      </thead>
    </Table>
</div>

             </div>

{pageNo===0 &&(
  <>
<button className={style.showBtn} onClick={()=>{setPageNo(1)}}>Show List</button>
  </>
)}
{pageNo>0 &&(
<>
<div  className={style.table}>
             <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
        </tr>
      </thead>
      {items}
      <tbody>
       
       
      </tbody>
    </Table>
<div>
<p><strong>Page No:-</strong> {pageNo} <button style={{marginLeft:"450px"}} onClick={nBtn} className={style.btn}  disabled={pageNo===3}>Next</button>
 <button  className={style.btn}  onClick={pBtn} disabled={pageNo===1}>Previous</button> </p>

</div>
             </div>
</>
)}
            
             
            
        </>
    )
}

export default Chart;