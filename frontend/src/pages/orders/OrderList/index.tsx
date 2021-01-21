import Container from "@material-ui/core/Container"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import OrderHeader from "../OrderHeader"
import OrderTableHead from "./components/OrderTableHead"
import OrderTableBody from "./components/OrderTableBody"
import "./style.scss"
import { DataType, Order } from "./types/Common"
import { tableRowDisplay } from "./utils/TableDisplayUtils"
import { connect } from "react-redux"
import { RootState } from "store"
import { OrderResultState, UserState } from "api-contract"
import { getAllOrders } from "store/actions/Order"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"

interface DispatchProps {
    getAllOrders: (
        token: string | undefined
    ) => ThunkAction<any, any, any, Action>
}

interface Props extends RouteComponentProps<any>, DispatchProps {
    user: UserState
    orderList: OrderResultState
}

const OrderList: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { orderList } = props

    const [order, setOrder] = useState<Order>("asc")
    const [orderBy, setOrderBy] = useState<keyof DataType>("title")
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(0)

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof DataType
    ) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked)
    }

    useEffect(() => {
        setRowsPerPage(orderList.order.length > 0 ? 5 : 0)
    }, [orderList.order])

    useEffect(() => {
        async function fetch() {
            props.getAllOrders(props.user.token)
        }
        fetch()
    }, [props.user])

    return (
        <div className="wrapper">
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <OrderHeader {...props} />
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Toolbar className={classes.title}>
                                <Typography
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Booking list
                                </Typography>
                            </Toolbar>
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size={dense ? "small" : "medium"}
                                    aria-label="enhanced table"
                                >
                                    <OrderTableHead
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                        rowCount={orderList.total}
                                    />
                                    <OrderTableBody
                                        rows={orderList.order.map((o) =>
                                            tableRowDisplay(o)
                                        )}
                                        order={order}
                                        orderBy={orderBy}
                                        dense={dense}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        {...props}
                                    />
                                </Table>
                            </TableContainer>
                            {orderList.order.length > 0 && (
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15, 25]}
                                    component="div"
                                    count={orderList.total}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                />
                            )}
                        </Paper>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={dense}
                                    onChange={handleChangeDense}
                                />
                            }
                            label="Dense padding"
                        />
                    </div>
                </Grid>
            </Container>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        paper: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 800,
            maxWidth: 800  
        },
        title: {
            padding: 0,
        },
    })
)

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
    orderList: state.orderList.orderList,
})

const mapDispatchToProps = {
    getAllOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
