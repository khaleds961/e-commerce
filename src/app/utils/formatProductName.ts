export const formatProductName = (name: string, length: number = 20) => {
    if(name.length > length) {
        return name.slice(0, length) + "...";
    }
    return name;
}

