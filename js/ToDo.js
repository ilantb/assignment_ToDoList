class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsDone: [],
            isShown: true,
            isShownDone: false,
            className: "toDo"
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.hide = this.hide.bind(this);
        this.hideDone = this.hideDone.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addItem(e) {
        if (this.inputElement.value !== "") {
            var laught = new Audio("../sounds/dory_rire.mp3");
            laught.play();
            var newItem = {
                text: this.inputElement.value,
                key: Date.now(),
                className: this.state.className,
            };

            this.state.items.push(newItem);

            this.setState({
                items: this.state.items
            });

            this.inputElement.value = "";
        }

        e.preventDefault();
    }

    removeItem(key) {
        for (var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].key == key) {
                var toremoveItem = this.state.items[i];
                toremoveItem.className = toremoveItem.className == "done" ? "toDo" : "done"
                var index = i;
            }
        }
        for (var i = 0; i < this.state.itemsDone.length; i++) {
            if (this.state.itemsDone[i].key == key) {
                var toremoveItem = this.state.itemsDone[i];
                toremoveItem.className = toremoveItem.className == "done" ? "toDo" : "done"
                var index = i;
            }
        }

        if (toremoveItem.className == "done") {
            this.state.itemsDone.push(toremoveItem);
            this.state.items.splice(index, 1)
        } else {
            this.state.items.push(toremoveItem);
            this.state.itemsDone.splice(index, 1)

        }
        console.log(this.state.itemsDone);

        this.setState({
            itemsDone: this.state.itemsDone,
            items: this.state.items
        });

    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        var filteredItemsDone = this.state.itemsDone.filter(function (item) {
            return (item.key !== key);
        });


        this.setState({
            items: filteredItems,
            itemsDone: filteredItemsDone
        });

    }

    hide() {
        this.setState({
            isShown: false,
            isShownDone: true
        })
    }

    hideDone() {
        this.setState({
            isShown: true,
            isShownDone: false
        })
    }

    render() {
        console.log(this.state.items);

        return (
            <div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navBar">

                            <a class="navText">To Doryst</a>
                            <div class="logo"></div>
                        </div>
                    </div>

                </nav>
                <button class="btns" id="toDoBtn" onClick={this.hideDone}>ToDo</button>
                <button class="btns" id="doneBtn" onClick={this.hide}>Done</button>
                <div className={this.state.isShown ? "todoListMain" : "hide"}>
                    <div className="header">
                        <form onSubmit={this.addItem}>
                            <input ref={(a) => this.inputElement = a}
                                placeholder="enter task">
                            </input>
                            <button className="addItemToList" type="submit">add</button>
                        </form>
                    </div>
                    <TodoItems entries={this.state.items}
                        delete={this.deleteItem} remove={this.removeItem} />
                </div>
                <div className={this.state.isShownDone ? "doneListMain" : "hide"}>
                    <TodoItems entries={this.state.itemsDone}
                        delete={this.deleteItem} remove={this.removeItem} />
                </div>
            </div>
        );
    }
}



class TodoItems extends React.Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }
    delete(key) {
        this.props.delete(key);
    }
    remove(key) {
        this.props.remove(key);
    }
    createTasks(item) {
        return <li key={item.key}><div className="text">{item.text}</div><div className="removeButton" key={item.key} onClick={() => this.remove(item.key)}></div>
            <div className="deleteButton" key={item.key} onClick={() => this.delete(item.key)}></div></li>;

    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        );
    }
};

function render() {
    ReactDOM.render(
        <TodoList />,
        document.getElementById("root")
    );
}
render();