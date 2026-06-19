import React from "react";

function AddTransactionForm({postTransaction}) {
  function submitForm(e){
    e.preventDefault()
    const formElements = e.currentTarget.elements
    // Read directly from the form elements so the submit handler stays simple.
    const newTransaction = {
      date: formElements.date.value,
      description: formElements.description.value,
      category: formElements.category.value,
      amount: formElements.amount.value
    }
    postTransaction(newTransaction)

  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={(e)=>{submitForm(e)}}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
