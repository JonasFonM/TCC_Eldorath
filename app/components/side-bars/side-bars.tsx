import { NavLink, Outlet } from "@remix-run/react";
import { useState } from "react";
import { GeneralExplain } from "../explanations/general-explain";
import { useSidebar } from "./side-bar-context";

interface Props {
    title: string;
    subtitle: string,
    tableHeaders: string[];
    tableDatas: number[];
    tableExplain: string[];
    links: string[];
    linkNames: string[];
    entity: any;
    temp: any

}

export function GlobalSideBarContext({ }) {

}

export function SideBars({ title, subtitle, tableHeaders, tableDatas, tableExplain, links, linkNames, entity, temp }: Props) {
    const { selectHeader, setHeader, selectTemp, setTemp } = useSidebar();

    const [showExplain, setShowExplain] = useState<number>();

    return (
        <>
            <div>
                <div className="header" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}>

                    <h1 >{title}</h1>
                    <h3>{subtitle}</h3>

                    <ul className="skillnav">

                        {tableHeaders.map((th, index) => (
                            <>

                                <table key={th}>
                                    <tbody>
                                        <tr onClick={() => setShowExplain(index + 1)}>
                                            <th>{th}</th>
                                            <td>{tableDatas[index]}</td>

                                        </tr>
                                    </tbody>
                                </table>
                                <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={th} description={tableExplain[index]} isHidden={showExplain != (index + 1)} onCancel={() => setShowExplain(0)} />
                            </>
                        ))
                        }

                        {links.map((lk, index) => (
                            <li key={lk}><NavLink to={lk}>{linkNames[index]}</NavLink></li>
                        ))}

                    </ul>

                </div>

                <button className="toggle-menu" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}
                    onClick={selectHeader === 0 ? () => setHeader(Number(entity.id)) : () => setHeader(0)}>
                </button>

                <div className="temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}>

                    <ul>
                        {temp}
                    </ul>

                </div>

                <button className="toggle-temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}
                    onClick={selectTemp === 0 ? () => setTemp(Number(entity.id)) : () => setTemp(0)}>
                </button>
            </div>
        </>

    );
}




