import React from "react";
import AddOption from "./AddOption"
import Options from "./Options"
import Header from "./Header"
import Action from "./Action"
import OptionModal from "./OptionModal"

export default class Indecision extends React.Component {
  state = { 
    options : [],
    selectedOption: undefined 
  }

  handleCloseModal = () => {
      this.setState(() => ({selectedOption: undefined}));
  }

  handleDeleteOptions = () => {
    this.setState( () => {
      return { options : []};
    });
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handleAddOption = (option) => {
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

  handlePickOptions = () => {
    const index = Math.floor(Math.random() * this.state.options.length);
    this.setState(() => ({
        selectedOption: this.state.options[index]
    }))
  }

  render() {
    const title = "The Indecision App";
    const subTitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header title={title} subTitle={subTitle} />
        <div className='container'>
          <Action
          hasOptions={this.state.options.length > 0}
          handlePickOptions={this.handlePickOptions} />
          <div className='widget'>
          <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption} />
          {this.state.options.length === 0
            && <p className='widget__message' >Please add an option to get started!</p>}
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleCloseModal={this.handleCloseModal} />
      </div>);
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
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
}