import "../css/Pane.css";
import { useState, useEffect } from "react";

export default function Pane({ image, header, info, type, color, to }) {
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        setIsImage(type === "image");
    }, []);

    function getStylingForType(type) {
        if (type == "standard") {
            return {
                backgroundColor: `${color}`,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            };
        } else if (type == "bordered") {
            return {
                border: `2px solid ${color}`,
            };
        } else if (type == "words") {
            return {
                backgroundColor: `${color}`,
                justifyContent: "center",
                alignItems: "start",
            };
        } else {
            return { backgroundColor: `${color}` };
        }
    }

    const paneStyle = getStylingForType(type);

    return (
        <a className="pane-wrapper" style={paneStyle} href={to}>
            <h1 className="pane-header">{header}</h1>
            <p className="pane-information">{info}</p>
            <img
                className={isImage ? "pane-image" : "pane-hidden-image"}
                src={image}
            />
        </a>
    );
}
