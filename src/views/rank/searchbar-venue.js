import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const SearchbarVenue = ({
  conferences,
  onChange,
  onConfirm
}) => (
  <div>
    <AutoComplete
      fullWidth
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={conferences}
      onUpdateInput={onChange}
      onNewRequest={onConfirm}
      floatingLabelText='Search by Conference'
    />
  </div>
)

export default SearchbarVenue
