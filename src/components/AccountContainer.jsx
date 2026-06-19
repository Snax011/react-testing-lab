import React, {useEffect, useMemo, useState} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    // Keep the newest transaction in view without mutating the existing array.
    .then(data=>setTransactions((currentTransactions)=>[...currentTransactions,data]))
  }
  
  function onSort(sortBy){
    setSortBy(sortBy)
  }

  // Derive the visible list from the raw data so search and sort stay in sync.
  const visibleTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const filteredTransactions = normalizedSearch
      ? transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(normalizedSearch) ||
          transaction.category.toLowerCase().includes(normalizedSearch)
        )
      : transactions

    if (!sortBy) {
      return filteredTransactions
    }

    return [...filteredTransactions].sort((firstTransaction, secondTransaction) => {
      return firstTransaction[sortBy].localeCompare(secondTransaction[sortBy])
    })
  }, [search, sortBy, transactions])

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={visibleTransactions} />
    </div>
  );
}

export default AccountContainer;
