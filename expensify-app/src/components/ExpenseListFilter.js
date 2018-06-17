import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'

class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  }

  onFocusChange = (calendarFocused) => {
    this.setState( () => ({ calendarFocused }))
  }

  render () {
    return (
    <div>
      <input type="text" value={this.props.filters.text} onChange={(e) => {
        props.dispatch( setTextFilter(e.target.value))
      }}/>
      <select value={this.props.filters.sortBy} onChange={(e) => {
        const value = e.target.value;
        switch (value) {
          case 'amount': return this.props.dispatch(sortByAmount());
          case 'date': return this.props.dispatch(sortByDate());
        }
      }}>
        <option value="date" >Date</option>
        <option value="amount" >Amount</option>
      </select>
      <DateRangePicker
        startDate={this.props.filters.startDate}
        startDateId='startDateId'
        endDate={this.props.filters.endDate}
        endDateId='endDateId'
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.calendarFocused}
        showClearDates={true}
        onFocusChange={this.onFocusChange}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
    </div>
  );
  }
}

const stateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(stateToProps)(ExpenseListFilter);