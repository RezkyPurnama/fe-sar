const Alert = ({ type = 'info', message, onClose, className = '' }) => {
    if (!message) return null

    const typeStyles = {
        success: 'bg-green-50 border-green-400 text-green-800',
        error: 'bg-red-50 border-red-400 text-red-800',
        warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
        info: 'bg-blue-50 border-blue-400 text-blue-800',
    }

    return (
        <div
            className={`border-l-4 p-4 rounded-r-md flex justify-between items-center ${typeStyles[type] || typeStyles.info} ${className}`}>
            <div className="text-sm">{message}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    type="button"
                    className="ml-4 text-gray-500 hover:text-gray-800 focus:outline-none">
                    &times;
                </button>
            )}
        </div>
    )
}

export default Alert
