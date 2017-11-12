import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Author from '../../views/author'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Author)
