import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    selectHeader: number;
    setHeader: (value: number) => void;
    selectTemp: number;
    setTemp: (value: number) => void;
    selectFooter: number;
    setFooter: (value: number) => void;
    isAllOpen: boolean;
    isHeaderOpen: boolean;
    isTempOpen: boolean;
    isFooterOpen: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [selectHeader, setHeader] = useState<number>(0);
    const [selectTemp, setTemp] = useState<number>(0);
    const [selectFooter, setFooter] = useState<number>(0);

    const isAllOpen = selectHeader === 0 && selectTemp === 0;
    const isHeaderOpen = selectHeader === 0 && selectTemp !== 0;
    const isTempOpen = selectTemp === 0 && selectHeader !== 0;
    const isFooterOpen = selectFooter === 0;

    return (
        <SidebarContext.Provider value={{ selectHeader, setHeader, selectTemp, setTemp, selectFooter, setFooter, isAllOpen, isHeaderOpen, isTempOpen, isFooterOpen }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}