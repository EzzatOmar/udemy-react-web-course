class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handlerPlusOne = this.handlerPlusOne.bind(this);
        this.handlerMinusOne = this.handlerMinusOne.bind(this);
        this.handlerReset = this.handlerReset.bind(this);
        this.state = {
            count: 0
        }
    }
    
    componentDidMount() {
        const json = localStorage.getItem('count');
        const count = parseInt(JSON.parse(json), 10);
        if(!isNaN(count)) this.setState(() => ({count}) ) 
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }

    handlerPlusOne () {
        this.setState((prevState) => {
            return {count: prevState.count + 1};
        });
    }
    handlerMinusOne () {
        this.setState((prevState) => {
            return {count: prevState.count - 1};
        });
    }
    handlerReset () {
        this.setState((prevState) => {
            return {count: 0};
        });
    }
    render () {
        return (
            <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.handlerPlusOne}>+1</button>
            <button onClick={this.handlerMinusOne}>-1</button>
            <button onClick={this.handlerReset}>reset</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter title="WOW"/>, document.getElementById('app'));