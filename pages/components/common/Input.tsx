import styled from 'styled-components'

export default function Input(props: any) {
  const { placeholder, input, meta, ...rest } = props
  const name = (input && input.name) || rest.name
  const hasError = meta && meta.touched && meta.error
  return (
    <>
      <StyledInput
        id={`field-${name}`}
        placeholder={placeholder}
        {...input}
        hasError={hasError}
        width={props.width}
      />
      {hasError && <p>{meta.error}</p>}
    </>
  )
}

const StyledInput = styled.input<{ hasError: any; width: number }>`
  width: 100%;
  outline: none;
  padding: 1rem;
  width: ${(props) => props?.width && props.width + 'px'};
  border: ${(props) => (props?.hasError ? '1px solid red' : '')};
`
