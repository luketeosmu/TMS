import { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //check user logged in if yes display page if no redirect to login page
  useEffect(() => {
    
  }, [])
  
  return (
    <div>
      <div className="dropdown">
        <button class="btn btn-secondary dropdown-toggle"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul class="dropdown-menu">
          {/* <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li> */}
          <li><label><input type="checkbox" name="test1" id="" />test 1</label></li>
          <li><label><input type="checkbox" name="test1" id="" />test 1</label></li>
          <li><label><input type="checkbox" name="test1" id="" />test 1</label></li>
        </ul>
      </div>
      <div class="dropdown">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown link
        </a>

        <ul class="dropdown-menu">
          <li>
            <label>
              <input type="checkbox" name="test1" id="" /> test 1
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="test1" id="" /> test 2
            </label>
          </li>
          {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
        </ul>
      </div>
    </div>
  )
}

export default Home