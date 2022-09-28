import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

type Props = {
  children?: React.ReactNode
  minWidth: number,
  width: number
}

export default function Background(props: Props) {
  return (

    <Box sx={{
      display: 'flex',
    }}>
      <Paper elevation={3} >
        <Box
          sx={{
            width: props.width,
            minWidth: props.minWidth,
            margin: 5
          }}
        >
          {props.children}
        </Box>
      </Paper>
    </Box>
  );
}