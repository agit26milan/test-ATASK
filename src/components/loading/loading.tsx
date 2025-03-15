import React from 'react'
import "./styles/loading-styles.css"

const LoadingComponent = () => {
    return (
    <div className="overlay" id="loadingOverlay">
        <div className="spinner"></div>
    </div>
    )
}


export default LoadingComponent