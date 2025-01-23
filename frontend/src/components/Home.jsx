import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate  } from 'react-router-dom';
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
];

// export default function MultipleSelectCheckmarks() {
  
//   return (
    
//   );
// }

const Home = () => {
  
  const navigate = useNavigate();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;
  //check user logged in if yes display page if no redirect to login page
  useEffect(() => {
    //check authorization
    console.log("check authorization");
    axios.post('http://localhost:3000/auth/protected')
    .then((res) => {
      console.log(res);
      if(!res.data.success) {
        console.log("unauthorized");
        return navigate("/login");
      }
      console.log(res);
    }).catch((error) => {
      console.log(error);
      return navigate("/login");
    })
  }, [])
  
  return (
    <div>
      home page
      {/* <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  )
}

export default Home