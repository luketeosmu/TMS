import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, TextField, Button } from '@mui/material';
const GroupsTable = ({ groups }) => {
  return (
    <Container sx={{ mb: 5 }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Group Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField id="outlined-basic" label="Group Name" variant="outlined" sx={{width: 1}}/>
              </TableCell>
              <TableCell>
                <Button>Add Group</Button>
              </TableCell>
            </TableRow>
            {groups.map((group) => (
              <TableRow key={group}>
                <TableCell component="th" scope="row">
                  {group}
                </TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default GroupsTable