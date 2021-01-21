import Avatar from "@material-ui/core/Avatar"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import { red } from "@material-ui/core/colors"
import Container from "@material-ui/core/Container"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Typography from "@material-ui/core/Typography"
import { OrderCollection, UserState } from "api-contract"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import OrderService from "services/OrderService"
import { RootState } from "store"
import { formatBookingDate } from "utils/OrderUtil"
import "./style.scss"

interface Props extends RouteComponentProps<any> {
    user: UserState
}

const OrderDetails: React.FC<Props> = (props) => {
    const classes = useStyles()
    const [order, setOrder] = useState<Partial<OrderCollection>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetch() {
            try {
                const uid = window.location.pathname.substr(1).split("/")[1]
                const order = await OrderService.getOrderDetails(
                    props.user.token,
                    uid
                )
                if (Boolean(Object.values(order).length)) {
                    setOrder({
                        ...order,
                        bookingDate: formatBookingDate(order?.bookingDate),
                    })
                    setLoading(false)
                }
            } catch (ex) {}
        }
        fetch()
    }, [])

    const [expanded, setExpanded] = useState(false)

    const [checked, setChecked] = useState([""])

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    if (!loading && !Boolean(Object.values(order || {}).length)) {
        return null
    }

    return (
        <div className="wrapper">
            <Container maxWidth="lg">
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
                            !loading && (
                                <div className={classes.actionArea}>
                                    <Switch
                                        edge="start"
                                        onChange={handleToggle("editMode")}
                                        checked={
                                        checked.indexOf("editMode") !== -1
                                        }
                                        inputProps={{
                                            "aria-labelledby":
                                                "switch-list-label-editMode",
                                        }}
                                    />
                                </div>
                            )
                        }
                        title={order?.customer?.name || ""}
                        subheader={order?.bookingDate}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {order?.title}
                        </Typography>
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
                    </CardContent>
                </Card>
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
    })
)

export default connect(mapStateToProps)(OrderDetails)
