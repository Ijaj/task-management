import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SingleSelect({
  label = '',
  options = [], // Expecting [{ value: string, label: string }]
  initialValue = '',
  onChange,
  required = false,
}) {
  const [value, setValue] = useState(initialValue);
  const [id, setId] = useState('');

  useEffect(() => {
    const uniqueId = `single-select-${Math.random().toString(36).substring(2, 9)}`;
    setId(uniqueId);
  }, [options]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          required={true}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}