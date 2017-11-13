import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import HoverPaper from '../../components/hover-paper'
import Pills from './pills'

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class SearchAuthors extends Component {
  render() {
    const { selectedAuthors, authors, setAuthors } = this.props

    return (
      <div>
        <Pills
          selected={selectedAuthors}
          onDelete={value => () => {
            setAuthors(selectedAuthors.filter(author => author !== value))
          }}
        />
        <HoverPaper className='p-4'>
          <AutoComplete
            ref={c => this.autoComplete = c}
            fullWidth
            maxSearchResults={10}
            dataSource={authors.filter(author => !selectedAuthors.includes(author))}
            onNewRequest={this.selectAuthor}
            floatingLabelText='Search author names'
          />
        </HoverPaper>
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
