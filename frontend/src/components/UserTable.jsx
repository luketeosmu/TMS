import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText, Stack, Chip, Switch } from '@mui/material';
import { useState, useEffect } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import axios from 'axios';
// import dotenv from 'dotenv';

const UserTable = ({ users, setUsers, groups }) => {

  const [groupName, setGroupName] = useState([]);
  const [tempGroupName, setTempGroupName] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [editedUsername, setEditedUsername] = useState('');

  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedState, setUpdatedState] = useState(true);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGroupName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTempGroupChange = (event) => {
    const {
      target: { value },
    } = event;
    setTempGroupName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleEdit = (user) => {
    setEditedUsername(user.User_Username);
    setUpdatedState(user.User_Active);
    setUpdatedEmail(user.User_Email);
    setTempGroupName(user.Groups.split(','));
    // console.log(user);
  }

  const handleDelete = (event, value) => {
    event.preventDefault();
    setTempGroupName((groups) => groups.filter((group) => group !== value));
  }

  const handleSaveChange = (event) => {
    event.preventDefault();

    console.log("edited username: " + editedUsername);
    console.log("updated groups: " + tempGroupName);
    console.log("updated email: " + updatedEmail);
    const updatedUser = {
      "User_Username": editedUsername,
      "User_Email": updatedEmail,
      "User_Active": updatedState,
      "Groups": tempGroupName.join(',')
    }
    
    axios.patch('http://localhost:3000/users/' + '/updateUser', {
      "User_Username": editedUsername,
      "User_Email": updatedEmail,
      "User_Active": updatedState,
      "User_Groups": tempGroupName.join(',')
    }).then((res) => {
      if(res.data.success) {
        setUsers((users) => users.map((user) => user.User_Username === editedUsername ? updatedUser : user));
        setEditedUsername('');
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  // useEffect(() => {

  // }, [editedUsername])

  return (
    <Container>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="left">Groups</TableCell>
              <TableCell align="left">Account Status</TableCell>
              <TableCell align="left">Password</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField id="outlined-basic" label="Username" variant="outlined" sx={{width: 1}}/>
              </TableCell>
              <TableCell>
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width: 1}}/>
              </TableCell>
              <TableCell>
                {/* <TextField id="outlined-basic" label="Group" variant="outlined" sx={{width: 1}}/> */}
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="select-groups-label" sx={{ width: 100}}>Groups</InputLabel>
                  <Select
                    labelId="select-groups-label"
                    id="select-groups"
                    multiple
                    value={groupName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Groups" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {groups.map((group) => (
                      <MenuItem key={group} value={group}>
                        <Checkbox checked={groupName.includes(group)} />
                        <ListItemText primary={group} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField id="outlined-basic" label="Account Status" variant="outlined" sx={{width: 1}}/>
              </TableCell>
              <TableCell>
                <TextField id="outlined-basic" label="Password" variant="outlined" sx={{width: 1}}/>
              </TableCell>
              <TableCell>
                <Button>Add User</Button>
              </TableCell>
            </TableRow>
            {users.map((user) => 
            
            user.User_Username !== editedUsername ? 

            <TableRow>
              <TableCell>{user.User_Username}</TableCell>
              <TableCell>{user.User_Email ? user.User_Email : "-"}</TableCell>
              <TableCell>{user.Groups}</TableCell>
              <TableCell>{user.User_Active ? "Active" : "Inactive"}</TableCell>
              <TableCell><Button>Reset Password</Button></TableCell>
              <TableCell><Button onClick={() => handleEdit(user)}>Edit</Button></TableCell>
            </TableRow> 

            :

            <TableRow>
              <TableCell>{user.User_Username}</TableCell>
              <TableCell>
                <TextField id="outlined-basic" placeholder={user.User_Email ? user.User_Email : '-'} variant="outlined" sx={{width: 1}} value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)}/>
              </TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Group</InputLabel>
                    <Select
                      multiple
                      value={tempGroupName}
                      onChange={handleTempGroupChange}
                      input={<OutlinedInput label="Groups" />}
                      renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              onDelete={(event) =>
                                handleDelete(event, value)
                              }
                              deleteIcon={
                                <CancelIcon
                                  onMouseDown={(event) => event.stopPropagation()}
                                />
                              }
                            />
                          ))}
                        </Stack>
                      )}
                    >
                      {groups.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          sx={{ justifyContent: "space-between" }}
                        >
                          {name}
                          {selectedNames.includes(name) ? <CheckIcon color="info" /> : null}
                        </MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Switch defaultChecked size="small" checked={updatedState} onChange={() => setUpdatedState(!updatedState)}/>
              </TableCell>
              <TableCell><Button>Reset Password</Button></TableCell>
              <TableCell>
                <Button onClick={(e) => handleSaveChange(e)}>Save</Button>
              </TableCell>
            </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserTable