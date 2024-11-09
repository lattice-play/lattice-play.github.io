import "../css/Pane.css";

export default function Pane({ image, header, info, type, color }) {
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
        } else {
            return { backgroundColor: `${color}` };
        }
    }

    const paneStyle = getStylingForType(type);
    console.log(paneStyle);

    return (
        <a className="pane-wrapper" style={paneStyle}>
            <h1 className="pane-header">{header}</h1>
            <p className="pane-information">{info}</p>
        </a>
    );
}
