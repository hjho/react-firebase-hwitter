import { firestore, storage } from "fbaseConfig";
import { 
    doc, 
    deleteDoc, 
    updateDoc 
} from "firebase/firestore";
import { 
    ref, 
    deleteObject,
} from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Hweet = ({hweet, isOwner}) => {
    const [isEdit, setEdit] = useState(false);
    const [editText, setEditText] = useState(hweet.text);

    // 파이어베이스 삭제.
    const delHweet = async() => {
        const ok = window.confirm("Are you sure you want to delete this hweet?");
        if(ok) {
            if(hweet.attachmentUrl !== "") {
                // 스토리지 삭제.
                await deleteObject(ref(storage, hweet.attachmentUrl));
            }
            await deleteDoc(doc(firestore, "hweets", hweet.id));
        }
    }

    // 파이어베이스 수정.
    const editHweet = async(event) => {
        event.preventDefault();
        await updateDoc(doc(firestore, "hweets", hweet.id), {
            text: editText
        });
        toggleEditing();
    }

    const toggleEditing = () => setEdit((prev) => !prev);
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setEditText(value);
    };

// HTML
return (
    <div className="nweet">
    {isEdit ? (
        <>
        {isOwner && (
            <>
                <form className="container nweetEdit" onSubmit={editHweet}>
                    <input 
                        value={editText} 
                        onChange={onChange} 
                        type="text" 
                        placeholder="Edit your hweet" 
                        required autoFocus 
                        className="formInput"/>
                    <input type="submit" value="Update Hweet" className="formBtn"/>
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
            </>
        )}
        </>
        ) : (
        <>
            <h4>{hweet.text}</h4>
            {hweet.attachmentUrl && <img src={hweet.attachmentUrl} alt=""/>}
            {isOwner && (
            <div className="nweet__actions">
                <span onClick={delHweet}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </span>
            </div>
            )}
        </>
        )
    }
    </div>
)}

export default Hweet