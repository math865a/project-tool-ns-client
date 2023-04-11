export interface IOption {
    id: string;
}

export interface IUsePersistProps<C extends any = any> {
    recordId: string;
    persistMessage: string;
    callback?: (value: C) => void;
    recordKey?: string;
    valueKey?: string
}

export interface IUseOptionsProps {
    loadMessage: string;
    loadParams?: any;
}

export type HandleOptionsStageToggle<T extends IOption = IOption> = (value: T | null, currentValue: T, options: T[]) => T | null;

export interface IUseOptionStateProps<T extends IOption = IOption, C extends any = any>
    extends IUsePersistProps<C> {
    initialValue: string;
    options: T[];
    handleToggle?: HandleOptionsStageToggle<T>
}

export type IUseLoadableOptionStateProps<T extends IOption = IOption, C extends any = any> = Omit<
    IUseOptionStateProps<T, C>,
    "options"
> &
    IUseOptionsProps;
