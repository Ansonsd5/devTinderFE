import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constant/urls";
import FeedCard from "./FeedCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
  
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
  const [about, setAbout] = useState(user.about || '');
  const [skills,setSkills] = useState(user.skills || []);
  const [errmsg,setErrMsg] = useState("");
  const [successMsg,setSuccessMsg] = useState("");

  const dispatch = useDispatch();





  const handleInput = (e) => {
    setAge( e.target.value);
  };

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 4000);
  
      return () => clearTimeout(timer); 
    }
  }, [successMsg]);

  const updateProfile = async () => {
    const data = {
      age,
      gender,
      photoUrl,
      about,
      skills,
    };
    try {
      if (!data) return ;
      setErrMsg("");
     const res =  await axios.patch(`${BASE_URL}/profile/edit`,data , { withCredentials: true });
     console.log("after update",res.data)
     dispatch(addUser(res.data));
     setSuccessMsg(res.data.message)
   
      console.log("inside try",res)
  
    } catch (error) {
      console.log("error.details",error.response.data.message)
      setErrMsg(error.response.data.message);
    }
  };

  return (
    <div>
      <button
        className="btn btn-info capitalize"
        onClick={() => {
          setIsEdit(true);
        }}
      >
        edit profile
      </button>
      {isEdit && (<div className="flex gap-2">
        <div className="card card-border bg-base-200 w-96 mx-auto mt-4">
          <div className="card-body">
            <h2 className="card-title capitalize justify-center">
              Edit your profile deatils
            </h2>
            <div className="flex gap-4 flex-col">
            <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  className="input capitalize"
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  disabled
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  name="lastname"
                 
                  className="input capitalize"
                  placeholder="Enter your Last name"
                  onChange={(e) => setlastName(e.target.value)}
                  value={firstName}
                  disabled
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  name="age"
                  min={18}
                  max={100}
                  className="input"
                  placeholder="Enter your age"
                  onChange={(e) => handleInput(e)}
                  value={age}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <div className="flex gap-6">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio radio-primary"
                      checked ={gender==='male'}
                      onChange={(e)=>{setGender(e.target.value)}}
                    />
                    <span className="p-2">Male</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="radio radio-primary"
                      checked={gender ==='female'}
                      onChange={(e)=>{setGender(e.target.value)}}
                    />
                    <span className="p-2">Female</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      className="radio radio-primary"
                      checked={gender ==='others'}
                      onChange={(e)=>{setGender(e.target.value)}}
                    />
                    <span className="p-2">Others</span>
                  </label>
                </div>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo Url</legend>
              <input
                type="text"
                name="photopurl"
                className="input"
                placeholder="Enter your photo url"
                value={photoUrl}
                onChange={(e)=>{setPhotoUrl(e.target.value)}}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                name="photopurl"
                className="input"
                placeholder="Describe yourself"
                value={about}
                onChange={(e)=>{setAbout(e.target.value)}}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                name="photopurl"
                className="input"
                placeholder="Enter your skills"
                value={skills}
                onChange={(e)=>{setSkills(e.target.value)}}
              />
            </fieldset>
            {errmsg && <div className="text-red-400 text-center">{errmsg}</div>}
            <div className="card-actions justify-center pt-4">
            <button className="btn btn-primary" onClick={updateProfile}>Update</button>
            
          </div>

          </div>
         
        </div>
         {user && <FeedCard user={{firstName,lastName,age,gender,about,skills,photoUrl}}/>}
         </div>)}

         {successMsg && <div className="toast toast-end toast-top">
        <div className="alert alert-success">
          <span>{successMsg}</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
