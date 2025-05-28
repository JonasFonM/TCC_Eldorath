import { NavLink } from "@remix-run/react";
import { useRef, useState } from "react";
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
    temp: any;
    footer: any;

}

export function GlobalSideBarContext({ }) {

}

export function SideBars({ title, subtitle, tableHeaders, tableDatas, tableExplain, links, linkNames, entity, temp, footer }: Props) {
    const { selectHeader, setHeader, selectTemp, setTemp, selectFooter, setFooter, isAllOpen, isHeaderOpen, isTempOpen, isFooterOpen } = useSidebar();

    const showExplain = useRef<number>(-1);

    const forceUpdate = useState(0)[1];

    const setShowExplain = (n: number) => {
        if (showExplain.current === n) {
            showExplain.current = -1
            return forceUpdate(n => n + 1);
        }
        showExplain.current = n
        return forceUpdate(n => n + 1);
    }
    const characterTH = ["NV", "CT", "XP", "DK"]

    const translateTH: { [key: string]: any } = {
        "NV": "Nível",
        "CT": "Categoria",
        "XP": "Experiência",
        "DK": "Drakas"
    }

    return (
        <div id="side-bars">

            <div className="header" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
                {tableHeaders.map((th, index) => (
                    <table key={th + index}>
                        <tbody>
                            <tr onClick={() => setShowExplain(index)}>
                                <th>{th}</th>
                                <td>{tableDatas[index]}</td>
                            </tr>
                        </tbody>
                    </table>
                ))
                }
                <ul>
                    {links.map((lk, index) => (
                        <li key={lk + index}><NavLink to={lk}>{linkNames[index]}</NavLink></li>
                    ))}
                </ul>
            </div>

            {tableHeaders.map((th, index) => (
                <GeneralExplain
                    key={th + index}
                    title={characterTH.includes(th)
                        ? translateTH[th]
                        : th}
                    description={tableExplain[index]}
                    isHidden={showExplain.current !== (index)}
                    onCancel={() => setShowExplain(index)} />
            ))}

            <button className="toggle-menu" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}
                onClick={selectHeader === 0 ? () => setHeader(Number(entity.id)) : () => setHeader(0)}>
            </button>

            <div className="temp" style={
                temp != null
                    ? selectTemp === 0
                        ? {}
                        : { transform: 'translate(200px)' }
                    : { display: 'none' }
            }>
                {temp}
            </div>

            <button className="toggle-temp" style={
                temp != null
                    ? selectTemp === 0
                        ? {}
                        : { transform: 'translate(200px)' }
                    : { display: 'none' }
            }
                onClick={
                    selectTemp === 0
                        ? () => setTemp(Number(entity.id))
                        : () => setTemp(0)}>
            </button>

            <div className="footer" style={
                footer != null
                    ? selectFooter === 0
                        ? isAllOpen
                            ? { width: 'calc(100% - 400px)', marginLeft: '200px', marginRight: '200px' }
                            : isHeaderOpen
                                ? { width: 'calc(100% - 200px)', marginLeft: '200px' }
                                : isTempOpen
                                    ? { width: 'calc(100% - 200px)', marginRight: '200px' }
                                    : {}
                        : { transform: 'translate(0, 150px)' }
                    : { display: 'none' }}
            >
                {footer}
            </div>

            <button className="toggle-footer" style={
                footer != null
                    ? selectFooter === 0
                        ? {}
                        : { transform: 'translate(0, 150px)' }
                    : { display: 'none' }
            }
                onClick={selectFooter === 0 ? () => setFooter(Number(entity.id)) : () => setFooter(0)}>
            </button>
        </div >

    );
}




