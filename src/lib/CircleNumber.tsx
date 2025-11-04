export const CircleNumber = ({ value, x, y, color, size = 42, bg = 'white' }: any) => {
  return (

    <div style={{
      position: 'absolute'
      , left: x
      , top: y
      , width: size, height: size
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
    }}>
      {value}
    </div>
  )
}
