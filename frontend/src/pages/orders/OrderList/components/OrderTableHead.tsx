import { createStyles, makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import React from "react"
import { DataType, Order } from "../types/Common"

interface HeadCell {
    disablePadding: boolean
    id: keyof DataType
    label: string
    numeric: boolean
}

interface OrderTableHeadProps {
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof DataType
    ) => void
    order: Order
    orderBy: string
}

const headCells: HeadCell[] = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "bookingDate",
        numeric: true,
        disablePadding: false,
        label: "Booking Date",
    },
    { id: "address", numeric: true, disablePadding: false, label: "Address" },
    { id: "customer", numeric: true, disablePadding: false, label: "Customer" },
]

const OrderTableHead = (props: OrderTableHeadProps) => {
    const classes = useStyles()
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property: keyof DataType) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1,
        },
    })
)

export default OrderTableHead
