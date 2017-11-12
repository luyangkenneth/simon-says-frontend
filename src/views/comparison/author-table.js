import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import uuidv4 from 'uuid/v4'

import Pills from './pills'

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class AuthorTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
  }

  render() {
    const { selectedAuthors, authors, setAuthors } = this.props
    if (this.state.filter.length > 0) {
      // Filter here
    }

    return (
      <div>
        <Pills
          selected={selectedAuthors}
        />
        <TextField
          fullWidth
          onChange={(_, val) => this.updateFilter(val)}
          floatingLabelText='Filter by author name'
        />
        <Table
          multiSelectable
          onRowSelection={selected => setAuthors(selected.map(idx => authors[idx]))} 
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.tableRows(authors)}
          </TableBody>
        </Table>
      </div>
    )
  }

  updateFilter = val => {
    this.setState({ filter: val })
  }

  tableRows = authors => {
    const { selectedAuthors } = this.props

    return authors.map(author => (
      <TableRow
        key={uuidv4()}
        selected={selectedAuthors.includes(author)}
      >
        <TableRowColumn>{author}</TableRowColumn>
      </TableRow>
    ))
  }
}

export default AuthorTable
