'use client';

import React, { Component } from 'react';
import Multiselect from './components/Multiselect';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOptions: [],
    };
  }

  componentDidMount() {
    this.fetchOptions();
  }

  fetchOptions = async () => {
    try {
      const response = await fetch('https://timeapi.io/api/TimeZone/AvailableTimeZones');
      const data = await response.json();
      const formattedOptions = data.map((timezone) => ({
        label: timezone,
        value: timezone,
      }));
      this.setState({ options: formattedOptions });
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };

  handleSelectionChange = (selectedOptions) => {
    this.setState({ selectedOptions });
  };

  render() {
    const { options, selectedOptions } = this.state;
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Multiselect Dropdown</h1>
        <Multiselect
          options={options}
          selectedOptions={selectedOptions}
          onSelectionChange={this.handleSelectionChange}
          placeholder="Search timezones..."
        />
      </div>
    );
  }
}
