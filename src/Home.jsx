import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

    return (

        <div className="home">

            <h1>My Assignments</h1>

            <Link to="/ASG-01"><button>Assignment 01</button></Link>
            <Link to="/ASG-02"><button>Assignment 02</button></Link>
            <Link to="/ASG-03"><button>Assignment 03</button></Link>
            <Link to="/ASG-04"><button>Assignment 04</button></Link>
            <Link to="/ASG-05"><button>Assignment 05</button></Link>
        </div>

    );

}
