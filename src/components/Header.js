import Button from './Button'
const Header = ({title,onAdd,showadd}) => {
   return (
     <header className='header' >
        <h1 >{title}</h1>
        <Button  color={!showadd ?'green':'red'} title={!showadd ?'add' :'close'} onClick={onAdd} />
     </header>
  )

}
  Header.defaultProps = {
      title : 'Task Tracker',
}

export default Header
