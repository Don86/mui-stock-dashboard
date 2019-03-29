import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    cardGrid: {
      padding: `${theme.spacing.unit * 3}px 0`,
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
});

function Album(props) {
    const { classes } = props;
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          <Grid sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h8" component="h8">
                    Average Annual Return
                </Typography>
                <Typography variant="h2" component="h2">
                    {props.annualReturnAverage}
                </Typography>
                </CardContent>
            </Card>
          </Grid>

          <Grid sm={6} md={4} lg={3}>
          <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h8" component="h8">
                  Standard Deviation of Annual Returns
              </Typography>
              <Typography variant="h2" component="h2">
                  {props.annualReturnSD}
              </Typography>
              </CardContent>
          </Card>
          </Grid>

          <Grid sm={6} md={4} lg={3}>
          <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h8" component="h8">
                  No. of Data Points
              </Typography>
              <Typography variant="h2" component="h2">
              {props.numDataPoints}
              </Typography>
              </CardContent>
          </Card>
          </Grid>
        </Grid>
      </div>
    )}

Album.propTypes = {classes: PropTypes.object.isRequired,};
export default withStyles(styles)(Album);