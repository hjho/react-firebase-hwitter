import { firestore } from "fbaseConfig";
import React, { useEffect, useState } from "react";
import { 
    collection,
    orderBy,
    query, 
    //getDocs,
    onSnapshot,
} from "firebase/firestore";
import Hweet from "components/Hweet";
import HweetFactory from "components/HweetFactory";

const Home = ({hwitter}) => {

    const [hweets, setHweets] = useState([]);
    
    // 파이어베이스 조회.
    useEffect(() => {
        // getHweets
        // 파이어베이스 실시간 조회.
        const q = query(
            collection(firestore, 'hweets'), 
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshots) => {
            const docsHweets = snapshots.docs.map(
                (snapshot) => ({
                    id: snapshot.id,
                    ...snapshot.data()
                }
            ));
            setHweets(docsHweets);
        });
    }, []);

// HTML
return (
    <div className="container">
        <HweetFactory hwitter={hwitter}/>
        <div style={{ marginTop: 30 }}>
        {hweets.map((docsHweet) => (
            <Hweet key={docsHweet.id} hweet={docsHweet} isOwner={docsHweet.creatorId === hwitter.uid} />
        ))}
        </div>
    </div>
    )
};

export default Home;