export const theme = {
    flexStyles: (direction: string, align: string, justify: string) => (
        `display: flex; 
        flex-direction: ${direction};
        align-items: ${align}; 
        justify-content: ${justify};`
    )
}