export default function Item(props) {
    return(
        <div className="item">
            <div className="item_name">{props.name}</div>
            <div className="item_status">{props.status}</div>
        </div>
    )
}