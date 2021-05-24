import React, { useEffect, useState } from "react";


const ChannelsBar = ({server}) => {
    const channels = server.channels
    return(
        <div>
            {channels.map(channel => {
                return (
                    <div>
                        {channel.name}
                    </div>
                )
            })}
        </div>
    )

}

export default ChannelsBar