import { useNavigate } from "react-router-dom"
import errorImg from "../../assets/error.jpg"

export default function Error () {
    const navigate = useNavigate();
    return(
        <div className="d-flex flex-column w-100 justify-content-center">
            <img className="error-img" src={errorImg} alt="err" />
            <h5 onClick={()=> navigate("/home")} className="text-center cursor-pointer">Back to Home</h5>
        </div>
    )
}