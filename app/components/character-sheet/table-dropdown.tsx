import React from "react";
import "~/styles.css";

interface Props {
    show: boolean;
    subtitleIndexes: number[];
    categories: string[];
    items: string[];
}

export function TableDropdown({ show, subtitleIndexes, categories, items }: Props) {

    return (
        <tbody style={{ display: show ? '' : 'none', width: '100%' }} className="table-extension">
            {items.map(
                (info, index) => (
                    <React.Fragment key={`Drop-${index}`}>
                        {subtitleIndexes.includes(index)
                            ? <tr><th>{String(categories[index])}</th></tr>
                            : ''}
                        <tr><td>{String(info)}</td></tr>
                    </React.Fragment>
                ))
            }
        </tbody>
    )
}


