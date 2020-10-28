import styled from 'styled-components'
export default function Select(props: any) {
  const { placeholder, input, meta, options,loading, ...rest } = props
  const name = (input && input.name) || rest.name
  const hasError = meta && meta.touched && meta.error
  return (
    <>
      <StyledSelect id={`field-${name}`} {...input} hasError={hasError} width={props?.width}>
        {loading ? <option value="">
          Loading...
            </option>  : options?.map((_o: { value: string; label: string }, idx: number) => {
          const { value, label } = _o
          return (
            <option key={idx} value={value}>
              {label}
            </option>
          )
        })}
      </StyledSelect>
      {hasError && <p>{meta.error}</p>}
    </>
  )
}

const StyledSelect = styled.select<{ hasError: any; width: number }>`
  width:100%;
  outline: none;
  padding: 1rem;
  width: ${(props) => props?.width && props.width + 'px'};
`
