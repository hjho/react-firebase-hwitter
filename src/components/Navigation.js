import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navigation({ hwitter }) {
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <li>
                    <Link to="/react-firebase-hwitter" tyle={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                    </Link>
                </li>
                <li>
                    <Link to="/react-firebase-hwitter/profile" 
                        style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}>
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style={{ marginTop: 10 }}>
                            {hwitter.displayName
                            ? `${hwitter.displayName}의 Profile`
                            : "Profile"}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;