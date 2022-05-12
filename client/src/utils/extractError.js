export const isError = payload => {
    console.log(payload)
    const includesError = Object.keys(payload)?.includes("error");
    return includesError;
}

export const extractError = payload => {
   return payload["error"]
}