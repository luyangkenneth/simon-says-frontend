import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const SearchbarVenue = ({
  conferences
}) => (
  <div>
    <AutoComplete
      fullWidth
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={conferences}
      floatingLabelText='Search by Conference'
    />
  </div>
)

export default SearchbarVenue
