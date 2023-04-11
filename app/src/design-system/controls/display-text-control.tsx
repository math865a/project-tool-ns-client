import { OutlinedInput } from '@mui/material';

export interface IDisplayTextControlProps {
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  fullWidth?: boolean;
  color?: string;
}

export function DisplayTextControl({
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  fullWidth,
  color,
}: IDisplayTextControlProps) {
  return (
        <OutlinedInput
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            fullWidth={fullWidth}
            sx={{
              color,
              borderColor: 'transparent',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            }}
            inputProps={{ borderColor: 'transparent' }}
            size="small"
            className="display-text"
        />
  );
}
