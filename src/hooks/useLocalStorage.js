import { useState } from 'react';
                              //('user', {} )
export const useLocalStorage = (key, defaultValue) => {  //key = 'auth' //defaultvelue = user data
    
    const [value, setData] = useState(() => {
        const storageData = localStorage.getItem(key);
        return storageData ? JSON.parse(storageData) : defaultValue;//if there is data in localStor.,: if not defaultValue(information filled in authContext)
    });   
    
    const setLocalStorageValue = (storageData) => {
        localStorage.setItem(key, JSON.stringify(storageData));
        setData(storageData);
    };

   
    return [
        value,
        setLocalStorageValue,
    ];
}
