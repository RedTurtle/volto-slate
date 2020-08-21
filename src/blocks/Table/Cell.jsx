/**
 * Editable table cell component.
 * @module volto-slate/blocks/Table/Cell
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SlateEditor } from 'volto-slate/editor';

/**
 * Editable table cell class.
 * @class Cell
 * @extends Component
 */
class Cell extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    onSelectCell: PropTypes.func.isRequired,
    row: PropTypes.number,
    cell: PropTypes.number,
    value: PropTypes.array,
    selected: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isTableBlockSelected: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {};

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Cell
   */
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.isTableBlockSelected && this.props.selected,
    };
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {}

  /**
   * Handles the `onBlur` event received on the `SlateEditor` component.
   */
  handleBlur(ev) {
    this.setState({ selected: false });
  }

  /**
   * Handles the `onFocus` event received on the `SlateEditor` component.
   */
  handleFocus(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    if (!this.state.selected) {
      this.setState({ selected: true }, () => {
        this.props.onSelectCell(this.props.row, this.props.cell);
      });
    }
  }

  /**
   * Change handler
   * @method onChange
   * @param {array} val Current value in the Slate editor.
   * @returns {undefined}
   */
  onChange(val) {
    this.props.onChange(this.props.row, this.props.cell, [...val]);
  }

  /**
   * Handles the `onFocus` event received by the container `<div>` of the `SlateEditor`.
   */
  handleContainerFocus(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    if (!this.state.selected) {
      this.setState({ selected: true }, () => {
        this.props.onSelectCell(this.props.row, this.props.cell);
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   * @todo `Tab` works well to go through cells in the table, but `Shift-Tab` does nothing.
   */
  render() {
    return (
      // The tabIndex is required for the keyboard navigation
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
      <div onFocus={this.handleContainerFocus.bind(this)} tabIndex={0}>
        <SlateEditor
          onChange={this.onChange.bind(this)}
          value={this.props.value}
          selected={this.props.isTableBlockSelected && this.state.selected}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
      </div>
    );
  }
}

export default Cell;
