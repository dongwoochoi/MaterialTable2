/** @jsxImportSource @emotion/react */
import { useState } from "react";

interface DropdownProps{
    optionList : string[]
    categoryPath : {
        mainCategory : string;
        subCategory : string;
    }
    reducerDispatch : React.Dispatch<any>
}

export default function Dropdown({optionList, categoryPath, reducerDispatch} : DropdownProps){
    const [isOpen, setisOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("자재선택");
    
    const handleIsOpen = () => {
        setisOpen(!isOpen);
    }

    return(
        <div css={wrapperStyle} onMouseLeave={() => {isOpen && handleIsOpen()}}>
            <div css={selectedStyle(selectedOption)} onClick={handleIsOpen}>
                <p css={defaultTextStyle}>{ selectedOption }</p>
            </div>
            <div css={showContainerStyle(isOpen)}>
                {
                    optionList.map((option) => {
                        return(
                            <p css={optionListStyle} key={option} onClick={() => {
                                setSelectedOption(option);
                                const updatedData = {
                                    selectedOption: option,
                                    mainCategory: categoryPath.mainCategory,
                                    subCategory: categoryPath.subCategory,
                                };

                                reducerDispatch({
                                    type: "update",
                                    updateState: updatedData,
                                });
                                handleIsOpen();
                                }}>
                                {option}
                            </p>
                        );
                    })
                }
            </div>
        </div>
    );
}

const wrapperStyle = {
    marginTop : "12px",
    marginBottom : "12px",
    marginRight : "12px",
    marginLeft : "12px",
    position : "relative" as const,
}

const selectedStyle = (selectedOption : string) => ({
    display : "flex",
    alignItems : "center",
    width : "100%",
    paddingTop : "12px",
    paddingBottom : "12px",
    border : "1px solid black",
    borderRadius : "5px",
    color : `${selectedOption === "자재선택" ? "#cfcfcf" : "black"}`,
    fontSize: "0.875rem", 
})

const showContainerStyle = (isOpen : boolean) => ({
    position : "absolute" as const,
    display : `${isOpen ? "flex" : "none"}`,
    flexDirection : "column" as const,
    width : "100%",
    height : "auto",
    border : "1px solid black",
    borderRadius : "5px",
    zIndex : "999",
    background : "white",
})

const defaultTextStyle = {
    paddingLeft : "16px"
}

const optionListStyle = {
    paddingTop : "12px",
    paddingBottom : "12px",
    paddingLeft : "16px",
    paddingRight : "16px",
    borderBottom : "1px solid #cfcfcf",
    display : "flex",
    alignItems : "center",
    "&:hover": {
        background : "#f6f6f6",
    },
}