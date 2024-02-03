
type Props = { id:any, label:string, error:any, onChange:any , type?:any,defaultValue?:any}

const Input = ({ id, label, error, onChange , type,defaultValue}: Props) => {

   


  return (
    <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      id={id}
      className={error ? "form-control is-invalid " : "form-control"}
      onChange={onChange}
      type={type}
      defaultValue={defaultValue}
    />
    <div className="invalid-feedback">{error && <p>{error}</p>}</div>
  </div>
  )
}

export default Input