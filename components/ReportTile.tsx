import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { Report } from '../interfaces/Report'

interface Props {
  report: Report
}

export default function ReportTile({report}: Props) {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        
        <TableHead>
          <TableRow>
            <TableCell> <Typography fontWeight={600}>game id</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>assists</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>goals</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>attendance</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>man of the match</Typography>  </TableCell>
            <TableCell> <Typography fontWeight={600}>involvement</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>attitude</Typography> </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          <TableRow>
            <TableCell>{report.game_id}</TableCell>
            <TableCell>{report.assists}</TableCell>
            <TableCell>{report.goals}</TableCell>
            <TableCell>{report.attendance}</TableCell>
            <TableCell>{report.man_of_the_match}</TableCell>
            <TableCell>{report.involvement}</TableCell>
            <TableCell>{report.attitude}</TableCell>
          </TableRow>
        </TableBody>

      </Table>
    </TableContainer>
  )
}
