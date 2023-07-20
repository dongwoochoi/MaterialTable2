/** @jsxImportSource @emotion/react */

import { MATERIALDUMMYSUB, MATERIALDUMMYMAIN } from "../constants/MaterialDummy";
import Dropdown from "./Dropdown";
import { useReducer, useEffect } from "react";
import reducer from "./action";
import { selected } from "./store";
import useResponsive from "../useResponsive";

export default function MaterialTable(){
    const [state, dispatch] = useReducer(reducer, selected);
    const {isPc} = useResponsive()
    useEffect(() => {
        console.log(state);
      }, [state]);
      
    return(
        <div>
            <div>
                <p css={textTitleStyle}>자재 선택*</p>
            </div>
            <div>
                <p css={textDescriptionStyle}>제작하고자 하는 신발의 자재를 분류별로 빠짐없이 선택해주세요</p>
            </div>
            <div css={tableBodyStyle(isPc)}>
                {
                    MATERIALDUMMYMAIN.map((mainData) => {
                        return(
                            <div css={mainCellStyle(isPc)} key={mainData.id}>
                                <div css={mainOptionStyle(isPc)}>
                                    <p css={textBoldStyle}>{ mainData.label }</p>
                                </div>
                                <div>
                                    {
                                        MATERIALDUMMYSUB.filter(item => item.in === mainData.id).map((subData) => {
                                            return(
                                                <div css={subCellStyle(isPc)} key={subData.id}>
                                                    <div css={subOptionStyle(isPc)}>
                                                        <p css={textBoldStyleTablet(isPc)}>{ subData.label }</p>
                                                    </div>
                                                    <Dropdown 
                                                        optionList={subData.category}  
                                                        categoryPath={
                                                            {mainCategory : mainData.label,
                                                            subCategory : subData.label}
                                                        }
                                                        reducerDispatch={dispatch}
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

const textTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "800",
    marginBottom : "16px",
}

const textDescriptionStyle = {
    fontSize: "0.875rem",
}

const textBoldStyle = {
    fontSize: "0.875rem",
    fontWeight: "700",
}

const textBoldStyleTablet = (isPc : boolean) => ({
    fontSize: "0.875rem",
    fontWeight : `${isPc ? "700" : "none"}`,
})

const flexColumn = {
    display : "flex",
    flexDirection : "column" as const,
}

const flexCentering = {
    justifyContent : "center",
    alignItems : "center",
}

const tableBodyStyle = (isPc : boolean) => ({
    ...flexColumn,
    borderTop : "1px solid black",
    borderLeft : "1px solid #cfcfcf",
    borderRight : "1px solid #cfcfcf",
    borderBottom : "1px solid #cfcfcf",
    width : `${isPc ? "1060px" : "560px"}`,
    marginTop : "30px"
})

const mainCellStyle = (isPc : boolean) => ({
    display : "grid",
    gridTemplateColumns : `${isPc ? "16fr 94fr" : "none"}`,
})

const mainOptionStyle = (isPc : boolean) => ({
    height : `${isPc ? "auto" : "47px"}`,
    display : "flex",
    ...flexCentering,
    borderTop : "1px solid #cfcfcf",
    background : "#f6f6f6",
})
// background : "#f6f6f6"
const subOptionStyle = (isPc : boolean) => ({
    display : "flex",
    ...flexCentering,
    borderRight : `${isPc ? "none" : "1px solid #cfcfcf"}`,
})

const subCellStyle = (isPc : boolean) => ({
    display : "grid",
    gridTemplateColumns : `${isPc ? "16fr 94fr" : "3fr 8.3fr"}`,
    borderTop : "1px solid #cfcfcf",
})
