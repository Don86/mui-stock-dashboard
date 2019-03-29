import React, { Component } from 'react';
import './App.css';

// MUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import { InputBase } from '@material-ui/core';
// Modal imports
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Other imports - axios, recharts
import axios from 'axios';
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine} from 'recharts';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

// Custom imports
import calcStockReturns from "./components/calcStockReturns"
import parseData from "./components/parseData"
import binArray from "./components/binArray"
import CustomizedDialogDemo from "./components/CustomizedDialogDemo"
import Album from "./components/Album"


const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  plotTitle: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  tickerTitle: {
    marginLeft: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
  // ==================== AppBar CSS ====================
  appbarTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchBtn: {
    position: 'relative',
    width: theme.spacing.unit * 14,
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.unit,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },


  // ==================== End of AppBar CSS ====================
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  tickerStyle0: {
    color: "blue"
  },
  tickerStyle1: {
    color: "red"
  },
  // form styles
  paperForm: {
    width: 300,
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  album: {
    marginLeft: theme.spacing.unit * 3,
  },
  paperChart: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class App extends Component {
  constructor() {
    super()
    this.state = {
      ticker0:"",
      ticker1:"",
      lineData: [{date: '1', a: 10},
                {date: '2', a: 22},
                {date: '3', a: 28},
                {date: '4', a: 23},
                {date: '5', a: 18},
                {date: '6', a: 34}],
      histogramData: [{ interval: '-0.10', frequency: 2 },
      { interval: '-0.09', frequency: 2 },
      { interval: '-0.08', frequency: 2 },
      { interval: '-0.07', frequency: 1 },
      { interval: '-0.06', frequency: 2 },
      { interval: '-0.05', frequency: 2 },
      { interval: '-0.04', frequency: 1 },
      { interval: '-0.03', frequency: 4 },
      { interval: '-0.02', frequency: 5 },
      { interval: '-0.01', frequency: 3 },
      { interval: '0.00', frequency: 1 },
      { interval: '0.01', frequency: 3 },
      { interval: '0.02', frequency: 9 },
      { interval: '0.03', frequency: 4 },
      { interval: '0.04', frequency: 6 },
      { interval: '0.05', frequency: 9 },
      { interval: '0.06', frequency: 7 },
      { interval: '0.07', frequency: 5 },
      { interval: '0.08', frequency: 5 },
      { interval: '0.09', frequency: 10 },
      { interval: '0.10', frequency: 8 }],
      returnsObj: {"N":0,
                  "avg_return":0, 
                  "sd":0, 
                  }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({
      ticker0: event.target.value
    });
    console.log("handleChange: ", this.state.ticker0)
  }

  handleSubmit(e) {
    if(e) e.preventDefault();
    this.setState({
      ticker0: '',
      ticker1: this.state.ticker0
    });

    let term = this.state.ticker0;
    const api_key = 'EEKL6B77HNZE6EB4';
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+term+"&apikey="+api_key
    //console.log(url)

    axios.get(url)
    .then(response => {
      //console.log(response.data)
      let lineData = parseData(response.data["Monthly Time Series"]);
      let histogramData = binArray(lineData)
      //console.log(lineData)
      let returnsObj = calcStockReturns(lineData)
      //console.log(returnsObj);
      this.setState((state, props) => {
        return {
          ...state,
          lineData, 
          histogramData,
          returnsObj
        }
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
        <Toolbar>
          <Typography className={classes.tickerTitle} variant="h6" color="inherit" noWrap>
          Stock Viz
          </Typography>

          <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
              <SearchIcon />
              </div>
            <InputBase placeholder="Search..." classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }} onChange={this.handleChange} value={this.state.ticker0}
            />
            </div>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.searchBtn}>
            Submit
          </Button>
        </Toolbar>
        </AppBar>

        <Typography variant="h4" gutterBottom component="h2" className={classes.plotTitle}>
          {this.state.ticker1 === "" ? <div></div> : this.state.ticker1}
        </Typography>

        <Album className={classes.album} 
              annualReturnAverage={this.state.returnsObj.avg_return}
              annualReturnSD={this.state.returnsObj.sd}
              numDataPoints={this.state.returnsObj.N}/>

        <Paper className={classes.paperChart}>
        <Typography variant="h6" gutterBottom component="h4" className={classes.plotTitle}>
          Historical Monthly Returns
        </Typography>

        <ResponsiveContainer width="99%" height={300}>
          <LineChart
                    data={this.state.lineData}
                    margin={{top: 20, right: 10, left: 10, bottom: 5,}}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="a" stroke="#8884d8" activeDot={{ r: 1 }} />
          </LineChart>
        </ResponsiveContainer>
        </Paper>

        <Paper className={classes.paperChart}>
        <Toolbar>
          <Typography className={classes.plotTitle} variant="h6" color="inherit" noWrap>
          Histogram of Annual Returns
          </Typography>

          <div className={classes.infoIcon}>
          <CustomizedDialogDemo infoTitle="Histogram of Annual Returns"/>
          </div>
        </Toolbar>

        <ResponsiveContainer width="99%" height={300}>
        <BarChart
          data={this.state.histogramData}
          margin={{top: 20, right: 10, left: 10, bottom: 5,}}>
        >
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine x="0.00" stroke="red" />
          <Bar dataKey="frequency" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
        </Paper>
      </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
