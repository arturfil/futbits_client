import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { Report } from '../interfaces/Report'

interface Props {
  reports: Report[]
}

export default function ReportTile({reports}: Props) {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> <Typography fontWeight={600}>game id</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>team side</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>user id</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>player name</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>goals</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>assists</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>won</Typography> </TableCell>
            <TableCell> <Typography fontWeight={600}>man of the match</Typography>  </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        { reports.map(report => (
          <TableRow key={report.id}>
            <TableCell>{report.id}</TableCell>
            <TableCell>{report.team_side}</TableCell>
            <TableCell>{report.user_id}</TableCell>
            <TableCell>{report.player_name}</TableCell>
            <TableCell>{report.goals}</TableCell>
            <TableCell>{report.assists}</TableCell>
            <TableCell>{report.won ? "YES" : "NO"}</TableCell>
            <TableCell>{report.man_of_the_match ? "YES" : "NO"}</TableCell>
           </TableRow>
        ))}
        </TableBody>
       
      </Table>
    </TableContainer>
  )
}
