export const theme = {
    flexStyles: (direction: string, align: string, justify: string) => (
        `display: flex; 
        flex-direction: ${direction};
        align-items: ${align}; 
        justify-content: ${justify};
        `
    ),
    red: "#f53b11",
    blue: "#0f6df2"
}