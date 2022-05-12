import { Backdrop, CircularProgress } from '@mui/material'
import theme from '../styles/theme'

export const BackdropContainer = ({ open, blur = 5 }) => {
  return (
    <Backdrop 
    sx={{ "&" : { backdropFilter : `blur(${blur}px)`, zIndex : 5000 } }}
    open={open}>
      <CircularProgress size={50} sx={{ "&.MuiCircularProgress-root" : { color : theme.primaryAccentColor } }}/>
    </Backdrop>
  )
}