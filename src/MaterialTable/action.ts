export default function reducer(prevState: any, action: any){

    const { type, updateState } = action;
    
    switch(type){
        case "update":
            const { mainCategory, subCategory, selectedOption } = updateState;
            return {
                ...prevState,
                [mainCategory]: {
                  ...prevState[mainCategory],
                  [subCategory]: selectedOption
                }
            };
    }
}