import React from 'react'

export const SectionHeader = ({children, color = "black"}: {children: string, color?: string}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: "center", width: "100%", margin: "25px 0 25px 0" }}>
            <h1 style={{ fontSize: "40px", color }}>{children}</h1>
        </div>
    )
}
