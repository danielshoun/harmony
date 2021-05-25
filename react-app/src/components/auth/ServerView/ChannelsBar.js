import React, { useEffect, useState } from "react";
import './ChannelsBar.css'


const ChannelsBar = ({server}) => {
    const channels = server.channels
    const [activeChannel, setActiveChannel] = useState(null)

    const handleActive = (channel) => {
        setActiveChannel(channel)
    }

    return(
        <>
            <div className='server-header'>{server.name}</div>
            <div className='channels-bar'>
                {channels.map(channel => {
                    return (
                        <div
                        className={`channel${activeChannel === channel ? " active-channel" : ''}`}
                        onClick={() => handleActive(channel)}
                        >
                            ＃{channel.name}
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default ChannelsBar