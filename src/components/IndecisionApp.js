import React from 'react';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';
class IndecisionApp extends React.Component{
  state = {
    options: [],
    selectedOption: undefined
  };

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({selectedOption: undefined}));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
     options: prevState.options.filter((option) => option !== optionToRemove)
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const randomOption = this.state.options[randomNum];
    this.setState(() => ({selectedOption: randomOption}));
  };

  handleAddOption = (option) => {
    if(!option){
      return 'Enter valid value to add item';
    }else if(this.state.options.includes(option)){
      return 'This option already exists';
    }
    this.setState((prevState) => ({options: prevState.options.concat(option)}));
  };

  componentDidMount(){
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if(options){
        this.setState(() => ({options}));
      }
    } catch(e){
      //do nothing
    }
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json); 
    }
    
  }
  
  render(){
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className='container'>
          <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
          />
          <div className='widget'>
            <Options 
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
        selectedOption={this.state.selectedOption}
        handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

export default IndecisionApp;