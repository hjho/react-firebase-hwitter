import { firestore, storage } from "fbaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4} from "uuid";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const HweetFactory = ({ hwitter }) => {
    const [hweet, setHweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onChange = (event) => {
        const { target: {value}} = event;
        setHweet(value);
    }
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const thisFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(thisFile);
    }
    const onClearAttachment = () => setAttachment("");

    // 파이어베이스 조회.
    /**
     const getHweets = async () => {
         const docsHweets = await getDocs(collection(firestore, "hweets"));
         docsHweets.forEach((snapshot) => {
             const docsHweet = {
                 id: snapshot.id,
                 ...snapshot.data(),
             }
             setHweets((prev) => [docsHweet, ...prev]);
         })
     }
     */
    // 파이어베이스 등록.
    const addHweet = async (event) => {
        event.preventDefault();
        if (hweet === "") {
            return;
        }
        let downloadURL = "";
        if(attachment !== "") {
            // 스토리지 등록.
            const response = await uploadString(
                ref(storage, `${hwitter.uid}/${uuidv4()}`), 
                attachment, 
                "data_url"
            );
            downloadURL = await getDownloadURL(response.ref);
        }

        const newHweet = {
            text: hweet,
            createdAt: Date.now(),
            creatorId: hwitter.uid,
            attachmentUrl: downloadURL
        }
        await addDoc(
            collection(firestore, "hweets"), 
            newHweet
        );

        setHweet("");
        setAttachment("");
    }
    return (
    <form onSubmit={addHweet} className="factoryForm">
        <div className="factoryInput__container">
            <input className="factoryInput__input"
                value={hweet} 
                onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} required/>
            <input type="submit" value="&rarr;" 
                className="factoryInput__arrow"/>
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
            opacity: 0,
        }} />
        {attachment && (
        <div className="factoryForm__attachment">
            <img src={attachment} style={{
                backgroundImage: attachment,
                }} alt=""/>
            <div className="factoryForm__clear" onClick={onClearAttachment} >
                <span>Remove</span>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
        )}
    </form>
    )
}

export default HweetFactory;