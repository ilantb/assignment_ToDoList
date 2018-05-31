class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsDone: [],
            isShown: true,
            isShownDone: false,
            counter: 0,
            className : "toDo"
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.hide = this.hide.bind(this);
        this.hideDone = this.hideDone.bind(this);
        this.crossItem = this.crossItem.bind(this);
    }

    addItem(e) {
        if (this.inputElement.value !== "") {
            var newItem = {
                text: this.inputElement.value,
                key: this.state.counter,
                className : this.state.className
            };

            this.state.items.push(newItem);

            this.setState({
                items: this.state.items,
                counter : this.state.counter+1
            });

            this.inputElement.value = "";
        }
       
        e.preventDefault();
    }

    crossItem(key) {
        var toCrossItem = this.state.items[key];
        toCrossItem.className = "done"
        this.state.itemsDone.push(toCrossItem);
        console.log(this.state.itemsDone);
       
        
        this.setState({
            itemsDone : this.state.itemsDone ,
            toCrossItem : this.state.toCrossItem           
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
            itemsDone: filteredItemsDone,
            counter : this.state.counter-1
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
                <button class="btns" id="toDoBtn" onClick={this.hideDone}>ToDo</button>
                <button class="btns" id="doneBtn" onClick={this.hide}>Done</button>
                <div className={this.state.isShown ? "todoListMain" : "hide"}>
                    <div className="header">
                        <form onSubmit={this.addItem}>
                            <input ref={(a) => this.inputElement = a}
                                placeholder="enter task">
                            </input>
                            <button type="submit">add</button>
                        </form>
                    </div>
                    <TodoItems entries={this.state.items}
                        delete={this.deleteItem} cross={this.crossItem} />
                </div>
                <div className={this.state.isShownDone ? "doneListMain" : "hide"}>
                <TodoItems entries={this.state.itemsDone}
                        delete={this.deleteItem} cross={this.crossItem} />
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
    cross(key) {
        this.props.cross(key);
    }
    createTasks(item) {
        return <li className={item.className} key={item.key}>{item.text}<button className="crossButton" key={item.key} onClick={() => this.cross(item.key)}>C</button>
            <button className="deleteButton" key={item.key} onClick={() => this.delete(item.key)}>D</button></li>;

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