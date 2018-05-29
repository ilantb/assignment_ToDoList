class Boxes extends React.Component {
    constructor(props) {
        super(props);
        this.addBox = this.addBox.bind(this);
        this.state = {
            array: [],
            myElement: ""
        }

    }

    addBox() {
        this.setState({
            newElement : this.state.array.push(""),
            myElement : <div>{this.state.array.map(x=> <div className="bBox" key={x}></div>)}</div>
        })



    }
    render() {


        return (
            <div className="bigBox">
                <button onClick={this.addBox}>Add Box</button>
                {this.state.myElement}
            </div>
        );
    }

}


function render() {
    ReactDOM.render(
        <Boxes />,
        document.getElementById("root")
    );
}
render();