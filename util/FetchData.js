// import { useDispatch } from "react-redux";
// import { userActions } from "../src/store/userSlice";
// const fetchData = async (url,token=null)=>{
//     const dispatch = useDispatch();

//     try {
//         const headers = {
//             "Content-Type":"application/json",
//         }
//         if(token){
//             headers.Authorization = 'Bearer ' + token
//         }
//         const res = await fetch(url,{
//             headers
//         });
//         if (res.status !== 200) {
//           throw new Error("Data fetching failed!");
//         }
//         const data = await res.json();
//         dispatch(
//           userActions.updateUserData({
//             ...data.userData,
//           })
//         );
//         setResponse(data);
//       } catch (error) {
//         return error
//       }
// }
// export default fetchData
