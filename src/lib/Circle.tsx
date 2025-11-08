
export default function Circle({ value, color, size = 16, bg = 'white', children, style }: any) {
  return (
    <div style={{
      width: size, height: size
      , background: bg
      , borderColor: color
      , color
      , borderRadius: '100%'
      , border: '1px solid black'
      , textAlign: 'center'
      , display: 'flex'
      , alignItems: 'center'
      , justifyContent: 'center'
      , fontWeight: 'bold'
      , ...style
    }}>
      {children}
    </div>
  )
}
