import "./Header.css"

function Header({title,subtitle,natija}) {
  return (
    <>
    <section className="header">
      <div className="container">
        <div className="logo">MyWeb</div>
        <ul>
          <li>Bosh sahifa</li>
          <li>Biz haqimizda</li>
          <li>Aloqa</li>
        </ul>
      </div>
    </section>
    </>
  )
}

export default Header