import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import clsx from "clsx"
import React, { MouseEvent } from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import AuthService from "services/Auth"
import { RootState } from "store"
import { AuthAction, clearAuthUser } from "store/actions/Auth"

interface DispatchProps {
    clearAuthUser: () => AuthAction
}

interface Props extends RouteComponentProps<any>, DispatchProps {}

const OrderHeader: React.FC<Props> = (props) => {
    
    const logout = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        await AuthService.signOut()
        props.clearAuthUser()
        props.history.replace("/")
    }

    const classes = useStyles()

    return (
        <Grid className={classes.userArea} item xs={12}>
            <Avatar
                variant="rounded"
                className={clsx(classes.green, classes.avatar)}
            >
                me
            </Avatar>
            <Button
                onClick={logout}
                variant="outlined"
                href="#"
                color="primary"
            >
                Logout
            </Button>
        </Grid>
    )
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {
    clearAuthUser,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userArea: {
            display: "flex",
        },
        avatar: {
            marginRight: "10px",
        },
        green: {
            background: "#3ab760",
        },
    })
)

export default connect(mapStateToProps, mapDispatchToProps)(OrderHeader)
