
const Button = ({title,color,onClick}) => {
   return (
      <button onClick={onClick}
              style={{backgroundColor:color}}
              className="btn">{title}</button>
        

   )

}
Button.defaultProps = {
   color : 'green',
   title : 'add'
}
export default Button
