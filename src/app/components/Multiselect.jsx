'use client';

import React, { Component } from 'react';

export default class Multiselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isDropdownOpen: false, 
    };
  }

  componentDidMount() {
    
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState({ isDropdownOpen: false }); 
    }
  };

  handleSelect = (option) => {
    const { selectedOptions, onSelectionChange } = this.props;
    if (selectedOptions.some((selected) => selected.value === option.value)) {
      onSelectionChange(selectedOptions.filter((selected) => selected.value !== option.value));
    } else {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  handleClearOption = (value) => {
    const { selectedOptions, onSelectionChange } = this.props;
    onSelectionChange(selectedOptions.filter((selected) => selected.value !== value));
  };

  handleClearAll = () => {
    this.props.onSelectionChange([]);
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value, isDropdownOpen: true }); 
  };

  handleDropdownToggle = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen, 
    }));
  };

  render() {
    const { options, selectedOptions, placeholder = 'Select options...' } = this.props;
    const { searchTerm, isDropdownOpen } = this.state;

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="w-full max-w-md mx-auto mt-10">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div key={option.value} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                <span>{option.label}</span>
                <button
                  onClick={() => this.handleClearOption(option.value)}
                  className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {selectedOptions.length > 0 && (
            <button
              onClick={this.handleClearAll}
              className="mt-2 text-sm text-red-600 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onClick={this.handleDropdownToggle} 
            onChange={this.handleSearch}
            placeholder={placeholder}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isDropdownOpen && (
            <div
              ref={(node) => { this.dropdownRef = node; }} 
              className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow-lg"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => this.handleSelect(option)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No options found</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
