import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import HoverPaper from '../../components/hover-paper'

const SearchbarAuthor = ({
  venues,
  onChange,
  onConfirm
}) => (
  <div>
    <HoverPaper className='p-4'>
      <AutoComplete
        fullWidth
        maxSearchResults={10}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={venues}
        onUpdateInput={onChange}
        onNewRequest={onConfirm}
        floatingLabelText='Search by Venue'
      />
    </HoverPaper>
  </div>
)

export default SearchbarAuthor
