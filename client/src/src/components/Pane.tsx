import "./css/Pane.css";

export default function Pane(
    { image }: { image: string },
    { header }: { header: string },
    { info }: { info: string },
    { type }: { type: PaneType },
    { color }: { color: string }
) {
    function getStylingForType(type: PaneType): Object {
        if (type == PaneType.Faded) {
            return {
                style: `background: radial-gradient(
                    circle at bottom-right,
                    #00001c,
                    ${color}`,
            };
        } else {
            return { style: `background-color: ${color}` };
        }
    }

    const paneStyle: Object = getStylingForType(type);

    return (
        <div className="pane-wrapper" style={paneStyle}>
            <img className="pane-image" src={image} />
            <h1 className="pane-header">{header}</h1>
            <p className="pane-infomation">{info}</p>
        </div>
    );
}
