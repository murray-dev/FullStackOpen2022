const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const messageText = message.message
    const messageType = message.messageType

    const colorMap = {
        'confirm': 'lawngreen',
        'error' : 'red',
    }

    const style = {
        padding: '0.5rem',
        backgroundColor: colorMap[messageType],
        border: '1px solid black',
        borderRadius: '0.25rem'
    }

    return (
        <p className="notification" style={style}>
            {messageText}
        </p>
    )
}

export default Notification
