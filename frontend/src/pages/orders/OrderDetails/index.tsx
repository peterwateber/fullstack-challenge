import DateFnsUtils from "@date-io/date-fns"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import { red } from "@material-ui/core/colors"
import Container from "@material-ui/core/Container"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { OrderCollection, UserState } from "api-contract"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import OrderService from "services/OrderService"
import { RootState } from "store"
import { formatBookingDate } from "utils/OrderUtil"
import "./style.scss"
import getTime from "date-fns/getTime"
import { AuthContext } from "contexts/AuthProvider"
import Alert from "@material-ui/lab/Alert"

interface Props extends RouteComponentProps<any> {
    user: UserState
}

const OrderDetails: React.FC<Props> = (props) => {
    const classes = useStyles()
    const [order, setOrder] = useState<Partial<OrderCollection>>({})
    const [loading, setLoading] = useState(true)
    const [uid, setUid] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [title, setTitle] = useState("")
    const [formButton, setFormButton] = useState(false)
    const [showEditSwitch, setShowEditSwitch] = useState(false)
    const { setGeneralError }: any = useContext(AuthContext)

    const handleToggle = () => () => {
        setEditMode(!editMode)
    }

    const handleDateChange = (value: Date | null) => {
        setSelectedDate(value)
    }

    const handleTitleChange = (value: string) => {
        setTitle(value)
    }

    const isFormInvalid = useCallback(() => {
        const parsedDate = getTime(new Date(selectedDate || ""))
        return !Boolean(title) || !Boolean(parsedDate)
    }, [selectedDate, title])

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const parsedDate = getTime(new Date(selectedDate || "")).toString()
        const result = await OrderService.updateOrderDetails(
            props.user.token || "",
            uid,
            title,
            parsedDate
        )
        if (result?.error) {
            setGeneralError(result?.title, result?.message)
        } else {
            setEditMode(false)
            setOrder({
                ...order,
                title,
                bookingDate: formatBookingDate(parsedDate),
            })
        }
    }

    useEffect(() => {
        setUid(window.location.pathname.substr(1).split("/")[1])
    }, [])

    useEffect(() => {
        setFormButton(isFormInvalid())
    }, [isFormInvalid])

    useEffect(() => {
        if (editMode) {
            setSelectedDate(order?.bookingDate || null)
            setTitle(order?.title || "")
        }
    }, [editMode, order])

    useEffect(() => {
        async function fetch() {
            const order = await OrderService.getOrderDetails(
                props.user.token,
                uid
            )
            if (
                typeof order !== "undefined" &&
                Boolean(Object.values(order).length)
            ) {
                setOrder({
                    ...order,
                    bookingDate: formatBookingDate(order?.bookingDate),
                })
            }
            setShowEditSwitch(Boolean(Object.values(order || {}).length))
            setLoading(false)
        }
        if (uid) fetch()
    }, [uid, props])

    return (
        <div className="wrapper">
            <Container maxWidth="lg">
                <form onSubmit={handleFormSubmit}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                >
                                    {order?.customer?.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </Avatar>
                            }
                            action={
                                !loading &&
                                showEditSwitch && (
                                    <div className={classes.actionArea}>
                                        <Switch
                                            edge="start"
                                            onChange={handleToggle()}
                                            checked={editMode}
                                            inputProps={{
                                                "aria-labelledby":
                                                    "switch-list-label-editMode",
                                            }}
                                        />
                                    </div>
                                )
                            }
                            title={order?.customer?.name || ""}
                            subheader={
                                !editMode ? (
                                    order?.bookingDate
                                ) : (
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            id="date-picker-dialog"
                                            label="Edit booking date"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            InputLabelProps={{
                                                shrink: Boolean(
                                                    order?.bookingDate
                                                ),
                                            }}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                )
                            }
                        />
                        <CardContent>
                            {!loading &&
                                !Boolean(Object.values(order || {}).length) && (
                                    <Alert severity="info">
                                        No order found
                                    </Alert>
                                )}
                            {!editMode ? (
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {order?.title}
                                </Typography>
                            ) : (
                                <TextField
                                    required
                                    id="email"
                                    label="Edit Title"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink:
                                            Boolean(order?.title) ||
                                            Boolean(title),
                                    }}
                                    error={!Boolean(title)}
                                    helperText="Title cannot be blank."
                                    value={title}
                                    onChange={(e) =>
                                        handleTitleChange(e.target.value)
                                    }
                                    className={classes.formInput}
                                />
                            )}

                            {Boolean(order?.customer?.phone) && (
                                <Typography color="textSecondary">
                                    {order?.customer?.phone}
                                </Typography>
                            )}
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                dangerouslySetInnerHTML={{
                                    __html: order?.fullAddress || "",
                                }}
                            />
                            {editMode && (
                                <Button
                                    type="submit"
                                    className={classes.button}
                                    variant="contained"
                                    disableElevation
                                    disabled={formButton}
                                >
                                    <span className={classes.buttonLabel}>
                                        Update
                                    </span>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </form>
            </Container>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            margin: "0 auto",
        },
        actionArea: {
            fontSize: "12px",
        },
        avatar: {
            backgroundColor: red[500],
        },
        formInput: {
            marginBottom: 15,
        },
        button: {
            color: "white",
            background:
                "linear-gradient(130deg, #0095b6 20%, #0095b6 0%, #0095b6 30%, #00d48a 90%)",
            transition: "opacity 0.2s ease-in-out",
            marginTop: "15px",
            width: "100%",

            "&:hover": {
                background:
                    "linear-gradient(130deg, #0095b6 10%, #0095b6 0%, #0095b6 20%, #00d48a 70%)",
                opacity: 0.9,
            },
        },
        buttonLabel: {
            fontFamily: "Spartan, sans-serif",
            textTransform: "none",
        },
    })
)

export default connect(mapStateToProps)(OrderDetails)
