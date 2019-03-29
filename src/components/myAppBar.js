import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


function myAppBar() {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.appbarTitle} variant="h6" color="inherit" noWrap>
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
    )
};

export default myAppBar