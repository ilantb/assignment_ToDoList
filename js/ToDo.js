class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isShown: true,
            counter: 0
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.hide = this.hide.bind(this);
    }

    addItem(e) {
        if (this.inputElement.value !== "") {
            var newItem = {
                text: this.inputElement.value,
                key: this.state.counter
            };

            this.setState((prevState) => {
                
                return {
                    items: prevState.items.concat(newItem),
                   
                };
            });

            this.inputElement.value = "";
        }
        this.state.counter = this.state.counter + 1;
        
        e.preventDefault();
        
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });
        
        this.setState({
            items: filteredItems
        });
    }

    hide() {
        this.setState({
            isShown: !this.state.isShown
        })
    }

    render() {
        var boxClass = this.state.isShown ? "todoListMain": "hide"
        console.log(this.state.items);
        return (
            <div>
            <button class="btns" id="toDoBtn">ToDo</button><button class="btns" id="doneBtn" onClick={this.hide}>Done</button>
            <div className={boxClass}>
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this.inputElement = a}
                            placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items}
                    delete={this.deleteItem} />
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
    createTasks(item) {
        return <li onClick={() => this.delete(item.key)}
            key={item.key}><textarea rows="2" cols="30">{item.text}</textarea></li>
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