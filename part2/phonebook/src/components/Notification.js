const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const style = {
        padding: '0.5rem',
        backgroundColor: 'lawngreen',
        border: '1px solid black',
        borderRadius: '0.25rem'
    }

    return (
        <p className="notification" style={style}>
            {message}
        </p>
    )
}

export default Notification
