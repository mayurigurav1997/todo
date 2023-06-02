import React from 'react'
import "./style.css"

const Todo = () => {
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo" />
                        <figcaption>Add your list here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add Item"
                            className="form-contrl" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo