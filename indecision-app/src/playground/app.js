class Indecision extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePickOptions = this.handlePickOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options : []
    }
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState( () => ({options}));
      }
    } catch (e){
      // DO NOTHING
    } 
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('componentDidUpdate', prevProps);

    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleDeleteOptions() {
    this.setState( () => {
      return { options : []};
    });
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handleAddOption (option) {
    if(!option) {
      return 'Enter valid value for add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState( (prevState) => {
      return {
        options : prevState.options.concat([option])
      }
    })
  }

  handlePickOptions() {
    const index = Math.floor(Math.random() * this.state.options.length);
    alert("Pick " + this.state.options[index]);
  }

  render() {
    const title = "The Indecision App";
    const subTitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header title={title} subTitle={subTitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePickOptions={this.handlePickOptions} />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption} />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>);
  }
}

// stateless functional component
const Header = (props) => {
    return (
    <div>

    <h1>{props.title}</h1>
    <h2>{props.subTitle}</h2>
    </div>
    );
}

Header.defaultProps = {
 title: "Title"
}
const Action = (props) => {
    return (
    <div>
      <button onClick={props.handlePickOptions}
              disabled={!props.hasOptions}>What should I do?</button>
    </div>);
}

const Options = (props) => {
    return (
    <div>
      {props.options.length === 0 && <p>Please add an option to get started!</p>}
      <button onClick={props.handleDeleteOptions}>Remove all</button>
      {props.options.map((option) => (
        <Option
        key={option}
        optionText={option}
        handleDeleteOption={props.handleDeleteOption} />
      ))} </div>
    );
}

const Option = (props) => {
    return (
    <div>
      {props.optionText}
      <button onClick={ (e) => {
        props.handleDeleteOption(props.optionText);
      }}
    >
      Remove</button>
    </div>);
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption (e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error =  this.props.handleAddOption(option);
    this.setState(() => {
      return { error };
    })
    if(!error) e.target.elements.option.value = '';
  }

  render() {
    return (
    <div>
      {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddOption}>
        <input type="text" name="option"></input>
        <button>Add Option</button>
      </form>
    </div>);
  }
}

var appRoot = document.getElementById('app');
ReactDOM.render(<Indecision />, appRoot);