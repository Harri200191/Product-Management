import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authslice";
import "./profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authservice";
import ChangePassword from "../../components/changePassword/ChangePassword";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import profilePic from "../../assets/profilepic.png"

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  let flag = false;

  const handleImageChange = (e) => {
    if (flag){
      setProfileImage(e.target.files[0]);
    }
    else{
      setProfileImage(profilePic);
    };
  };

  const handleRemoveFile = () => {
    flag = false;
    setProfileImage(null);
    document.getElementById('image-input').value = '';
  };

  const [userPhoto, setUserPhoto] = useState(user?.photo);

  const handleImageChangeForDisplay = () => {
    setUserPhoto(profilePic); 
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if ( 
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        if (profileImage === profilePic){
          flag = false;
        }
        else{
          flag = true;
        }
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dmyeggcco");
        image.append("upload_preset", "bc3mopvw");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmyeggcco/image/upload", 
          { method: "post", body: image }
        );
        console.log(response);
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }

        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        if (formData.name === "" || formData.phone === "" || formData.bio === ""){
          toast.error("Can't Leave Fields Empty");
          setIsLoading(false);
        }
        else{
          const data = await updateUser(formData); 
          toast.success("User updated");
          navigate("/profile");
          setIsLoading(false);
        }
      
    } catch (error) { 
        console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo-2">
          {useEffect===profilePic ? (
            flag = true,
            <img src={user?.photo} alt="profilepic" />
          ): (
            <img src={userPhoto} alt="profilepic"/>
          )
        }
          
          <br />
          <button className="--mybtn4" onClick={handleImageChangeForDisplay}>Clear Image</button>
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
             
              <p className="email-temp">Email cannot be changed.</p>
            </p>
            <p>
              <label>Phone:</label>
              <PhoneInput
                  name= 'phone'
                  country={'us'}
                  value={profile?.phone}
                  onChange={(value) => {setProfile({ ...profile, ["phone"]: value });}}
                  countryCodeEditable={false}
              />
            </p>
            <p>
              <label>Bio:</label>
              <br/>
              <textarea
                className="textare"
                name="bio"
                placeholder="Enter your bio here.."
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" accept=".jpg, .jpeg, .png" id="image-input" onChange={(e) => handleImageChange(e)} />
              {profileImage && (
                <span>
                  {profileImage.name} 
                  <button className="remove-button" onClick={handleRemoveFile}>
                    &#10006;
                  </button>
                </span>
              )
            }
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;