import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserTable = ({ users }) => {
  return (
    <Container>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="left">Group</TableCell>
              <TableCell align="left">Account Status</TableCell>
              <TableCell align="left">Password</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.User_Username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.User_Username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.email ? user.email : "-"}
                </TableCell>
                <TableCell align="left">groups</TableCell>
                <TableCell align="left">{user.accountStatus ? "Active" : "Inactive"}</TableCell>
                <TableCell align="left">Reset Password button</TableCell>
                <TableCell align="left">Edit/Save changes</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserTable