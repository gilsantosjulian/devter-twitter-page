export const addOpacityToColor = (color, opacity) => {
    const opacityHex = Math.round(opacity * 255).toString(16)
    console.log(opacityHex);
    return `${color}${opacityHex}`
}