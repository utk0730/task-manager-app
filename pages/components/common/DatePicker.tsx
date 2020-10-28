import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

export default function CustomDatePicker(props: any) {
  const { placeholder, input, meta, minDate, maxDate, ...rest } = props
  const name = (input && input.name) || rest.name
  const hasError = meta && meta.touched && meta.error

  return (
    <>
      <StyledDatePicker
        id={`field-${name}`}
        selected={input?.value}
        onChange={(value) => {
          console.log(value)
          input.onChange(value)
        }}
        minDate={minDate}
        maxDate={maxDate}
        showPopperArrow={false}
        showMonthDropdown
        dateFormat="dd/MM/yyyy"
        {...input}
        width={props?.width}
        placeholderText={placeholder}
      />
      {hasError && <p>{meta?.error}</p>}
    </>
  )
}

const StyledDatePicker = styled(DatePicker)<{ width: number }>`
  width: 100%;
  outline: none;
  padding: 1rem;
  width: ${(props) => props?.width && props.width + 'px'};
`
