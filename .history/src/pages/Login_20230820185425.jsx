import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]; // Use e.target[3].files[0] to get the selected file

    
    catch (error) {
            console.error("Error updating profile:", error);
            setErr(true);
          }
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            className="fileUpload"
          />
          <label htmlFor="file" className="fileSvg">
            {" "}
          </label>
          <button>Sign In</button>
        </form>
        <p>
          You don't have an account?{" "}
          <span>
            {" "}
            <Link to={"/signUp"}>Register</Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
