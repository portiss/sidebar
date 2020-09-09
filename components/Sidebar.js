
import React from 'react'
import { connect } from 'react-redux'
import { loadReports } from '../reducers/reports'

const reportItem = (data) => {
  const date = new Date(data.updated)
  const dateFormat = new Intl.DateTimeFormat('en',
    { month: 'short', day: '2-digit' }).format(date)
  const timeFormat = new Intl.DateTimeFormat('en',
    { hour: '2-digit', minute: '2-digit' }).format(date)

  return <>
    <div className="row">
      <div className="left" title={data.name}>
        {data.name}
      </div>
      <div className="right">
        {dateFormat}
      </div>
    </div>
    <div className="row">
      <div className="left">
        <span title={data.type}>{data.type}</span>
        <i className="fa fa-map-marker" title="Location"></i>
        <span className="location" title={data.location}>
          {data.location}
        </span>
      </div>
      <div className="right">
        {timeFormat}
      </div>
    </div>
  </>
}

class Sidebar extends React.PureComponent {

  state = {
    filterText: '',
    sortAsc: true,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    this.props.loadReports(this.state.filterText, this.state.sortAsc)
  }

  /*
    Filter Reports by click on refresh icon
    Search is not case sensitive
  */
  filteredReports = (query) => {
    this.setState({ filterText: query }, () => this.loadData())
  }

  /*
    Sort Reports by click on icon
  */
  sortReports = () => {
    this.setState({ sortAsc: !this.state.sortAsc }, () => this.loadData())
  }

  /*

  I add this option to use debounce
  but currently its not work when I call it onchange:
  this.debounce(()=>this.filteredReports(), 4000, event.target.value)

  debounce = (fn, ms, args) => {
    let tmId = 0
    console.log('debounce ', fn, args)
    return () => {
      if (tmId) clearTimeout(tmId)
      tmId = setTimeout(fn.call(args), ms)
    }
  }
 */

  render() {
    const { reports } = this.props
    return (
      <div className="wrapper">
        <input type="checkbox" id="btn" hidden />
        <label htmlFor="btn" className="menu-btn">
          <i className="fa fa-bars"></i>
          <i className="fa fa-times"></i>
        </label>
        <nav id="sidebar">
          <div className="title">Reports 75
            <a onClick={() => this.loadData()}>
              <i className="fas fa-redo" title="Refresh">
              </i>
            </a>
            <a onClick={() => this.sortReports()}>
              <i className="fas fa-sort"
                title={`Sort ${!!this.state.sortAsc ? 'desc' : 'asc'}`}>
              </i>
            </a>
          </div>
          <input
            className="title"
            type="text"
            placeholder="Search Reports"
            /* try debounce currenlty cannot apply it*/
            onChange={() =>
              this.filteredReports(event.target.value)
            } />
          <ul className="list-items">
            {reports.map(report => <li key={report.id}>{reportItem(report)}</li>)}
          </ul>
        </nav>
      </div>
    )
  }
}
/* Redux - attached to update to/from store */
const stateToProps = state => ({
  reports: state.reports.collection,
})

const dispatchToProps = dispatch => ({
  loadReports: (query, sortAsc) => dispatch(loadReports(query, sortAsc)),
})

/* Connect to redux store */
export default connect(stateToProps, dispatchToProps)(Sidebar)
