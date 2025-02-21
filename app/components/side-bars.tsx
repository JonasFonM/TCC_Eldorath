import { Outlet } from "@remix-run/react";
import { useState } from "react";

interface Props {
    title: string;
    tableHeaders: string[];
    tableDatas: number[];
    entity: any

}

export function SideBars({ title, tableHeaders, tableDatas, entity }: Props) {
    const [selectHeader, setHeader] = useState<number>(0);

    const showHeader = () => {
        setHeader(() => {
            return Number(entity.id);
        });
    };

    const cancelHeader = () => {
        setHeader(() => {
            return 0
        });
    };

    const [selectTemp, setTemp] = useState<number>(0);

    const showTemp = () => {
        setTemp(() => {
            return Number(entity.id);
        });
    };

    const cancelTemp = () => {
        setTemp(() => {
            return 0
        });
    };

    const isAllOpen = selectHeader === 0 && selectTemp === 0
    const isHeaderOpen = selectHeader === 0 && selectTemp != 0
    const isTempOpen = selectTemp === 0 && selectHeader != 0


    return (
        <>
            <div className="header" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}>

                <h1 >{title}</h1>

                <ul style={{ zIndex: '5' }} className="skillnav">

                    {tableHeaders.map((th, index) => (
                        <table>
                            <tr>
                                <th>{th}</th>
                                <td>{tableDatas[index]}</td>
                            </tr>
                        </table>
                    ))
                    }
                </ul>

            </div>
            <button className="toggle-menu" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}
                onClick={selectHeader === 0 ? showHeader : cancelHeader}></button>

            <div className="temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}>

                <ul>

                </ul>

            </div>

            <button className="toggle-temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}
                onClick={selectTemp === 0 ? showTemp : cancelTemp}></button>

            <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
                { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>
                <Outlet />
            </div >
        </>



    );
}




