import React from 'react'
import { Skeleton, List } from 'antd'








export const PricesSkeleton = () => {

    const skeleton = [];

    for (let i = 0; i < 5; i++) {
        skeleton.push(<div key={i} style={{ margin: "5px", borderRadius: "2px", height: "390px", width: "270px", backgroundColor: "white", boxSizing: "content-box", padding: "10px" }}>
            <Skeleton>
                <List.Item.Meta
                    title={"enfowelf"}
                    description={"fjlwenflwef"}
                />
            </Skeleton>
        </div>)
    }
    
    return <div>
        {skeleton}
    </div>
}


