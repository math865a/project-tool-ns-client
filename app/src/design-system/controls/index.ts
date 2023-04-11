import { Default } from './default';
import { Detail } from './detail';
import { ColorPickerControl } from './color-picker';

export * from './display-text-control';
export * from './color-picker';
export * from "./autocomplete"
export * from "./daterange/DateRangePickerDay"
export const Controls = {
    Detail: Detail,
    Default: Default,
    ColorPicker: ColorPickerControl
}