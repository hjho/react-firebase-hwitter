import { auth, firestore } from "fbaseConfig";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Profile({ refreshHwitter, hwitter }) {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(hwitter.displayName);
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewDisplayName(value);
    }
    const onLogOutClick = () => {
        auth.signOut();
        history.push("/react-firebase-hwitter");
    };
    const getMyProfile = async () => {
        const q = query(
            collection(firestore, "hweets"),
            where("creatorId", "==", hwitter.uid),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
        });
    }
    // 유저 프로필 수정.
    const setProfile = async (event) => {
        event.preventDefault();
        if(hwitter.displayName !== newDisplayName) {
            await updateProfile(
                auth.currentUser, 
                { displayName: newDisplayName }
            );
            refreshHwitter();
        }
    }
    useEffect(() => {
        getMyProfile();
    })

    return (
        <div className="container">
            <form onSubmit={setProfile} className="profileForm">
                <input type="text" placeholder="Display name" 
                    autoFocus
                    className="formInput"
                    value={newDisplayName} 
                    onChange={onChange}
                />
                <input type="submit" value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" 
                onClick={onLogOutClick}
            >
                Log Out
            </span>
        </div>
    );
}

export default Profile;