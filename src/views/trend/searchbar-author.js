import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const SearchbarAuthor = ({
  authors,
  onChange,
  onConfirm
}) => (
  <div>
    <AutoComplete
      fullWidth
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={authors}
      onUpdateInput={onChange}
      onNewRequest={onConfirm}
      floatingLabelText='Search by Author'
    />
  </div>
)

export default SearchbarAuthor
