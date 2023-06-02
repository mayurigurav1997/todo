import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists)
    }
    else {
        return [];
    }

}
const Todo = () => {
    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data")
        }
        else if (inputdata && toggleButton) {
            setItems(
                items.map((curr) => {
                    if (curr.id == isEditItem) {
                        return { ...curr, name: inputdata }
                    }
                    return curr;
                })
            )
            setInputData('')
            setIsEditItem()
            setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }

    }
    const deleteItem = (index) => {
        const updatedItem = items.filter((curr) => {
            return curr.id !== index;
        }
        );
        setItems(updatedItem);
    }
    const editItem = (index) => {
        const new_item = items.find((curr) => { return curr.id === index })
        setInputData(new_item.name)
        setIsEditItem(index)
        setToggleButton(true)
    }
    const removeAll = () => {
        setItems([]);
    }
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo" />
                        <figcaption>Add your list here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="✍️ Add Item"
                            className="form-contrl"
                            value={inputdata}
                            onChange={(e) => setInputData(e.target.value)} />
                        {toggleButton
                            ? <i className="far fa-edit add-btn"
                                onClick={addItem}></i>
                            : <i className="fa fa-plus add-btn"
                                onClick={addItem}></i>}

                    </div>

                    <div className="showItems">
                        {items.map((currElem, index) => {
                            return (
                                <div className="eachItem" key={index}>
                                    <h3>{currElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn"
                                            onClick={() => editItem(currElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(currElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                            onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Todo