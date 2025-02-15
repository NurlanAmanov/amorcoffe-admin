import axios from "axios";

async function Getuser() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Auth")
    return res.data
}
export {Getuser}