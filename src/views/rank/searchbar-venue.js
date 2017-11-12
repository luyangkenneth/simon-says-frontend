import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import HoverPaper from '../../components/hover-paper'

const SearchbarVenue = ({
  conferences,
  onChange,
  onConfirm
}) => (
  <div>
    <HoverPaper className='p-4'>
      <AutoComplete
        fullWidth
        maxSearchResults={10}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={conferences}
        onUpdateInput={onChange}
        onNewRequest={onConfirm}
        floatingLabelText='Search by Conference'
      />
    </HoverPaper>
  </div>
)

export default SearchbarVenue
