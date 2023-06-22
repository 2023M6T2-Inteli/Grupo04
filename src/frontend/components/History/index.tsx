import React from "react";
import HeaderDisplay from "../HeaderDisplay";
import DisplayText, { DisplayContent } from "../DisplayText";
import HistoryDisplayData, { CardContent } from "../HistoryDisplayData";

interface Props {}

const History: React.FC<Props> = (props) => {
    const displayContent: DisplayContent = {
        title: "Analyzes",
        text: "",
    };

    const cardContent: CardContent[] = [
        {
            status: "Completed",
            id: "1",
            title: "Gas Analyze",
            local: "Tubulação de gás",
            data: "12/05/2021",
            hour: "12:00",            
        },
        {
            status: "In Progress",
            id: "2",
            title: "Gas Analyze",
            local: "Tubulação de gás",
            data: "12/05/2021",
            hour: "12:00",
        },
        {
            status: "Completed",
            id: "3",
            title: "Gas Analyze",
            local: "Tubulação de gás",
            data: "12/05/2021",
            hour: "12:00",
        },
        {
            status: "In Progress",
            id: "4",
            title: "Gas Analyze",
            local: "Tubulação de gás",
            data: "12/05/2021",
            hour: "12:00",
        },
        {
            status: "Completed",
            id: "4",
            title: "Gas Analyze",
            local: "Tubulação de gás",
            data: "12/05/2021",
            hour: "12:00",
        },
        {
            status: "In Progress",
            id: "4",
            title: "Gas Analyze",
            local: "Tubulação de gás",
            data: "12/05/2021",
            hour: "12:00",
        },
    ];

    return (
        <div className="flex flex-col flex-grow overflow-y-scroll">
            <HeaderDisplay />
            <DisplayText displayContent={displayContent} />
            <HistoryDisplayData cardsContent={cardContent} />
        </div>
    );
};

export default History;