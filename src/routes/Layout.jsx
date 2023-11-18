import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul style={{ backgroundColor: "white", display: "flex", listStyle: "none", justifyContent: "center", alignItems: "center"}}>
          <li style={{margin: "0px 10px 0px 10px"}} className="home-link" key="home-button">
            <Link style={{textDecoration: "none", color: "black"}} to="/">
              Home
            </Link>
            </li>
            <li style={{margin: "0px 10px 0px 10px"}}>
             <Link style={{textDecoration: "none", color: "black"}} to="/clothing-form"> Add Clothing </Link>
            </li>
            <li style={{margin: "0px 10px 0px 10px"}}>
           <Link  style={{textDecoration: "none", color: "black"}} to="/catalog-view"> View Wardrobe </Link>
           </li>
           <li style={{margin: "0px 10px 0px 10px"}}>
            <Link  style={{textDecoration: "none", color: "black"}} to="/"> Share </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;