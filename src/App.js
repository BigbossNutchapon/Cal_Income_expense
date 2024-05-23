import Transection from "./component/Transection";
import FormComponent from "./component/FormComponent";
import DataContext from "./data/DataContext";
import ReportComponent from "./component/ReportComponent";
// import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  
  const initData = [
    {id:1, title: "ค่ารักษาพยาบาล", amount: -1000},
    {id:2, title: "ค่าอาหาร", amount: -200},
    {id:3, title: "ค่าเดินทาง", amount: -300},
    {id:4, title: "ขายของออนไลน์", amount: 3000}
  ]
  
  const [items, setItems] = useState(initData)
  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem)=>{
      return [newItem, ...prevItem]
    })
  }
  useEffect(()=>{
    const amounts = items.map((item)=>item.amount)
    const income = amounts.filter((element)=>element>0).reduce((total, element)=>total+=element,0)
    const expense = (amounts.filter((element)=>element<0).reduce((total, element)=>total+=element,0)) * -1
    setReportIncome(income)
    setReportExpense(expense)
  }, [items, reportIncome, reportExpense])

  //Reducer State
  // const [showReport, setShowReport] = useState(false)
  // const reducer = (state, action)=>{
  //   switch(action.type){
  //     case "SHOW" :
  //       return setShowReport(true)
  //     case "HIDE" :
  //       return setShowReport(false)
  //   }
  // }

  // const [result, dispatch] = useReducer(reducer,showReport)
  return (
    // <div className="App">
    //   <h1>รายการรายรับ-รายจ่าย</h1>
    //   <FormComponent onAddItem={onAddNewItem}/>
    //   <Transection items = {items}/>
    // </div>
    <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
      <div className="App">
        <h1>รายการรายรับ-รายจ่าย</h1>
        {/* {showReport && <ReportComponent/>} */}
        <Router>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<ReportComponent />} />
            <Route 
              path="/insert" 
              element={
                <>
                  <FormComponent onAddItem={onAddNewItem} />
                  <Transection items={items} />
                </>
              } 
            />
          </Routes>
        </Router>
      </div>
      {/* <h1>{result}</h1>
      <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
      <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button> */}
    </DataContext.Provider>
    
  );
}

export default App;