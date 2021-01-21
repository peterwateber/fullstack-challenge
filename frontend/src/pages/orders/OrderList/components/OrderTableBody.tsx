import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { formatBookingDate } from "utils/OrderUtil"
import "../style.scss"
import { Order, OrderBy } from "../types/Common"
import {
    createTableData,
    getComparator,
    stableSort
} from "../utils/TableDisplayUtils"

interface Props extends RouteComponentProps<any> {
    rows: Array<ReturnType<typeof createTableData>>
    order: Order
    orderBy: OrderBy
    dense: boolean
    rowsPerPage: number
    page: number
}

const OrderTableBody: React.FC<Props> = (props) => {
    const { dense, order, orderBy, rows, rowsPerPage, page } = props
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    const handleSelectedRow = (
        event: React.MouseEvent<unknown>,
        uid: string
    ) => {
        props.history.push(`order/${uid}`)
    }
    return (
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                        <TableRow
                            hover
                            onClick={(event) =>
                                handleSelectedRow(event, row.id)
                            }
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                        >
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row.title}
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="overline" display="block">
                                    {formatBookingDate(row.bookingDate)}
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="right"
                                dangerouslySetInnerHTML={{
                                    __html: (row.address || "").replace(
                                        /[<br/>]/g,
                                        ""
                                    ),
                                }}
                            />
                            <TableCell align="right">{row.customer}</TableCell>
                        </TableRow>
                    )
                })}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}

export default OrderTableBody
