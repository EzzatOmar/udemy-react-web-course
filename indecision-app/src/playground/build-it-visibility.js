class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handelToggleVisibility = this.handelToggleVisibility.bind(this);
        this.state = {
            visibility : false
        };
    }

    handelToggleVisibility() {
        this.setState( (prevState) => {
            return {visibility : !prevState.visibility}
        });
    } 

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handelToggleVisibility}>{this.visibility ? "Show details" : "Hide details"}</button>
                {this.state.visibility ? <p>Some details</p> : undefined}
            </div>
        );
    }
}


  ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));