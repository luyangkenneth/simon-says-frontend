import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import Pills from './pills'

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class SearchAuthors extends Component {
  render() {
    const { selectedAuthors, authors } = this.props

    return (
      <div>
        <Pills
          selected={selectedAuthors}
        />
        <AutoComplete
          ref={c => this.autoComplete = c}
          fullWidth
          maxSearchResults={10}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={authors.filter(author => !selectedAuthors.includes(author))}
          onNewRequest={this.selectAuthor}
          floatingLabelText='Search author names'
        />
      </div>
    )
  }

  selectAuthor = author => {
    // Hackish ref trick to clear the searchText of AutoComplete after each
    // entry.
    this.autoComplete.setState({ searchText: '' })

    const { selectedAuthors, setAuthors } = this.props
    setAuthors([...selectedAuthors, author])
  }
}

export default SearchAuthors
